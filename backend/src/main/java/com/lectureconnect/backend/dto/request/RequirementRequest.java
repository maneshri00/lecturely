package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public class RequirementRequest {

    @NotBlank(message = "Session title is required")
    private String title;

    private String subject;
    private String topic;

    @NotBlank(message = "Description is required")
    private String description;

    private String targetAudience;

    @Min(value = 1, message = "At least 1 attendee required")
    private Integer numAttendees;

    private LocalDate preferredDate;
    private LocalTime preferredTime;

    @Min(value = 30, message = "Minimum duration is 30 minutes")
    private Integer durationMinutes;

    private String mode;
    private String location;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private String language;
    private String expertCategory;
    private String specialRequirements;

    public RequirementRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getTargetAudience() { return targetAudience; }
    public void setTargetAudience(String targetAudience) { this.targetAudience = targetAudience; }

    public Integer getNumAttendees() { return numAttendees; }
    public void setNumAttendees(Integer numAttendees) { this.numAttendees = numAttendees; }

    public LocalDate getPreferredDate() { return preferredDate; }
    public void setPreferredDate(LocalDate preferredDate) { this.preferredDate = preferredDate; }

    public LocalTime getPreferredTime() { return preferredTime; }
    public void setPreferredTime(LocalTime preferredTime) { this.preferredTime = preferredTime; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getBudgetMin() { return budgetMin; }
    public void setBudgetMin(BigDecimal budgetMin) { this.budgetMin = budgetMin; }

    public BigDecimal getBudgetMax() { return budgetMax; }
    public void setBudgetMax(BigDecimal budgetMax) { this.budgetMax = budgetMax; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getExpertCategory() { return expertCategory; }
    public void setExpertCategory(String expertCategory) { this.expertCategory = expertCategory; }

    public String getSpecialRequirements() { return specialRequirements; }
    public void setSpecialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; }
}
