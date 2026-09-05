package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.NotNull;

public class PaymentCreateRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    private String paymentMethod;

    public PaymentCreateRequest() {}

    public PaymentCreateRequest(Long bookingId, String paymentMethod) {
        this.bookingId = bookingId;
        this.paymentMethod = paymentMethod;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
