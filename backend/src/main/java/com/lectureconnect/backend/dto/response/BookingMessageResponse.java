package com.lectureconnect.backend.dto.response;

import java.time.LocalDateTime;

public class BookingMessageResponse {
    private Long id;
    private Long bookingId;
    private Long senderId;
    private String senderName;
    private String message;
    private LocalDateTime createdAt;

    public BookingMessageResponse() {}

    public BookingMessageResponse(Long id, Long bookingId, Long senderId, String senderName, String message, LocalDateTime createdAt) {
        this.id = id;
        this.bookingId = bookingId;
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getSenderId() { return senderId; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }

    public String getSenderName() { return senderName; }
    public void setSenderName(String senderName) { this.senderName = senderName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long bookingId;
        private Long senderId;
        private String senderName;
        private String message;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder senderId(Long senderId) { this.senderId = senderId; return this; }
        public Builder senderName(String senderName) { this.senderName = senderName; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public BookingMessageResponse build() {
            return new BookingMessageResponse(id, bookingId, senderId, senderName, message, createdAt);
        }
    }
}
