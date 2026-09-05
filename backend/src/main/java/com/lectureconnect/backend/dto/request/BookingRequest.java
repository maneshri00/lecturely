package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class BookingRequest {

    private Long requirementId;

    @NotNull(message = "Expert ID is required")
    private Long expertId;

    @NotNull(message = "Scheduled time is required")
    private LocalDateTime scheduledAt;

    @Min(value = 30, message = "Minimum duration is 30 minutes")
    private Integer durationMinutes;

    private String studentMessage;
    private String mode;
    private java.math.BigDecimal sessionFee;

    public BookingRequest() {}

    public Long getRequirementId() { return requirementId; }
    public void setRequirementId(Long requirementId) { this.requirementId = requirementId; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public LocalDateTime getScheduledAt() { return scheduledAt; }
    public void setScheduledAt(LocalDateTime scheduledAt) { this.scheduledAt = scheduledAt; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getStudentMessage() { return studentMessage; }
    public void setStudentMessage(String studentMessage) { this.studentMessage = studentMessage; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public java.math.BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(java.math.BigDecimal sessionFee) { this.sessionFee = sessionFee; }
}
