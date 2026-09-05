package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;

public class QrPaymentSubmitRequest {

    @NotNull(message = "Booking ID is required")
    private Long bookingId;

    @NotBlank(message = "Transaction ID or UTR is required")
    private String transactionId;

    private String screenshotUrl;

    public QrPaymentSubmitRequest() {}

    public QrPaymentSubmitRequest(Long bookingId, String transactionId, String screenshotUrl) {
        this.bookingId = bookingId;
        this.transactionId = transactionId;
        this.screenshotUrl = screenshotUrl;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getScreenshotUrl() { return screenshotUrl; }
    public void setScreenshotUrl(String screenshotUrl) { this.screenshotUrl = screenshotUrl; }
}
