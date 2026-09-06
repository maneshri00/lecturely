package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.*;
import com.lectureconnect.backend.payment.PaymentService;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(BookingServiceImpl.class);

    private final BookingRepository bookingRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final BookingMessageRepository bookingMessageRepository;
    private final NotificationService notificationService;
    private final EmailService emailService;
    private final VideoConferenceService videoConferenceService;
    private final PaymentService paymentGateway;
    private final ExpertService expertService;
    private final RequirementRepository requirementRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, ExpertProfileRepository expertProfileRepository, StudentProfileRepository studentProfileRepository, UserRepository userRepository, PaymentRepository paymentRepository, BookingMessageRepository bookingMessageRepository, NotificationService notificationService, EmailService emailService, VideoConferenceService videoConferenceService, PaymentService paymentGateway, ExpertService expertService, RequirementRepository requirementRepository) {
        this.bookingRepository = bookingRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.paymentRepository = paymentRepository;
        this.bookingMessageRepository = bookingMessageRepository;
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.videoConferenceService = videoConferenceService;
        this.paymentGateway = paymentGateway;
        this.expertService = expertService;
        this.requirementRepository = requirementRepository;
    }

    private static final BigDecimal PLATFORM_RATE = new BigDecimal("0.10");

    @Override
    @Transactional
    public BookingResponse createBookingRequest(BookingRequest req, Long studentUserId) {
        ExpertProfile expert = expertProfileRepository.findById(req.getExpertId()).orElse(null);
        if (expert == null) {
            expert = expertProfileRepository.findByUserId(req.getExpertId()).orElse(null);
        }
        if (expert == null) {
            throw new ResourceNotFoundException("Expert not found");
        }
        if ("REJECTED".equalsIgnoreCase(expert.getVerificationStatus())) {
            throw new BookingStatusException("This expert account is currently inactive or rejected.");
        }
        if (expert.getUserId() != null && expert.getUserId().equals(studentUserId)) {
            throw new BookingStatusException("You cannot book a session with yourself.");
        }

        // Check for duplicate slot booking
        if (req.getScheduledAt() != null) {
            String requestedDate = req.getScheduledAt().toLocalDate().toString();
            String requestedSlot = extractSlotFromMessageString(req.getStudentMessage());
            if (!requestedSlot.isBlank()) {
                List<BookedSlotResponse> existingSlots = getBookedSlotsForExpert(expert.getId());
                for (BookedSlotResponse slot : existingSlots) {
                    if (slot.getDate().equals(requestedDate) && slot.getTimeSlot().trim().equalsIgnoreCase(requestedSlot.trim())) {
                        throw new BookingStatusException("This slot (" + requestedDate + " at " + requestedSlot + ") has already been booked by another student.");
                    }
                }
            }
        }

        BigDecimal sessionFee = null;
        if (req.getSessionFee() != null && req.getSessionFee().compareTo(BigDecimal.ZERO) > 0) {
            sessionFee = req.getSessionFee();
        } else if (req.getRequirementId() != null) {
            Requirement requirement = requirementRepository.findById(req.getRequirementId()).orElse(null);
            if (requirement != null && requirement.getBudgetMax() != null && requirement.getBudgetMax().compareTo(BigDecimal.ZERO) > 0) {
                sessionFee = requirement.getBudgetMax();
            }
        }
        if (sessionFee == null) {
            sessionFee = expert.getSessionFee() != null ? expert.getSessionFee() : BigDecimal.ZERO;
        }

        BigDecimal platformFee = sessionFee.multiply(PLATFORM_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal expertEarnings = sessionFee.subtract(platformFee);

        String bookingMode = req.getMode() != null && !req.getMode().isBlank() ? req.getMode() : "ONLINE";

        Booking booking = Booking.builder()
                .requirementId(req.getRequirementId())
                .studentId(studentUserId)
                .expertId(expert.getId())
                .status("PENDING")
                .sessionFee(sessionFee)
                .platformFee(platformFee)
                .expertEarnings(expertEarnings)
                .scheduledAt(req.getScheduledAt())
                .durationMinutes(req.getDurationMinutes())
                .studentMessage(req.getStudentMessage())
                .mode(bookingMode)
                .build();
        booking = bookingRepository.save(booking);
        booking.setMeetingLink(videoConferenceService.generateMeetingLink(booking.getId()));
        booking = bookingRepository.save(booking);

        Long expertUserId = expert.getUserId();
        String studentName = studentProfileRepository.findByUserId(studentUserId)
                .map(StudentProfile::getFullName).orElse("Student");

        notificationService.createNotification(expertUserId, "BOOKING_REQUEST",
                "New Session Request", "You have a new session request from " + studentName,
                "/expert/requests");

        try {
            String expertEmail = userRepository.findById(expertUserId).map(User::getEmail).orElse("");
            String studentEmail = userRepository.findById(studentUserId).map(User::getEmail).orElse("");
            if (studentEmail.isBlank()) {
                studentEmail = studentProfileRepository.findById(studentUserId)
                        .flatMap(sp -> userRepository.findById(sp.getUserId()))
                        .map(User::getEmail).orElse("");
            }

            emailService.sendBookingRequestEmail(expertEmail, expert.getFullName(), "Session Request", studentName);

            // Meeting link email will be dispatched after payment verification by Admin
        } catch (Exception e) {
            log.warn("Email notification failed: {}", e.getMessage());
        }

        return toBookingResponse(booking);
    }

    @Override
    public List<BookingResponse> getBookingsForStudent(Long studentUserId) {
        return bookingRepository.findByStudentIdOrderByCreatedAtDesc(studentUserId)
                .stream().map(this::toBookingResponse).collect(Collectors.toList());
    }

    @Override
    public List<BookingResponse> getBookingsForExpert(Long expertUserId) {
        ExpertProfile profile = expertProfileRepository.findByUserId(expertUserId).orElse(null);
        Long targetExpertId = profile != null ? profile.getId() : expertUserId;
        List<Booking> bookings = bookingRepository.findByExpertIdOrderByCreatedAtDesc(targetExpertId);
        if (bookings.isEmpty() && profile != null && !profile.getId().equals(expertUserId)) {
            bookings = bookingRepository.findByExpertIdOrderByCreatedAtDesc(expertUserId);
        }
        return bookings.stream().map(this::toBookingResponse).collect(Collectors.toList());
    }

    @Override
    public BookingResponse getBookingById(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
        Long expertUserId = expert != null ? expert.getUserId() : null;
        if (!booking.getStudentId().equals(userId) && !userId.equals(expertUserId)) {
            throw new UnauthorizedException("Not authorized to view this booking");
        }
        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse acceptBooking(Long bookingId, Long expertUserId) {
        Booking booking = findBookingForExpert(bookingId, expertUserId);
        if (!"PENDING".equals(booking.getStatus())) {
            throw new BookingStatusException("Only PENDING bookings can be accepted");
        }
        booking.setStatus("ACCEPTED");
        if ("ONLINE".equals(booking.getMode()) || booking.getMode() == null || booking.getMeetingLink() == null) {
            booking.setMeetingLink(videoConferenceService.generateMeetingLink(bookingId));
        }
        booking = bookingRepository.save(booking);

        notificationService.createNotification(booking.getStudentId(), "BOOKING_ACCEPTED",
                "Session Accepted! 🎉", "Your booking has been accepted. Please complete the payment to confirm.",
                "/student/bookings/" + bookingId);

        try {
            // Robust Student Email & Name Resolution
            User studentUser = userRepository.findById(booking.getStudentId()).orElse(null);
            StudentProfile studentProfile = studentProfileRepository.findByUserId(booking.getStudentId()).orElse(null);
            if (studentProfile == null) {
                studentProfile = studentProfileRepository.findById(booking.getStudentId()).orElse(null);
            }
            if (studentUser == null && studentProfile != null) {
                studentUser = userRepository.findById(studentProfile.getUserId()).orElse(null);
            }

            String studentEmail = studentUser != null ? studentUser.getEmail() : "";
            String studentName = studentProfile != null ? studentProfile.getFullName() : "Student";

            // Robust Expert Email & Name Resolution
            User expertUser = userRepository.findById(expertUserId).orElse(null);
            ExpertProfile expertProfile = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
            if (expertProfile == null) {
                expertProfile = expertProfileRepository.findByUserId(expertUserId).orElse(null);
            }
            if (expertUser == null && expertProfile != null) {
                expertUser = userRepository.findById(expertProfile.getUserId()).orElse(null);
            }

            String expertEmail = expertUser != null ? expertUser.getEmail() : "";
            String expertName = expertProfile != null ? expertProfile.getFullName() : "Expert Speaker";

            log.info("Booking accepted for student [{}] ({}) by expert [{}] ({}). Meeting link email will be dispatched after payment verification by Admin.", studentName, studentEmail, expertName, expertEmail);
        } catch (Exception e) {
            log.warn("Email failed: {}", e.getMessage(), e);
        }

        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse rejectBooking(Long bookingId, Long expertUserId, String reason) {
        Booking booking = findBookingForExpert(bookingId, expertUserId);
        if (!"PENDING".equals(booking.getStatus())) {
            throw new BookingStatusException("Only PENDING bookings can be rejected");
        }
        booking.setStatus("REJECTED");
        booking.setCancelReason(reason);
        booking = bookingRepository.save(booking);

        notificationService.createNotification(booking.getStudentId(), "BOOKING_REJECTED",
                "Session Request Declined", "Unfortunately, your session request was declined. " +
                (reason != null ? "Reason: " + reason : ""),
                "/student/bookings/" + bookingId);

        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse counterOffer(Long bookingId, Long expertUserId, CounterOfferRequest req) {
        Booking booking = findBookingForExpert(bookingId, expertUserId);
        if (!"PENDING".equals(booking.getStatus())) {
            throw new BookingStatusException("Can only counter-offer PENDING bookings");
        }
        booking.setStatus("COUNTER_OFFERED");
        booking.setCounterOfferFee(req.getProposedFee());
        booking.setCounterOfferNote(req.getNote());
        if (req.getProposedDateTime() != null) {
            booking.setScheduledAt(req.getProposedDateTime());
        }
        booking = bookingRepository.save(booking);

        notificationService.createNotification(booking.getStudentId(), "COUNTER_OFFER",
                "Counter Offer Received", "The expert has proposed a different fee: ₹" + req.getProposedFee(),
                "/student/bookings/" + bookingId);

        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse confirmCounterOffer(Long bookingId, Long studentUserId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getStudentId().equals(studentUserId)) {
            throw new UnauthorizedException("Not authorized");
        }
        if (!"COUNTER_OFFERED".equals(booking.getStatus())) {
            throw new BookingStatusException("Booking is not in COUNTER_OFFERED status");
        }

        BigDecimal newFee = booking.getCounterOfferFee();
        BigDecimal platformFee = newFee.multiply(PLATFORM_RATE).setScale(2, RoundingMode.HALF_UP);
        BigDecimal expertEarnings = newFee.subtract(platformFee);

        booking.setSessionFee(newFee);
        booking.setPlatformFee(platformFee);
        booking.setExpertEarnings(expertEarnings);
        booking.setStatus("ACCEPTED");
        booking = bookingRepository.save(booking);

        notificationService.createNotification(
                expertProfileRepository.findById(booking.getExpertId()).map(ExpertProfile::getUserId).orElse(-1L),
                "COUNTER_ACCEPTED", "Counter Offer Accepted",
                "The student accepted your counter offer. Payment is pending.", "/expert/bookings/" + bookingId);

        return toBookingResponse(booking);
    }

    @Override
    public PaymentOrderResponse createPaymentOrder(Long bookingId, String paymentMethod, Long studentUserId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getStudentId().equals(studentUserId)) {
            throw new UnauthorizedException("Not authorized to pay for this booking");
        }
        if (!"ACCEPTED".equals(booking.getStatus())) {
            throw new BookingStatusException("Booking must be ACCEPTED before payment");
        }

        BigDecimal amount = booking.getSessionFee() != null ? booking.getSessionFee() : BigDecimal.ZERO;
        PaymentService.PaymentOrderResult result = paymentGateway.createOrder(amount, "INR", "BK-" + bookingId);

        return PaymentOrderResponse.builder()
                .orderId(result.orderId())
                .currency(result.currency())
                .amount(result.amount())
                .bookingId(bookingId)
                .keyId("rzp_test_mock")
                .build();
    }

    @Override
    @Transactional
    public BookingResponse processPayment(Long bookingId, PaymentVerifyRequest req, Long studentUserId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        if (!booking.getStudentId().equals(studentUserId)) {
            throw new UnauthorizedException("Not authorized");
        }
        if (!"ACCEPTED".equals(booking.getStatus())) {
            throw new BookingStatusException("Booking is not in ACCEPTED status");
        }

        PaymentService.PaymentVerificationResult result = paymentGateway.verifyPayment(
                req.getOrderId(), req.getPaymentId(), req.getSignature());

        if (!result.success()) {
            throw new ApiException("Payment verification failed: " + result.message(),
                    org.springframework.http.HttpStatus.BAD_REQUEST);
        }

        Payment payment = paymentRepository.findByBookingId(bookingId).orElse(null);
        if (payment == null) {
            payment = Payment.builder()
                    .bookingId(bookingId)
                    .amount(booking.getSessionFee())
                    .platformFee(booking.getPlatformFee())
                    .expertEarnings(booking.getExpertEarnings())
                    .build();
        }
        payment.setStatus("COMPLETED");
        payment.setTransactionId(result.transactionId());
        payment.setRazorpayOrderId(req.getOrderId());
        payment.setRazorpayPaymentId(req.getPaymentId());
        payment.setPaymentMethod(req.getSignature() != null ? "UPI" : "CARD");
        paymentRepository.save(payment);

        booking.setStatus("CONFIRMED");
        if ("ONLINE".equals(booking.getMode()) || booking.getMode() == null) {
            booking.setMeetingLink(videoConferenceService.generateMeetingLink(bookingId));
        }
        booking = bookingRepository.save(booking);

        Long expertUserId = expertProfileRepository.findById(booking.getExpertId())
                .map(ExpertProfile::getUserId).orElse(-1L);
        String expertName = expertProfileRepository.findById(booking.getExpertId())
                .map(ExpertProfile::getFullName).orElse("Expert");
        String studentName = studentProfileRepository.findByUserId(studentUserId)
                .map(StudentProfile::getFullName).orElse("Student");

        notificationService.createNotification(expertUserId, "BOOKING_CONFIRMED",
                "Session Confirmed! 🎉", "Payment received. Your session with " + studentName + " is confirmed!",
                "/expert/bookings/" + bookingId);
        notificationService.createNotification(studentUserId, "PAYMENT_SUCCESS",
                "Payment Successful!", "Your payment was processed. Meeting link: " + booking.getMeetingLink(),
                "/student/bookings/" + bookingId);

        try {
            String studentEmail = userRepository.findById(studentUserId).map(User::getEmail).orElse("");
            String expertEmail = userRepository.findById(expertUserId).map(User::getEmail).orElse("");
            emailService.sendPaymentSuccessEmail(studentEmail, studentName, booking.getSessionFee(), result.transactionId());
            emailService.sendBookingConfirmedEmail(studentEmail, studentName, "Your Session", booking.getMeetingLink());
            emailService.sendBookingConfirmedEmail(expertEmail, expertName, "Session with " + studentName, booking.getMeetingLink());
        } catch (Exception e) {
            log.warn("Email failed: {}", e.getMessage());
        }

        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse completeSession(Long bookingId, Long expertUserId) {
        Booking booking = findBookingForExpert(bookingId, expertUserId);
        if (!"CONFIRMED".equals(booking.getStatus())) {
            throw new BookingStatusException("Only CONFIRMED sessions can be marked as complete");
        }
        booking.setStatus("COMPLETED");
        booking = bookingRepository.save(booking);

        expertProfileRepository.findById(booking.getExpertId()).ifPresent(expert -> {
            expert.setTotalSessions(expert.getTotalSessions() + 1);
            expertProfileRepository.save(expert);
        });

        notificationService.createNotification(booking.getStudentId(), "SESSION_COMPLETED",
                "Session Completed!", "Please share your feedback and leave a review.",
                "/student/bookings/" + bookingId);

        try {
            String studentEmail = userRepository.findById(booking.getStudentId()).map(User::getEmail).orElse("");
            String studentName = studentProfileRepository.findByUserId(booking.getStudentId())
                    .map(StudentProfile::getFullName).orElse("Student");
            emailService.sendBookingCompletedEmail(studentEmail, studentName, "Your Session",
                    "http://localhost:5173/student/bookings/" + bookingId);
        } catch (Exception e) {
            log.warn("Email failed: {}", e.getMessage());
        }

        return toBookingResponse(booking);
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long bookingId, Long userId, String reason) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
        Long expertUserId = expert != null ? expert.getUserId() : null;

        boolean isStudent = booking.getStudentId().equals(userId);
        boolean isExpert = userId.equals(expertUserId);

        if (!isStudent && !isExpert) {
            throw new UnauthorizedException("Not authorized");
        }

        List<String> cancellableStatuses = List.of("PENDING", "ACCEPTED", "COUNTER_OFFERED");
        if (!cancellableStatuses.contains(booking.getStatus())) {
            throw new BookingStatusException("Cannot cancel a booking with status: " + booking.getStatus());
        }

        booking.setStatus("CANCELLED");
        booking.setCancelledBy(userId);
        booking.setCancelReason(reason);
        booking = bookingRepository.save(booking);

        Long notifyUserId = isStudent ? expertUserId : booking.getStudentId();
        if (notifyUserId != null) {
            String canceller = isStudent ? "student" : "expert";
            notificationService.createNotification(notifyUserId, "BOOKING_CANCELLED",
                    "Session Cancelled", "The " + canceller + " has cancelled this session." +
                    (reason != null ? " Reason: " + reason : ""),
                    isStudent ? "/expert/bookings/" + bookingId : "/student/bookings/" + bookingId);
        }

        return toBookingResponse(booking);
    }

    @Override
    public List<BookingMessageResponse> getMessages(Long bookingId, Long userId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
        Long expertUserId = expert != null ? expert.getUserId() : null;
        if (!booking.getStudentId().equals(userId) && !userId.equals(expertUserId)) {
            throw new UnauthorizedException("Not authorized");
        }
        return bookingMessageRepository.findByBookingIdOrderByCreatedAtAsc(bookingId)
                .stream().map(this::toMessageResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingMessageResponse sendMessage(Long bookingId, Long userId, String message) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
        Long expertUserId = expert != null ? expert.getUserId() : null;
        if (!booking.getStudentId().equals(userId) && !userId.equals(expertUserId)) {
            throw new UnauthorizedException("Not authorized");
        }

        BookingMessage msg = BookingMessage.builder()
                .bookingId(bookingId)
                .senderId(userId)
                .message(message)
                .build();
        msg = bookingMessageRepository.save(msg);

        Long recipientId = userId.equals(booking.getStudentId()) ? expertUserId : booking.getStudentId();
        if (recipientId != null) {
            notificationService.createNotification(recipientId, "NEW_MESSAGE", "New Message",
                    "You have a new message in your booking chat.", "/bookings/" + bookingId + "/messages");
        }

        return toMessageResponse(msg);
    }

    private Booking findBookingForExpert(Long bookingId, Long expertUserId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        if (!expert.getUserId().equals(expertUserId)) {
            throw new UnauthorizedException("Not authorized for this booking");
        }
        return booking;
    }

    private BookingResponse toBookingResponse(Booking booking) {
        ExpertSummaryResponse expertSummary = null;
        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId()).orElse(null);
        if (expert != null) {
            expertSummary = expertService.toSummary(expert);
        }

        StudentSummaryResponse studentSummary = null;
        StudentProfile studentProfile = studentProfileRepository.findByUserId(booking.getStudentId()).orElse(null);
        if (studentProfile != null) {
            User studentUser = userRepository.findById(booking.getStudentId()).orElse(null);
            studentSummary = StudentSummaryResponse.builder()
                    .id(studentProfile.getId())
                    .fullName(studentProfile.getFullName())
                    .institution(studentProfile.getInstitution())
                    .city(studentProfile.getCity())
                    .email(studentUser != null ? studentUser.getEmail() : "")
                    .course(studentProfile.getCourse())
                    .branch(studentProfile.getBranch())
                    .build();
        }

        DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        Payment payment = paymentRepository.findByBookingId(booking.getId()).orElse(null);
        String txnId = payment != null ? payment.getTransactionId() : null;
        String ssUrl = payment != null ? payment.getScreenshotUrl() : null;

        return BookingResponse.builder()
                .id(booking.getId())
                .publicId(booking.getPublicId() != null ? booking.getPublicId().toString() : null)
                .status(booking.getStatus())
                .expert(expertSummary)
                .student(studentSummary)
                .sessionFee(booking.getSessionFee())
                .platformFee(booking.getPlatformFee())
                .expertEarnings(booking.getExpertEarnings())
                .counterOfferFee(booking.getCounterOfferFee())
                .scheduledAt(booking.getScheduledAt() != null ? booking.getScheduledAt().format(fmt) : null)
                .mode(booking.getMode())
                .meetingLink(booking.getMeetingLink())
                .studentMessage(booking.getStudentMessage())
                .counterOfferNote(booking.getCounterOfferNote())
                .durationMinutes(booking.getDurationMinutes())
                .createdAt(booking.getCreatedAt())
                .requirementId(booking.getRequirementId())
                .transactionId(txnId)
                .paymentScreenshotUrl(ssUrl)
                .build();
    }

    @Override
    @Transactional
    public BookingResponse submitQrPayment(QrPaymentSubmitRequest req, Long studentUserId) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getStudentId().equals(studentUserId)) {
            User user = userRepository.findById(studentUserId).orElse(null);
            if (user == null || user.getRole() == null || !"ADMIN".equalsIgnoreCase(user.getRole())) {
                throw new UnauthorizedException("Only the student who requested this session can submit payment");
            }
        }

        Payment payment = paymentRepository.findByBookingId(booking.getId()).orElse(null);
        if (payment == null) {
            BigDecimal sessionFee = booking.getSessionFee() != null ? booking.getSessionFee() : BigDecimal.valueOf(5000);
            BigDecimal platformFee = booking.getPlatformFee() != null ? booking.getPlatformFee() : BigDecimal.valueOf(500);
            BigDecimal expertEarnings = booking.getExpertEarnings() != null ? booking.getExpertEarnings() : sessionFee.subtract(platformFee);

            payment = Payment.builder()
                    .bookingId(booking.getId())
                    .amount(sessionFee)
                    .platformFee(platformFee)
                    .expertEarnings(expertEarnings)
                    .build();
        }

        payment.setStatus("VERIFYING");
        payment.setVerificationStatus("PENDING");
        payment.setTransactionId(req.getTransactionId());

        String ssUrl = req.getScreenshotUrl();
        if (ssUrl != null && ssUrl.length() > 250) {
            ssUrl = ssUrl.substring(0, 250);
        }
        payment.setScreenshotUrl(ssUrl);
        payment.setPaymentMethod("QR_CODE");
        paymentRepository.save(payment);

        booking.setStatus("VERIFYING");
        booking = bookingRepository.save(booking);

        try {
            notificationService.createNotification(booking.getStudentId(), "PAYMENT_UNDER_VERIFICATION",
                    "Payment Under Verification ⌛",
                    "Your payment proof (UTR: " + req.getTransactionId() + ") was submitted for manual verification. Session link unlocks upon approval.",
                    "/student/bookings/" + booking.getId());
        } catch (Exception e) {
            log.warn("Failed to create notification for payment verification: {}", e.getMessage());
        }

        return toBookingResponse(booking);
    }

    @Override
    public List<PendingPaymentVerificationResponse> getPendingPaymentVerifications() {
        List<Payment> payments = paymentRepository.findByVerificationStatusOrderByCreatedAtDesc("PENDING");
        if (payments.isEmpty()) {
            payments = paymentRepository.findByStatusOrderByCreatedAtDesc("VERIFYING");
        }

        return payments.stream().map(p -> {
            Booking b = bookingRepository.findById(p.getBookingId()).orElse(null);
            String studentName = "Student";
            String studentEmail = "";
            Long studentId = b != null ? b.getStudentId() : null;
            Long expertId = b != null ? b.getExpertId() : null;
            String expertName = "Expert";

            if (studentId != null) {
                studentName = studentProfileRepository.findByUserId(studentId)
                        .map(StudentProfile::getFullName).orElse("Student");
                studentEmail = userRepository.findById(studentId)
                        .map(User::getEmail).orElse("");
            }
            if (expertId != null) {
                expertName = expertProfileRepository.findById(expertId)
                        .map(ExpertProfile::getFullName).orElse("Expert");
            }

            return new PendingPaymentVerificationResponse(
                    p.getId(),
                    p.getBookingId(),
                    studentId,
                    studentName,
                    studentEmail,
                    expertId,
                    expertName,
                    p.getAmount(),
                    p.getPlatformFee(),
                    p.getTransactionId(),
                    p.getScreenshotUrl(),
                    p.getVerificationStatus(),
                    p.getStatus(),
                    p.getCreatedAt()
            );
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingResponse verifyQrPayment(Long id, boolean approve, String rejectionReason) {
        Payment payment = paymentRepository.findByBookingId(id)
                .orElseGet(() -> paymentRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Payment verification record not found for ID: " + id)));

        Booking booking = bookingRepository.findById(payment.getBookingId())
                .orElseGet(() -> bookingRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Associated booking not found for ID: " + id)));

        if (approve) {
            payment.setStatus("COMPLETED");
            payment.setVerificationStatus("VERIFIED");
            paymentRepository.save(payment);

            booking.setStatus("CONFIRMED");
            if ("ONLINE".equals(booking.getMode()) || booking.getMode() == null) {
                booking.setMeetingLink(videoConferenceService.generateMeetingLink(booking.getId()));
            }
            booking = bookingRepository.save(booking);

            Long expertUserId = expertProfileRepository.findById(booking.getExpertId())
                    .map(ExpertProfile::getUserId).orElse(-1L);
            String expertName = expertProfileRepository.findById(booking.getExpertId())
                    .map(ExpertProfile::getFullName).orElse("Expert");
            String studentName = studentProfileRepository.findByUserId(booking.getStudentId())
                    .map(StudentProfile::getFullName).orElse("Student");

            notificationService.createNotification(expertUserId, "BOOKING_CONFIRMED",
                    "Session Confirmed! 🎉", "Payment verified. Your session with " + studentName + " is confirmed!",
                    "/expert/bookings/" + booking.getId());
            notificationService.createNotification(booking.getStudentId(), "PAYMENT_SUCCESS",
                    "Payment Verified & Confirmed! 🎉", "Your payment (UTR: " + payment.getTransactionId() + ") has been verified. Session room unlocked!",
                    "/student/bookings/" + booking.getId());

            try {
                User studentUser = userRepository.findById(booking.getStudentId()).orElse(null);
                StudentProfile studentProfile = studentProfileRepository.findByUserId(booking.getStudentId()).orElse(null);
                String studentEmail = studentUser != null ? studentUser.getEmail() : "";
                if (studentEmail == null || studentEmail.isBlank()) {
                    if (studentProfile != null) {
                        studentEmail = userRepository.findById(studentProfile.getUserId()).map(User::getEmail).orElse("");
                    }
                }

                User expertUser = userRepository.findById(expertUserId).orElse(null);
                String expertEmail = expertUser != null ? expertUser.getEmail() : "";

                log.info("📧 Dispatching Google Meet link emails after Admin Payment Verification -> Student: [{}] ({}) | Expert: [{}] ({})", studentName, studentEmail, expertName, expertEmail);

                emailService.sendPaymentSuccessEmail(studentEmail, studentName, booking.getSessionFee(), payment.getTransactionId());

                if (studentEmail != null && !studentEmail.isBlank()) {
                    emailService.sendScheduledGoogleMeetEmail(
                        studentEmail, studentName, "Session with " + expertName,
                        booking.getMeetingLink(), booking.getScheduledAt(), booking.getDurationMinutes()
                    );
                }

                if (expertEmail != null && !expertEmail.isBlank()) {
                    emailService.sendScheduledGoogleMeetEmail(
                        expertEmail, expertName, "Session with " + studentName,
                        booking.getMeetingLink(), booking.getScheduledAt(), booking.getDurationMinutes()
                    );
                }
            } catch (Exception e) {
                log.warn("Failed to send Google Meet email on payment verification: {}", e.getMessage(), e);
            }
        } else {
            payment.setStatus("REJECTED");
            payment.setVerificationStatus("REJECTED");
            payment.setRejectionReason(rejectionReason);
            paymentRepository.save(payment);

            booking.setStatus("ACCEPTED");
            booking = bookingRepository.save(booking);

            notificationService.createNotification(booking.getStudentId(), "PAYMENT_REJECTED",
                    "Payment Proof Rejected ❌", "Reason: " + (rejectionReason != null ? rejectionReason : "Invalid UTR / Screenshot") + ". Please re-submit payment receipt.",
                    "/student/bookings/" + booking.getId());
        }

        return toBookingResponse(booking);
    }

    private BookingMessageResponse toMessageResponse(BookingMessage msg) {
        String senderName = userRepository.findById(msg.getSenderId())
                .map(u -> {
                    if ("STUDENT".equals(u.getRole())) {
                        return studentProfileRepository.findByUserId(u.getId())
                                .map(StudentProfile::getFullName).orElse(u.getEmail());
                    } else {
                        return expertProfileRepository.findByUserId(u.getId())
                                .map(ExpertProfile::getFullName).orElse(u.getEmail());
                    }
                }).orElse("Unknown");

        return BookingMessageResponse.builder()
                .id(msg.getId())
                .bookingId(msg.getBookingId())
                .senderId(msg.getSenderId())
                .senderName(senderName)
                .message(msg.getMessage())
                .createdAt(msg.getCreatedAt())
                .build();
    }

    @Override
    public List<BookedSlotResponse> getBookedSlotsForExpert(Long expertId) {
        ExpertProfile profile = expertProfileRepository.findById(expertId).orElse(null);
        if (profile == null) {
            profile = expertProfileRepository.findByUserId(expertId).orElse(null);
        }
        Long targetExpertId = profile != null ? profile.getId() : expertId;

        List<Booking> activeBookings = bookingRepository.findByExpertIdAndStatusNotIn(targetExpertId, List.of("CANCELLED", "REJECTED"));
        if (activeBookings.isEmpty() && profile != null && !profile.getId().equals(expertId)) {
            activeBookings = bookingRepository.findByExpertIdAndStatusNotIn(expertId, List.of("CANCELLED", "REJECTED"));
        }

        return activeBookings.stream().map(b -> {
            String dateStr = b.getScheduledAt() != null ? b.getScheduledAt().toLocalDate().toString() : "";
            String slotStr = extractTimeSlot(b);
            return BookedSlotResponse.builder()
                    .bookingId(b.getId())
                    .expertId(b.getExpertId())
                    .date(dateStr)
                    .timeSlot(slotStr)
                    .status(b.getStatus())
                    .build();
        }).collect(Collectors.toList());
    }

    private String extractTimeSlot(Booking b) {
        if (b.getStudentMessage() != null && b.getStudentMessage().contains("[Requested Time Slot:")) {
            int idx = b.getStudentMessage().indexOf("[Requested Time Slot:");
            int endIdx = b.getStudentMessage().indexOf("]", idx);
            if (endIdx > idx) {
                String raw = b.getStudentMessage().substring(idx + 22, endIdx).trim();
                if (!raw.equalsIgnoreCase("Flex") && !raw.isBlank()) {
                    return raw;
                }
            }
        }
        if (b.getScheduledAt() != null) {
            int hour = b.getScheduledAt().getHour();
            int endHour = hour + 1;
            String startAmpm = hour >= 12 ? "PM" : "AM";
            String endAmpm = endHour >= 12 ? "PM" : "AM";
            int startH12 = hour % 12 == 0 ? 12 : hour % 12;
            int endH12 = endHour % 12 == 0 ? 12 : endHour % 12;
            return String.format("%02d:00 %s - %02d:00 %s", startH12, startAmpm, endH12, endAmpm);
        }
        return "10:00 AM - 11:00 AM";
    }

    private String extractSlotFromMessageString(String message) {
        if (message != null && message.contains("[Requested Time Slot:")) {
            int idx = message.indexOf("[Requested Time Slot:");
            int endIdx = message.indexOf("]", idx);
            if (endIdx > idx) {
                String raw = message.substring(idx + 22, endIdx).trim();
                if (!raw.equalsIgnoreCase("Flex") && !raw.isBlank()) {
                    return raw;
                }
            }
        }
        return "";
    }
}
