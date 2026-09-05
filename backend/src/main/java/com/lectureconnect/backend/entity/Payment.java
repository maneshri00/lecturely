package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id", updatable = false)
    private UUID publicId = UUID.randomUUID();

    @Column(name = "booking_id", unique = true, nullable = false)
    private Long bookingId;

    private BigDecimal amount;

    @Column(name = "platform_fee")
    private BigDecimal platformFee;

    @Column(name = "expert_earnings")
    private BigDecimal expertEarnings;

    private String status = "PENDING";

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_provider")
    private String paymentProvider = "MOCK";

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "razorpay_order_id")
    private String razorpayOrderId;

    @Column(name = "razorpay_payment_id")
    private String razorpayPaymentId;

    @Column(name = "screenshot_url", columnDefinition = "TEXT")
    private String screenshotUrl;

    @Column(name = "verification_status")
    private String verificationStatus = "PENDING";

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Payment() {}

    public Payment(Long id, UUID publicId, Long bookingId, BigDecimal amount, BigDecimal platformFee, BigDecimal expertEarnings, String status, String transactionId, String paymentProvider, String paymentMethod, String razorpayOrderId, String razorpayPaymentId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.publicId = publicId != null ? publicId : UUID.randomUUID();
        this.bookingId = bookingId;
        this.amount = amount;
        this.platformFee = platformFee;
        this.expertEarnings = expertEarnings;
        this.status = status != null ? status : "PENDING";
        this.transactionId = transactionId;
        this.paymentProvider = paymentProvider != null ? paymentProvider : "MOCK";
        this.paymentMethod = paymentMethod;
        this.razorpayOrderId = razorpayOrderId;
        this.razorpayPaymentId = razorpayPaymentId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (publicId == null) publicId = UUID.randomUUID();
    }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public UUID getPublicId() { return publicId; }
    public void setPublicId(UUID publicId) { this.publicId = publicId; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getExpertEarnings() { return expertEarnings; }
    public void setExpertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getPaymentProvider() { return paymentProvider; }
    public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }

    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; }

    public String getScreenshotUrl() { return screenshotUrl; }
    public void setScreenshotUrl(String screenshotUrl) { this.screenshotUrl = screenshotUrl; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private UUID publicId = UUID.randomUUID();
        private Long bookingId;
        private BigDecimal amount;
        private BigDecimal platformFee;
        private BigDecimal expertEarnings;
        private String status = "PENDING";
        private String transactionId;
        private String paymentProvider = "MOCK";
        private String paymentMethod;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String screenshotUrl;
        private String verificationStatus = "PENDING";
        private String rejectionReason;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(UUID publicId) { this.publicId = publicId; return this; }
        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder expertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder transactionId(String transactionId) { this.transactionId = transactionId; return this; }
        public Builder paymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder razorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; return this; }
        public Builder razorpayPaymentId(String razorpayPaymentId) { this.razorpayPaymentId = razorpayPaymentId; return this; }
        public Builder screenshotUrl(String screenshotUrl) { this.screenshotUrl = screenshotUrl; return this; }
        public Builder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder rejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Payment build() {
            Payment p = new Payment(id, publicId, bookingId, amount, platformFee, expertEarnings, status, transactionId, paymentProvider, paymentMethod, razorpayOrderId, razorpayPaymentId, createdAt, updatedAt);
            p.setScreenshotUrl(screenshotUrl);
            p.setVerificationStatus(verificationStatus);
            p.setRejectionReason(rejectionReason);
            return p;
        }
    }
}
