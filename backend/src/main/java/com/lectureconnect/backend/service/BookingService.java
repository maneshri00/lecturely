package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import java.util.List;

public interface BookingService {
    BookingResponse createBookingRequest(BookingRequest request, Long studentId);
    List<BookingResponse> getBookingsForStudent(Long studentId);
    List<BookingResponse> getBookingsForExpert(Long expertId);
    BookingResponse getBookingById(Long bookingId, Long userId);
    BookingResponse acceptBooking(Long bookingId, Long expertId);
    BookingResponse rejectBooking(Long bookingId, Long expertId, String reason);
    BookingResponse counterOffer(Long bookingId, Long expertId, CounterOfferRequest request);
    BookingResponse confirmCounterOffer(Long bookingId, Long studentId);
    BookingResponse processPayment(Long bookingId, PaymentVerifyRequest request, Long studentId);
    BookingResponse completeSession(Long bookingId, Long expertId);
    BookingResponse cancelBooking(Long bookingId, Long userId, String reason);
    List<BookingMessageResponse> getMessages(Long bookingId, Long userId);
    BookingMessageResponse sendMessage(Long bookingId, Long userId, String message);
    PaymentOrderResponse createPaymentOrder(Long bookingId, String paymentMethod, Long studentId);
    BookingResponse submitQrPayment(QrPaymentSubmitRequest request, Long studentId);
    List<PendingPaymentVerificationResponse> getPendingPaymentVerifications();
    BookingResponse verifyQrPayment(Long paymentId, boolean approve, String rejectionReason);
    List<BookedSlotResponse> getBookedSlotsForExpert(Long expertId);
}
