package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Primary
public class SmtpEmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(SmtpEmailServiceImpl.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    private final JavaMailSender mailSender;

    public SmtpEmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    private final java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(10);

    private void sendRealEmail(String toEmail, String subject, String htmlContent) {
        executor.submit(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setTo(toEmail);
                helper.setSubject(subject);
                helper.setText(htmlContent, true);
                mailSender.send(message);
                log.info("✅ REAL SMTP EMAIL SENT SUCCESSFULLY TO INBOX: {} | SUBJECT: {}", toEmail, subject);
            } catch (Exception e) {
                log.warn("⚠️ REAL SMTP EMAIL NOT SENT TO [{}] - Reason: SMTP Username/Password not configured in application.yml ({})", toEmail, e.getMessage());
                log.info("\n╔══════════════════════════════════════════════════════════╗\n" +
                         "║ 📧 FALLBACK CONSOLE LOG (Configure SMTP to receive in Gmail)\n" +
                         "║ RECIPIENT : {}\n" +
                         "║ SUBJECT   : {}\n" +
                         "╚══════════════════════════════════════════════════════════╝", toEmail, subject);
            }
        });
    }

    @Override
    public void sendOtpEmail(String toEmail, String otpCode) {
        String subject = "🔑 Your Login Verification OTP Code: " + otpCode;
        String textBody = String.format(
            "Your 6-digit One-Time Password (OTP) for login verification is:\n\n" +
            "👉  %s  👈\n\n" +
            "This code will expire in 5 minutes. Do not share this OTP with anyone.\n\n" +
            "Regards,\n" +
            "Lecturely India Security",
            otpCode
        );

        String html = String.format(
            "<html><body style='font-family:Arial,sans-serif;background-color:#090e18;color:#ffffff;padding:30px;'>" +
            "<div style='max-width:500px;margin:0 auto;background:#010101;padding:30px;border-radius:16px;border:1px solid #0a2540;'>" +
            "<p style='color:#cbd5e1;font-size:15px;line-height:1.5;'>Your 6-digit One-Time Password (OTP) for login verification is:</p>" +
            "<div style='text-align:center;padding:20px;margin:24px 0;background:#0a2540;border-radius:12px;border:1px solid #b58153;'>" +
            "<span style='font-size:32px;font-family:monospace;font-weight:900;letter-spacing:6px;color:#ffffff;'>👉  %s  👈</span>" +
            "</div>" +
            "<p style='color:#cbd5e1;font-size:14px;line-height:1.5;'>This code will expire in 5 minutes. Do not share this OTP with anyone.</p>" +
            "<hr style='border:0;border-top:1px solid #0a2540;margin:24px 0;'>" +
            "<p style='color:#cbd5e1;font-size:14px;line-height:1.5;'>Regards,<br/><strong>Lecturely India Security</strong></p>" +
            "</div></body></html>",
            otpCode
        );
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendWelcomeEmail(String toEmail, String name, String role) {
        String subject = "Welcome to Lecturely India! 🎓";
        String html = String.format("<p>Welcome %s! You registered as a %s.</p>", name, role);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendBookingRequestEmail(String toEmail, String expertName, String sessionTitle, String studentName) {
        String subject = "New Session Request: " + sessionTitle;
        String html = String.format("<p>Dear %s, %s has requested a session: %s.</p>", expertName, studentName, sessionTitle);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendBookingAcceptedEmail(String toEmail, String studentName, String sessionTitle, LocalDateTime scheduledAt) {
        String subject = "✅ Your Session Has Been Accepted!";
        String html = String.format("<p>Dear %s, your session %s was accepted.</p>", studentName, sessionTitle);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendBookingConfirmedEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink) {
        String subject = "📹 Google Meet Online Session Link: " + sessionTitle;
        String html = String.format(
            "<html><body style='font-family:Arial,sans-serif;background-color:#090e18;color:#ffffff;padding:30px;'>" +
            "<div style='max-width:550px;margin:0 auto;background:#010101;padding:30px;border-radius:16px;border:1px solid #0a2540;'>" +
            "<div style='text-align:center;margin-bottom:20px;'>" +
            "<h2 style='color:#ffebbf;margin:0;font-size:22px;'>📹 Google Meet Session Confirmed</h2>" +
            "<p style='color:#94a3b8;font-size:13px;'>Lecturely Online Session & Keynote Conference Room</p>" +
            "</div>" +
            "<p style='color:#e2e8f0;font-size:15px;line-height:1.5;'>Dear <strong>%s</strong>,</p>" +
            "<p style='color:#cbd5e1;font-size:14px;line-height:1.5;'>Your online session <strong>%s</strong> is confirmed. Your official Google Meet video conference link is ready below:</p>" +
            "<div style='text-align:center;padding:25px;margin:24px 0;background:#0a2540;border-radius:12px;border:1px solid #b58153;'>" +
            "<a href='%s' target='_blank' style='background-color:#00796b;color:#ffffff;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:900;font-size:15px;display:inline-block;box-shadow:0 4px 12px rgba(0,0,0,0.3);'>📹 Join Google Meet Session</a>" +
            "<p style='color:#94a3b8;font-size:12px;margin-top:14px;word-break:break-all;'>Direct Room Link: <a href='%s' style='color:#38bdf8;'>%s</a></p>" +
            "</div>" +
            "<p style='color:#94a3b8;font-size:13px;line-height:1.5;'>Please ensure you join at your scheduled session time. You can also access this link anytime from your Lecturely Dashboard.</p>" +
            "<hr style='border:0;border-top:1px solid #0a2540;margin:24px 0;'>" +
            "<p style='color:#cbd5e1;font-size:13px;line-height:1.5;'>Best regards,<br/><strong>Lecturely Platform Team</strong></p>" +
            "</div></body></html>",
            recipientName, sessionTitle, meetingLink, meetingLink, meetingLink
        );
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendBookingCompletedEmail(String toEmail, String studentName, String sessionTitle, String reviewLink) {
        String subject = "Session Completed - Share Your Feedback!";
        String html = String.format("<p>Dear %s, please review: %s</p>", studentName, reviewLink);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendPaymentSuccessEmail(String toEmail, String name, BigDecimal amount, String txnId) {
        String subject = "Payment Successful - ₹" + amount;
        String html = String.format("<p>Dear %s, payment of ₹%s confirmed. Txn: %s</p>", name, amount, txnId);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendExpertVerifiedEmail(String toEmail, String expertName) {
        String subject = "🎉 Your Profile is Verified!";
        String html = String.format("<p>Dear %s, your profile has been verified.</p>", expertName);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendExpertRejectedEmail(String toEmail, String expertName, String reason) {
        String subject = "Profile Verification Update";
        String html = String.format("<p>Dear %s, verification status update: %s</p>", expertName, reason);
        sendRealEmail(toEmail, subject, html);
    }

    @Override
    public void sendScheduledGoogleMeetEmail(String toEmail, String recipientName, String sessionTitle, String meetingLink, LocalDateTime scheduledAt, Integer durationMinutes) {
        String formattedTime = scheduledAt != null ? scheduledAt.format(FORMATTER) : "Scheduled Time";
        int duration = durationMinutes != null ? durationMinutes : 60;
        String liveMeetUrl = (meetingLink != null && !meetingLink.isBlank()) ? meetingLink : "https://meet.google.com/new";
        String calUrl = buildGoogleCalendarUrl(sessionTitle, "Lecturely Session between Student & Expert", scheduledAt, durationMinutes, liveMeetUrl);

        String subject = "📹 Scheduled Google Meet Link: " + sessionTitle + " (" + formattedTime + ")";
        String html = String.format(
            "<html><body style='font-family:Arial,sans-serif;background-color:#090e18;color:#ffffff;padding:30px;'>" +
            "<div style='max-width:580px;margin:0 auto;background:#010101;padding:30px;border-radius:16px;border:1px solid #0a2540;'>" +
            "<div style='text-align:center;margin-bottom:20px;'>" +
            "<h2 style='color:#ffebbf;margin:0;font-size:22px;'>📹 Google Meet Session Scheduled</h2>" +
            "<p style='color:#94a3b8;font-size:13px;'>Lecturely Online Session & Keynote Conference Room</p>" +
            "</div>" +
            "<p style='color:#e2e8f0;font-size:15px;line-height:1.5;'>Dear <strong>%s</strong>,</p>" +
            "<p style='color:#cbd5e1;font-size:14px;line-height:1.5;'>The slot for <strong>%s</strong> has been accepted and confirmed for <strong>%s</strong> (%d mins duration).</p>" +
            "<div style='text-align:center;padding:25px;margin:24px 0;background:#0a2540;border-radius:12px;border:1px solid #b58153;'>" +
            "<span style='display:block;color:#ffebbf;font-size:13px;font-weight:bold;margin-bottom:16px;text-transform:uppercase;'>📅 Scheduled Session Start Time:<br/><span style='font-size:16px;color:#ffffff;'>%s</span></span>" +
            "<div style='margin-bottom:12px;'>" +
            "<a href='%s' target='_blank' style='background-color:#00796b;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;margin:4px;box-shadow:0 4px 12px rgba(0,0,0,0.3);'>📹 Join Live Google Meet</a>" +
            "<a href='%s' target='_blank' style='background-color:#1a73e8;color:#ffffff;padding:12px 22px;text-decoration:none;border-radius:8px;font-weight:900;font-size:14px;display:inline-block;margin:4px;box-shadow:0 4px 12px rgba(0,0,0,0.3);'>📅 Add to Google Calendar</a>" +
            "</div>" +
            "<p style='color:#94a3b8;font-size:12px;margin-top:12px;word-break:break-all;'>Google Meet Link: <a href='%s' style='color:#38bdf8;'>%s</a></p>" +
            "</div>" +
            "<p style='color:#94a3b8;font-size:13px;line-height:1.5;'>Click <strong>Add to Google Calendar</strong> to sync this meeting directly with your Google Calendar, or click <strong>Join Live Google Meet</strong> to start/join the room instantly.</p>" +
            "<hr style='border:0;border-top:1px solid #0a2540;margin:24px 0;'>" +
            "<p style='color:#cbd5e1;font-size:13px;line-height:1.5;'>Best regards,<br/><strong>Lecturely Platform Team</strong></p>" +
            "</div></body></html>",
            recipientName, sessionTitle, formattedTime, duration, formattedTime, liveMeetUrl, calUrl, liveMeetUrl, liveMeetUrl
        );
        sendRealEmail(toEmail, subject, html);
    }

    private String buildGoogleCalendarUrl(String title, String details, LocalDateTime scheduledAt, Integer durationMinutes, String meetingLink) {
        if (scheduledAt == null) scheduledAt = LocalDateTime.now().plusDays(1);
        int duration = durationMinutes != null ? durationMinutes : 60;
        LocalDateTime endAt = scheduledAt.plusMinutes(duration);
        DateTimeFormatter calFmt = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss");
        String startStr = scheduledAt.format(calFmt);
        String endStr = endAt.format(calFmt);
        try {
            String encodedTitle = java.net.URLEncoder.encode(title, "UTF-8");
            String encodedDetails = java.net.URLEncoder.encode(details, "UTF-8");
            String encodedLoc = java.net.URLEncoder.encode(meetingLink != null ? meetingLink : "https://meet.google.com/new", "UTF-8");
            return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
                    "&text=" + encodedTitle +
                    "&dates=" + startStr + "/" + endStr +
                    "&details=" + encodedDetails +
                    "&location=" + encodedLoc;
        } catch (Exception e) {
            return "https://calendar.google.com";
        }
    }
}
