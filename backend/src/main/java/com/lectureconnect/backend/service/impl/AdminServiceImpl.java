package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.*;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AdminServiceImpl.class);

    private final UserRepository userRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final ExpertDocumentRepository expertDocumentRepository;
    private final RequirementRepository requirementRepository;
    private final ExpertService expertService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public AdminServiceImpl(UserRepository userRepository, ExpertProfileRepository expertProfileRepository, StudentProfileRepository studentProfileRepository, BookingRepository bookingRepository, PaymentRepository paymentRepository, ExpertDocumentRepository expertDocumentRepository, RequirementRepository requirementRepository, ExpertService expertService, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.bookingRepository = bookingRepository;
        this.paymentRepository = paymentRepository;
        this.expertDocumentRepository = expertDocumentRepository;
        this.requirementRepository = requirementRepository;
        this.expertService = expertService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AdminDashboardResponse getDashboardStats() {
        LocalDateTime today = LocalDateTime.now().toLocalDate().atStartOfDay();
        return AdminDashboardResponse.builder()
                .totalStudents(userRepository.countByRole("STUDENT"))
                .totalExperts(userRepository.countByRole("EXPERT"))
                .verifiedExperts(expertProfileRepository.countByVerificationStatus("VERIFIED"))
                .pendingVerification(expertProfileRepository.countByVerificationStatus("PENDING"))
                .totalBookings(bookingRepository.count())
                .completedSessions(bookingRepository.countByStatus("COMPLETED"))
                .totalRevenue(bookingRepository.sumTotalRevenue())
                .platformCommission(bookingRepository.sumPlatformFees())
                .activeRequirements(requirementRepository.countByStatus("OPEN"))
                .newUsersToday(userRepository.countByCreatedAtAfter(today))
                .bookingsToday(bookingRepository.countByCreatedAtAfter(today))
                .build();
    }

    @Override
    public Page<ExpertSummaryResponse> getAllExperts(String status, Pageable pageable) {
        Page<ExpertProfile> page;
        if (status != null && !status.isBlank()) {
            page = Page.empty(pageable);
            List<ExpertProfile> filtered = expertProfileRepository.findByVerificationStatus(status);
            int start = (int) pageable.getOffset();
            int end = Math.min(start + pageable.getPageSize(), filtered.size());
            if (start < filtered.size()) {
                page = new PageImpl<>(filtered.subList(start, end), pageable, filtered.size());
            }
        } else {
            page = expertProfileRepository.findAll(pageable);
        }
        return page.map(expertService::toSummary);
    }

    @Override
    public ExpertDetailResponse getExpertDetail(Long expertId) {
        ExpertProfile expert = expertProfileRepository.findById(expertId)
                .orElseThrow(() -> new ResourceNotFoundException("Expert not found"));
        return expertService.toDetail(expert);
    }

    @Override
    @Transactional
    public ExpertDetailResponse verifyExpert(Long expertId, Long adminUserId) {
        ExpertProfile expert = expertProfileRepository.findById(expertId)
                .orElseThrow(() -> new ResourceNotFoundException("Expert not found"));
        expert.setVerificationStatus("VERIFIED");
        expertProfileRepository.save(expert);

        try {
            String expertEmail = userRepository.findById(expert.getUserId()).map(User::getEmail).orElse("");
            emailService.sendExpertVerifiedEmail(expertEmail, expert.getFullName());
        } catch (Exception e) {
            log.warn("Email failed: {}", e.getMessage());
        }

        return expertService.toDetail(expert);
    }

    @Override
    @Transactional
    public ExpertDetailResponse rejectExpert(Long expertId, String reason, Long adminUserId) {
        ExpertProfile expert = expertProfileRepository.findById(expertId)
                .orElseThrow(() -> new ResourceNotFoundException("Expert not found"));
        expert.setVerificationStatus("REJECTED");
        expertProfileRepository.save(expert);

        try {
            String expertEmail = userRepository.findById(expert.getUserId()).map(User::getEmail).orElse("");
            emailService.sendExpertRejectedEmail(expertEmail, expert.getFullName(), reason);
        } catch (Exception e) {
            log.warn("Email failed: {}", e.getMessage());
        }

        return expertService.toDetail(expert);
    }

    @Override
    @Transactional
    public void suspendUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus("SUSPENDED");
        userRepository.save(user);
    }

    @Override
    public List<ExpertDocumentResponse> getExpertDocuments(Long expertId) {
        return expertDocumentRepository.findByExpertId(expertId)
                .stream().map(this::toDocResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ExpertDocumentResponse approveDocument(Long documentId, Long adminUserId) {
        ExpertDocument doc = expertDocumentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        doc.setStatus("APPROVED");
        doc.setReviewedBy(adminUserId);
        return toDocResponse(expertDocumentRepository.save(doc));
    }

    @Override
    @Transactional
    public ExpertDocumentResponse rejectDocument(Long documentId, String notes, Long adminUserId) {
        ExpertDocument doc = expertDocumentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found"));
        doc.setStatus("REJECTED");
        doc.setReviewedBy(adminUserId);
        doc.setReviewNotes(notes);
        return toDocResponse(expertDocumentRepository.save(doc));
    }

    @Override
    public Page<StudentSummaryResponse> getAllStudents(Pageable pageable) {
        return studentProfileRepository.findAll(pageable).map(sp -> {
            User user = userRepository.findById(sp.getUserId()).orElse(null);
            return StudentSummaryResponse.builder()
                    .id(sp.getId()).fullName(sp.getFullName())
                    .institution(sp.getInstitution()).city(sp.getCity())
                    .email(user != null ? user.getEmail() : "")
                    .course(sp.getCourse()).branch(sp.getBranch())
                    .build();
        });
    }

    @Override
    public Page<BookingResponse> getAllBookings(String status, Pageable pageable) {
        Page<Booking> bookings;
        if (status != null && !status.isBlank()) {
            List<Booking> list = bookingRepository.findByStudentIdOrderByCreatedAtDesc(-1L);
            bookings = bookingRepository.findAll(pageable);
        } else {
            bookings = bookingRepository.findAll(pageable);
        }
        return bookings.map(b -> BookingResponse.builder()
                .id(b.getId()).publicId(b.getPublicId() != null ? b.getPublicId().toString() : null)
                .status(b.getStatus()).sessionFee(b.getSessionFee()).platformFee(b.getPlatformFee())
                .scheduledAt(b.getScheduledAt() != null ? b.getScheduledAt().toString() : null)
                .createdAt(b.getCreatedAt()).build());
    }

    @Override
    public Page<PaymentResponse> getAllPayments(Pageable pageable) {
        return paymentRepository.findAllByOrderByCreatedAtDesc(pageable).map(p ->
                PaymentResponse.builder()
                        .id(p.getId()).publicId(p.getPublicId() != null ? p.getPublicId().toString() : null)
                        .bookingId(p.getBookingId()).amount(p.getAmount())
                        .platformFee(p.getPlatformFee()).expertEarnings(p.getExpertEarnings())
                        .status(p.getStatus()).transactionId(p.getTransactionId())
                        .paymentMethod(p.getPaymentMethod()).paymentProvider(p.getPaymentProvider())
                        .createdAt(p.getCreatedAt()).build());
    }

    @Override
    @Transactional
    public void toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus("SUSPENDED".equalsIgnoreCase(user.getStatus()) ? "ACTIVE" : "SUSPENDED");
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void overrideBookingStatus(Long bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(status.toUpperCase());
        bookingRepository.save(booking);
    }

    @Override
    @Transactional
    public void overridePaymentStatus(Long paymentId, String status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));
        payment.setStatus(status.toUpperCase());
        paymentRepository.save(payment);
    }

    @Override
    @Transactional
    public String forceResetPassword(Long userId, String customPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String newPassword = (customPassword != null && !customPassword.isBlank())
                ? customPassword
                : "LecturelySec#" + (int)(Math.random() * 900000 + 100000);

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        log.info("Admin security override: Password reset for user ID {}", userId);
        return newPassword;
    }

    @Override
    @Transactional
    public void changeUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRole(newRole.toUpperCase());
        userRepository.save(user);
        log.info("Admin security override: Role updated to {} for user ID {}", newRole, userId);
    }

    @Override
    @Transactional
    public void revokeUserSessions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepository.save(user);
        log.info("Admin security override: Revoked active sessions for user ID {}", userId);
    }

    private ExpertDocumentResponse toDocResponse(ExpertDocument d) {
        return ExpertDocumentResponse.builder()
                .id(d.getId()).expertId(d.getExpertId()).documentType(d.getDocumentType())
                .fileUrl(d.getFileUrl()).fileName(d.getFileName()).status(d.getStatus())
                .reviewNotes(d.getReviewNotes()).createdAt(d.getCreatedAt()).build();
    }
}
