package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RequirementResponse {
    private Long id;
    private String publicId;
    private String title;
    private String subject;
    private String topic;
    private String description;
    private String targetAudience;
    private String mode;
    private String location;
    private String language;
    private String status;
    private Integer numAttendees;
    private Integer durationMinutes;
    private BigDecimal budgetMin;
    private BigDecimal budgetMax;
    private String preferredDate;
    private String preferredTime;
    private String expertCategory;
    private String specialRequirements;
    private LocalDateTime createdAt;

    public RequirementResponse() {}

    public RequirementResponse(Long id, String publicId, String title, String subject, String topic, String description, String targetAudience, String mode, String location, String language, String status, Integer numAttendees, Integer durationMinutes, BigDecimal budgetMin, BigDecimal budgetMax, String preferredDate, String preferredTime, String expertCategory, String specialRequirements, LocalDateTime createdAt) {
        this.id = id;
        this.publicId = publicId;
        this.title = title;
        this.subject = subject;
        this.topic = topic;
        this.description = description;
        this.targetAudience = targetAudience;
        this.mode = mode;
        this.location = location;
        this.language = language;
        this.status = status;
        this.numAttendees = numAttendees;
        this.durationMinutes = durationMinutes;
        this.budgetMin = budgetMin;
        this.budgetMax = budgetMax;
        this.preferredDate = preferredDate;
        this.preferredTime = preferredTime;
        this.expertCategory = expertCategory;
        this.specialRequirements = specialRequirements;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

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

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getNumAttendees() { return numAttendees; }
    public void setNumAttendees(Integer numAttendees) { this.numAttendees = numAttendees; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public BigDecimal getBudgetMin() { return budgetMin; }
    public void setBudgetMin(BigDecimal budgetMin) { this.budgetMin = budgetMin; }

    public BigDecimal getBudgetMax() { return budgetMax; }
    public void setBudgetMax(BigDecimal budgetMax) { this.budgetMax = budgetMax; }

    public String getPreferredDate() { return preferredDate; }
    public void setPreferredDate(String preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }

    public String getExpertCategory() { return expertCategory; }
    public void setExpertCategory(String expertCategory) { this.expertCategory = expertCategory; }

    public String getSpecialRequirements() { return specialRequirements; }
    public void setSpecialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String publicId;
        private String title;
        private String subject;
        private String topic;
        private String description;
        private String targetAudience;
        private String mode;
        private String location;
        private String language;
        private String status;
        private Integer numAttendees;
        private Integer durationMinutes;
        private BigDecimal budgetMin;
        private BigDecimal budgetMax;
        private String preferredDate;
        private String preferredTime;
        private String expertCategory;
        private String specialRequirements;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(String publicId) { this.publicId = publicId; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder subject(String subject) { this.subject = subject; return this; }
        public Builder topic(String topic) { this.topic = topic; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder targetAudience(String targetAudience) { this.targetAudience = targetAudience; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder language(String language) { this.language = language; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder numAttendees(Integer numAttendees) { this.numAttendees = numAttendees; return this; }
        public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public Builder budgetMin(BigDecimal budgetMin) { this.budgetMin = budgetMin; return this; }
        public Builder budgetMax(BigDecimal budgetMax) { this.budgetMax = budgetMax; return this; }
        public Builder preferredDate(String preferredDate) { this.preferredDate = preferredDate; return this; }
        public Builder preferredTime(String preferredTime) { this.preferredTime = preferredTime; return this; }
        public Builder expertCategory(String expertCategory) { this.expertCategory = expertCategory; return this; }
        public Builder specialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public RequirementResponse build() {
            return new RequirementResponse(id, publicId, title, subject, topic, description, targetAudience, mode, location, language, status, numAttendees, durationMinutes, budgetMin, budgetMax, preferredDate, preferredTime, expertCategory, specialRequirements, createdAt);
        }
    }
}
