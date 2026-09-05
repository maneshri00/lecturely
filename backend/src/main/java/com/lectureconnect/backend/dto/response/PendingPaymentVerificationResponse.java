package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PendingPaymentVerificationResponse {
    private Long paymentId;
    private Long bookingId;
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Long expertId;
    private String expertName;
    private BigDecimal amount;
    private BigDecimal platformFee;
    private String transactionId;
    private String screenshotUrl;
    private String verificationStatus;
    private String status;
    private LocalDateTime createdAt;

    public PendingPaymentVerificationResponse() {}

    public PendingPaymentVerificationResponse(Long paymentId, Long bookingId, Long studentId, String studentName, String studentEmail, Long expertId, String expertName, BigDecimal amount, BigDecimal platformFee, String transactionId, String screenshotUrl, String verificationStatus, String status, LocalDateTime createdAt) {
        this.paymentId = paymentId;
        this.bookingId = bookingId;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.expertId = expertId;
        this.expertName = expertName;
        this.amount = amount;
        this.platformFee = platformFee;
        this.transactionId = transactionId;
        this.screenshotUrl = screenshotUrl;
        this.verificationStatus = verificationStatus;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public String getExpertName() { return expertName; }
    public void setExpertName(String expertName) { this.expertName = expertName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getScreenshotUrl() { return screenshotUrl; }
    public void setScreenshotUrl(String screenshotUrl) { this.screenshotUrl = screenshotUrl; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
