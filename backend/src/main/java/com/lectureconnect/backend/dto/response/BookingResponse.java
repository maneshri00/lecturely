package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingResponse {
    private Long id;
    private String publicId;
    private String status;
    private ExpertSummaryResponse expert;
    private StudentSummaryResponse student;
    private BigDecimal sessionFee;
    private BigDecimal platformFee;
    private BigDecimal expertEarnings;
    private BigDecimal counterOfferFee;
    private String scheduledAt;
    private String mode;
    private String meetingLink;
    private String studentMessage;
    private String counterOfferNote;
    private Integer durationMinutes;
    private LocalDateTime createdAt;
    private Long requirementId;
    private String transactionId;
    private String paymentScreenshotUrl;

    public BookingResponse() {}

    public BookingResponse(Long id, String publicId, String status, ExpertSummaryResponse expert, StudentSummaryResponse student, BigDecimal sessionFee, BigDecimal platformFee, BigDecimal expertEarnings, BigDecimal counterOfferFee, String scheduledAt, String mode, String meetingLink, String studentMessage, String counterOfferNote, Integer durationMinutes, LocalDateTime createdAt, Long requirementId) {
        this.id = id;
        this.publicId = publicId;
        this.status = status;
        this.expert = expert;
        this.student = student;
        this.sessionFee = sessionFee;
        this.platformFee = platformFee;
        this.expertEarnings = expertEarnings;
        this.counterOfferFee = counterOfferFee;
        this.scheduledAt = scheduledAt;
        this.mode = mode;
        this.meetingLink = meetingLink;
        this.studentMessage = studentMessage;
        this.counterOfferNote = counterOfferNote;
        this.durationMinutes = durationMinutes;
        this.createdAt = createdAt;
        this.requirementId = requirementId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public ExpertSummaryResponse getExpert() { return expert; }
    public void setExpert(ExpertSummaryResponse expert) { this.expert = expert; }

    public StudentSummaryResponse getStudent() { return student; }
    public void setStudent(StudentSummaryResponse student) { this.student = student; }

    public BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getExpertEarnings() { return expertEarnings; }
    public void setExpertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; }

    public BigDecimal getCounterOfferFee() { return counterOfferFee; }
    public void setCounterOfferFee(BigDecimal counterOfferFee) { this.counterOfferFee = counterOfferFee; }

    public String getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(String scheduledAt) { this.scheduledAt = scheduledAt; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public String getStudentMessage() { return studentMessage; }
    public void setStudentMessage(String studentMessage) { this.studentMessage = studentMessage; }

    public String getCounterOfferNote() { return counterOfferNote; }
    public void setCounterOfferNote(String counterOfferNote) { this.counterOfferNote = counterOfferNote; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public Long getRequirementId() { return requirementId; }
    public void setRequirementId(Long requirementId) { this.requirementId = requirementId; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getPaymentScreenshotUrl() { return paymentScreenshotUrl; }
    public void setPaymentScreenshotUrl(String paymentScreenshotUrl) { this.paymentScreenshotUrl = paymentScreenshotUrl; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String publicId;
        private String status;
        private ExpertSummaryResponse expert;
        private StudentSummaryResponse student;
        private BigDecimal sessionFee;
        private BigDecimal platformFee;
        private BigDecimal expertEarnings;
        private BigDecimal counterOfferFee;
        private String scheduledAt;
        private String mode;
        private String meetingLink;
        private String studentMessage;
        private String counterOfferNote;
        private Integer durationMinutes;
        private LocalDateTime createdAt;
        private Long requirementId;
        private String transactionId;
        private String paymentScreenshotUrl;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(String publicId) { this.publicId = publicId; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder expert(ExpertSummaryResponse expert) { this.expert = expert; return this; }
        public Builder student(StudentSummaryResponse student) { this.student = student; return this; }
        public Builder sessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder expertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; return this; }
        public Builder counterOfferFee(BigDecimal counterOfferFee) { this.counterOfferFee = counterOfferFee; return this; }
        public Builder scheduledAt(String scheduledAt) { this.scheduledAt = scheduledAt; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder meetingLink(String meetingLink) { this.meetingLink = meetingLink; return this; }
        public Builder studentMessage(String studentMessage) { this.studentMessage = studentMessage; return this; }
        public Builder counterOfferNote(String counterOfferNote) { this.counterOfferNote = counterOfferNote; return this; }
        public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder requirementId(Long requirementId) { this.requirementId = requirementId; return this; }
        public Builder transactionId(String transactionId) { this.transactionId = transactionId; return this; }
        public Builder paymentScreenshotUrl(String paymentScreenshotUrl) { this.paymentScreenshotUrl = paymentScreenshotUrl; return this; }

        public BookingResponse build() {
            BookingResponse res = new BookingResponse(id, publicId, status, expert, student, sessionFee, platformFee, expertEarnings, counterOfferFee, scheduledAt, mode, meetingLink, studentMessage, counterOfferNote, durationMinutes, createdAt, requirementId);
            res.setTransactionId(transactionId);
            res.setPaymentScreenshotUrl(paymentScreenshotUrl);
            return res;
        }
    }
}
