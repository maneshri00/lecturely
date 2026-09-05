package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentResponse {
    private Long id;
    private String publicId;
    private Long bookingId;
    private BigDecimal amount;
    private BigDecimal platformFee;
    private BigDecimal expertEarnings;
    private String status;
    private String transactionId;
    private String paymentMethod;
    private String paymentProvider;
    private LocalDateTime createdAt;

    public PaymentResponse() {}

    public PaymentResponse(Long id, String publicId, Long bookingId, BigDecimal amount, BigDecimal platformFee, BigDecimal expertEarnings, String status, String transactionId, String paymentMethod, String paymentProvider, LocalDateTime createdAt) {
        this.id = id;
        this.publicId = publicId;
        this.bookingId = bookingId;
        this.amount = amount;
        this.platformFee = platformFee;
        this.expertEarnings = expertEarnings;
        this.status = status;
        this.transactionId = transactionId;
        this.paymentMethod = paymentMethod;
        this.paymentProvider = paymentProvider;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

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

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentProvider() { return paymentProvider; }
    public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String publicId;
        private Long bookingId;
        private BigDecimal amount;
        private BigDecimal platformFee;
        private BigDecimal expertEarnings;
        private String status;
        private String transactionId;
        private String paymentMethod;
        private String paymentProvider;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(String publicId) { this.publicId = publicId; return this; }
        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder expertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder transactionId(String transactionId) { this.transactionId = transactionId; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder paymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public PaymentResponse build() {
            return new PaymentResponse(id, publicId, bookingId, amount, platformFee, expertEarnings, status, transactionId, paymentMethod, paymentProvider, createdAt);
        }
    }
}
