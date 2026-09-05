package com.lectureconnect.backend.dto.response;

public class BookedSlotResponse {
    private Long bookingId;
    private Long expertId;
    private String date;
    private String timeSlot;
    private String status;

    public BookedSlotResponse() {}

    public BookedSlotResponse(Long bookingId, Long expertId, String date, String timeSlot, String status) {
        this.bookingId = bookingId;
        this.expertId = expertId;
        this.date = date;
        this.timeSlot = timeSlot;
        this.status = status;
    }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long bookingId;
        private Long expertId;
        private String date;
        private String timeSlot;
        private String status;

        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder date(String date) { this.date = date; return this; }
        public Builder timeSlot(String timeSlot) { this.timeSlot = timeSlot; return this; }
        public Builder status(String status) { this.status = status; return this; }

        public BookedSlotResponse build() {
            return new BookedSlotResponse(bookingId, expertId, date, timeSlot, status);
        }
    }
}
