package com.lectureconnect.backend.dto.request;

public class RejectBookingRequest {
    private String reason;

    public RejectBookingRequest() {}
    public RejectBookingRequest(String reason) { this.reason = reason; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
