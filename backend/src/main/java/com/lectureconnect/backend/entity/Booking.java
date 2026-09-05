package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id", updatable = false)
    private UUID publicId = UUID.randomUUID();

    @Column(name = "requirement_id")
    private Long requirementId;

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(name = "expert_id", nullable = false)
    private Long expertId;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(name = "session_fee")
    private BigDecimal sessionFee;

    @Column(name = "platform_fee")
    private BigDecimal platformFee;

    @Column(name = "expert_earnings")
    private BigDecimal expertEarnings;

    @Column(name = "scheduled_at")
    private LocalDateTime scheduledAt;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    private String mode;

    @Column(name = "meeting_link")
    private String meetingLink;

    @Column(name = "student_message", columnDefinition = "TEXT")
    private String studentMessage;

    @Column(name = "counter_offer_note", columnDefinition = "TEXT")
    private String counterOfferNote;

    @Column(name = "counter_offer_fee")
    private BigDecimal counterOfferFee;

    @Column(name = "cancelled_by")
    private Long cancelledBy;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Booking() {}

    public Booking(Long id, UUID publicId, Long requirementId, Long studentId, Long expertId, String status, BigDecimal sessionFee, BigDecimal platformFee, BigDecimal expertEarnings, LocalDateTime scheduledAt, Integer durationMinutes, String mode, String meetingLink, String studentMessage, String counterOfferNote, BigDecimal counterOfferFee, Long cancelledBy, String cancelReason, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.publicId = publicId != null ? publicId : UUID.randomUUID();
        this.requirementId = requirementId;
        this.studentId = studentId;
        this.expertId = expertId;
        this.status = status != null ? status : "PENDING";
        this.sessionFee = sessionFee;
        this.platformFee = platformFee;
        this.expertEarnings = expertEarnings;
        this.scheduledAt = scheduledAt;
        this.durationMinutes = durationMinutes;
        this.mode = mode;
        this.meetingLink = meetingLink;
        this.studentMessage = studentMessage;
        this.counterOfferNote = counterOfferNote;
        this.counterOfferFee = counterOfferFee;
        this.cancelledBy = cancelledBy;
        this.cancelReason = cancelReason;
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

    public Long getRequirementId() { return requirementId; }
    public void setRequirementId(Long requirementId) { this.requirementId = requirementId; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; }

    public BigDecimal getPlatformFee() { return platformFee; }
    public void setPlatformFee(BigDecimal platformFee) { this.platformFee = platformFee; }

    public BigDecimal getExpertEarnings() { return expertEarnings; }
    public void setExpertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }

    public String getStudentMessage() { return studentMessage; }
    public void setStudentMessage(String studentMessage) { this.studentMessage = studentMessage; }

    public String getCounterOfferNote() { return counterOfferNote; }
    public void setCounterOfferNote(String counterOfferNote) { this.counterOfferNote = counterOfferNote; }

    public BigDecimal getCounterOfferFee() { return counterOfferFee; }
    public void setCounterOfferFee(BigDecimal counterOfferFee) { this.counterOfferFee = counterOfferFee; }

    public Long getCancelledBy() { return cancelledBy; }
    public void setCancelledBy(Long cancelledBy) { this.cancelledBy = cancelledBy; }

    public String getCancelReason() { return cancelReason; }
    public void setCancelReason(String cancelReason) { this.cancelReason = cancelReason; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private UUID publicId = UUID.randomUUID();
        private Long requirementId;
        private Long studentId;
        private Long expertId;
        private String status = "PENDING";
        private BigDecimal sessionFee;
        private BigDecimal platformFee;
        private BigDecimal expertEarnings;
        private LocalDateTime scheduledAt;
        private Integer durationMinutes;
        private String mode;
        private String meetingLink;
        private String studentMessage;
        private String counterOfferNote;
        private BigDecimal counterOfferFee;
        private Long cancelledBy;
        private String cancelReason;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(UUID publicId) { this.publicId = publicId; return this; }
        public Builder requirementId(Long requirementId) { this.requirementId = requirementId; return this; }
        public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder sessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; return this; }
        public Builder platformFee(BigDecimal platformFee) { this.platformFee = platformFee; return this; }
        public Builder expertEarnings(BigDecimal expertEarnings) { this.expertEarnings = expertEarnings; return this; }
        public Builder scheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; return this; }
        public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder meetingLink(String meetingLink) { this.meetingLink = meetingLink; return this; }
        public Builder studentMessage(String studentMessage) { this.studentMessage = studentMessage; return this; }
        public Builder counterOfferNote(String counterOfferNote) { this.counterOfferNote = counterOfferNote; return this; }
        public Builder counterOfferFee(BigDecimal counterOfferFee) { this.counterOfferFee = counterOfferFee; return this; }
        public Builder cancelledBy(Long cancelledBy) { this.cancelledBy = cancelledBy; return this; }
        public Builder cancelReason(String cancelReason) { this.cancelReason = cancelReason; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Booking build() {
            return new Booking(id, publicId, requirementId, studentId, expertId, status, sessionFee, platformFee, expertEarnings, scheduledAt, durationMinutes, mode, meetingLink, studentMessage, counterOfferNote, counterOfferFee, cancelledBy, cancelReason, createdAt, updatedAt);
        }
    }
}
