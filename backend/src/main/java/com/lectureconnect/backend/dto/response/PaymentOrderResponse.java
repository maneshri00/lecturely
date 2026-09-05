package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;

public class PaymentOrderResponse {
    private String orderId;
    private String currency;
    private BigDecimal amount;
    private Long bookingId;
    private String keyId = "rzp_test_mock";

    public PaymentOrderResponse() {}

    public PaymentOrderResponse(String orderId, String currency, BigDecimal amount, Long bookingId, String keyId) {
        this.orderId = orderId;
        this.currency = currency;
        this.amount = amount;
        this.bookingId = bookingId;
        this.keyId = keyId != null ? keyId : "rzp_test_mock";
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getKeyId() { return keyId; }
    public void setKeyId(String keyId) { this.keyId = keyId; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String orderId;
        private String currency;
        private BigDecimal amount;
        private Long bookingId;
        private String keyId = "rzp_test_mock";

        public Builder orderId(String orderId) { this.orderId = orderId; return this; }
        public Builder currency(String currency) { this.currency = currency; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder keyId(String keyId) { this.keyId = keyId; return this; }

        public PaymentOrderResponse build() {
            return new PaymentOrderResponse(orderId, currency, amount, bookingId, keyId);
        }
    }
}
