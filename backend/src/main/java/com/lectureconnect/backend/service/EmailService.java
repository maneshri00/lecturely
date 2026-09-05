package com.lectureconnect.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface EmailService {
    void sendWelcomeEmail(String toEmail, String name, String role);
    void sendBookingRequestEmail(String toEmail, String expertName, String sessionTitle, String studentName);
    void sendBookingAcceptedEmail(String toEmail, String studentName, String sessionTitle, LocalDateTime scheduledAt);
    void sendBookingConfirmedEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink);
    void sendBookingCompletedEmail(String toEmail, String studentName, String sessionTitle, String reviewLink);
    void sendPaymentSuccessEmail(String toEmail, String name, BigDecimal amount, String txnId);
    void sendExpertVerifiedEmail(String toEmail, String expertName);
    void sendExpertRejectedEmail(String toEmail, String expertName, String reason);
    void sendOtpEmail(String toEmail, String otpCode);
    void sendScheduledGoogleMeetEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink, LocalDateTime scheduledAt, Integer durationMinutes);
}
