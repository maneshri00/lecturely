package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.service.EmailService;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class MockEmailService implements EmailService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MockEmailService.class);

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    private void logEmail(String to, String subject, String body) {
        log.info("\n" +
                "╔══════════════════════════════════════════════════════════╗\n" +
                "║                   📧 MOCK EMAIL SERVICE                  ║\n" +
                "╠══════════════════════════════════════════════════════════╣\n" +
                "║ TO      : {}\n" +
                "║ SUBJECT : {}\n" +
                "╠══════════════════════════════════════════════════════════╣\n" +
                "{}\n" +
                "╚══════════════════════════════════════════════════════════╝",
                to, subject, body);
    }

    @Override
    public void sendWelcomeEmail(String toEmail, String name, String role) {
        String subject = "Welcome to Lecturely India! 🎓";
        String body = buildWelcomeHtml(name, role);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendBookingRequestEmail(String toEmail, String expertName, String sessionTitle, String studentName) {
        String subject = "New Session Request: " + sessionTitle;
        String body = String.format("Dear %s,\n\n%s has requested a session: '%s'.\nPlease login to review and respond.\n\nRegards,\nLecturely India", expertName, studentName, sessionTitle);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendBookingAcceptedEmail(String toEmail, String studentName, String sessionTitle, LocalDateTime scheduledAt) {
        String subject = "✅ Your Session Has Been Accepted!";
        String body = String.format("Dear %s,\n\nGreat news! Your session '%s' has been accepted.\nScheduled: %s\n\nPlease proceed to payment to confirm your booking.\n\nRegards,\nLecturely India",
                studentName, sessionTitle, scheduledAt != null ? scheduledAt.format(FORMATTER) : "TBD");
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendBookingConfirmedEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink) {
        String subject = "🎉 Session Confirmed: " + sessionTitle;
        String body = String.format("Dear %s,\n\nYour session '%s' is now CONFIRMED!\n\nMeeting Link: %s\n\nSee you there!\n\nRegards,\nLecturely India",
                recipientName, sessionTitle, meetingLink != null ? meetingLink : "Will be shared shortly");
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendBookingCompletedEmail(String toEmail, String studentName, String sessionTitle, String reviewLink) {
        String subject = "Session Completed - Share Your Feedback!";
        String body = String.format("Dear %s,\n\nWe hope your session '%s' was valuable!\n\nPlease take a moment to leave a review:\n%s\n\nThank you for using Lecturely India!\n\nRegards,\nLecturely Team",
                studentName, sessionTitle, reviewLink);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendPaymentSuccessEmail(String toEmail, String name, BigDecimal amount, String txnId) {
        String subject = "Payment Successful - ₹" + amount;
        String body = String.format("Dear %s,\n\nPayment of ₹%s received successfully!\nTransaction ID: %s\n\nYour booking is now CONFIRMED.\n\nRegards,\nLecturely India",
                name, amount, txnId);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendExpertVerifiedEmail(String toEmail, String expertName) {
        String subject = "🎉 Your Profile is Verified!";
        String body = String.format("Dear %s,\n\nCongratulations! Your Lecturely India profile has been verified.\nYou can now receive session requests from students.\n\nRegards,\nLecturely India", expertName);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendExpertRejectedEmail(String toEmail, String expertName, String reason) {
        String subject = "Profile Verification Update";
        String body = String.format("Dear %s,\n\nWe were unable to verify your profile at this time.\nReason: %s\n\nPlease upload updated documents and resubmit.\n\nRegards,\nLecturely India",
                expertName, reason != null ? reason : "Documents could not be verified");
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendOtpEmail(String toEmail, String otpCode) {
        String subject = "🔑 Your Login OTP Code: " + otpCode;
        String body = String.format("Dear User,\n\nYour 6-digit One-Time Password (OTP) for login verification is:\n\n👉  %s  👈\n\nThis code will expire in 5 minutes. Do not share this OTP with anyone.\n\nRegards,\nLecturely India Security", otpCode);
        logEmail(toEmail, subject, body);
    }

    @Override
    public void sendScheduledGoogleMeetEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink, LocalDateTime scheduledAt, Integer durationMinutes) {
        String timeStr = scheduledAt != null ? scheduledAt.format(FORMATTER) : "Scheduled Time";
        String subject = "📹 Scheduled Google Meet Link: " + sessionTitle + " (" + timeStr + ")";
        String body = String.format("Dear %s,\n\nYour online session '%s' is ACCEPTED for %s (%d mins).\n\n📹 Google Meet Link: %s\n\nPlease join on time!\n\nRegards,\nLecturely Team",
                recipientName, sessionTitle, timeStr, durationMinutes != null ? durationMinutes : 60, meetingLink);
        logEmail(toEmail, subject, body);
    }

    private String buildWelcomeHtml(String name, String role) {
        return String.format(
            "<html><body style='font-family:Inter,sans-serif;margin:0;padding:0'>" +
            "<div style='background:linear-gradient(135deg,#0a2540,#b58153);padding:40px 20px;text-align:center'>" +
            "<h1 style='color:white;margin:0;font-size:28px'>Welcome to Lecturely India! 🎓</h1>" +
            "<p style='color:rgba(255,255,255,0.9);margin:10px 0 0'>India's Premier Expert Session Booking Platform</p>" +
            "</div>" +
            "<div style='padding:40px 20px;max-width:600px;margin:0 auto'>" +
            "<h2 style='color:#1e293b'>Hello, %s! 👋</h2>" +
            "<p style='color:#64748b;line-height:1.6'>You've successfully registered as a <strong>%s</strong> on Lecturely India.</p>" +
            "<div style='background:#f8fafc;border-radius:12px;padding:20px;margin:20px 0'>" +
            "<h3 style='color:#b58153;margin-top:0'>What's Next?</h3>" +
            "<ul style='color:#475569;line-height:2'>" +
            "<li>Complete your profile</li>" +
            "<li>%s</li>" +
            "<li>Connect with India's best experts</li>" +
            "</ul></div>" +
            "<a href='http://localhost:5173' style='display:inline-block;background:#b58153;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600'>Get Started →</a>" +
            "</div>" +
            "<div style='background:#f1f5f9;padding:20px;text-align:center;color:#94a3b8;font-size:12px'>" +
            "<p>© 2026 Lecturely India</p>" +
            "</div></body></html>",
            name, role,
            "EXPERT".equals(role) ? "Upload verification documents" : "Search for expert sessions"
        );
    }
}
