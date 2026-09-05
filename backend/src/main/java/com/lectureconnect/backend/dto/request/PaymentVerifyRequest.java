package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;

public class PaymentVerifyRequest {

    @NotBlank(message = "Order ID is required")
    private String orderId;

    @NotBlank(message = "Payment ID is required")
    private String paymentId;

    private String signature;

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    public PaymentVerifyRequest() {}

    public PaymentVerifyRequest(String orderId, String paymentId, String signature, Long bookingId) {
        this.orderId = orderId;
        this.paymentId = paymentId;
        this.signature = signature;
        this.bookingId = bookingId;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
}
