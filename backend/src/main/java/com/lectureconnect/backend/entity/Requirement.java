package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "requirements")
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "public_id", updatable = false)
    private UUID publicId = UUID.randomUUID();

    @Column(name = "student_id", nullable = false)
    private Long studentId;

    @Column(nullable = false)
    private String title;

    private String subject;
    private String topic;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "target_audience")
    private String targetAudience;

    @Column(name = "num_attendees")
    private Integer numAttendees;

    @Column(name = "preferred_date")
    private LocalDate preferredDate;

    @Column(name = "preferred_time")
    private LocalTime preferredTime;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    private String mode;
    private String location;

    @Column(name = "budget_min")
    private BigDecimal budgetMin;

    @Column(name = "budget_max")
    private BigDecimal budgetMax;

    private String language;

    @Column(name = "expert_category")
    private String expertCategory;

    @Column(name = "special_requirements", columnDefinition = "TEXT")
    private String specialRequirements;

    private String status = "OPEN";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Requirement() {}

    public Requirement(Long id, UUID publicId, Long studentId, String title, String subject, String topic, String description, String targetAudience, Integer numAttendees, LocalDate preferredDate, LocalTime preferredTime, Integer durationMinutes, String mode, String location, BigDecimal budgetMin, BigDecimal budgetMax, String language, String expertCategory, String specialRequirements, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.publicId = publicId != null ? publicId : UUID.randomUUID();
        this.studentId = studentId;
        this.title = title;
        this.subject = subject;
        this.topic = topic;
        this.description = description;
        this.targetAudience = targetAudience;
        this.numAttendees = numAttendees;
        this.preferredDate = preferredDate;
        this.preferredTime = preferredTime;
        this.durationMinutes = durationMinutes;
        this.mode = mode;
        this.location = location;
        this.budgetMin = budgetMin;
        this.budgetMax = budgetMax;
        this.language = language;
        this.expertCategory = expertCategory;
        this.specialRequirements = specialRequirements;
        this.status = status != null ? status : "OPEN";
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

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

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

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private UUID publicId = UUID.randomUUID();
        private Long studentId;
        private String title;
        private String subject;
        private String topic;
        private String description;
        private String targetAudience;
        private Integer numAttendees;
        private LocalDate preferredDate;
        private LocalTime preferredTime;
        private Integer durationMinutes;
        private String mode;
        private String location;
        private BigDecimal budgetMin;
        private BigDecimal budgetMax;
        private String language;
        private String expertCategory;
        private String specialRequirements;
        private String status = "OPEN";
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(UUID publicId) { this.publicId = publicId; return this; }
        public Builder studentId(Long studentId) { this.studentId = studentId; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder subject(String subject) { this.subject = subject; return this; }
        public Builder topic(String topic) { this.topic = topic; return this; }
        public Builder description(String description) { this.description = description; return this; }
        public Builder targetAudience(String targetAudience) { this.targetAudience = targetAudience; return this; }
        public Builder numAttendees(Integer numAttendees) { this.numAttendees = numAttendees; return this; }
        public Builder preferredDate(LocalDate preferredDate) { this.preferredDate = preferredDate; return this; }
        public Builder preferredTime(LocalTime preferredTime) { this.preferredTime = preferredTime; return this; }
        public Builder durationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; return this; }
        public Builder mode(String mode) { this.mode = mode; return this; }
        public Builder location(String location) { this.location = location; return this; }
        public Builder budgetMin(BigDecimal budgetMin) { this.budgetMin = budgetMin; return this; }
        public Builder budgetMax(BigDecimal budgetMax) { this.budgetMax = budgetMax; return this; }
        public Builder language(String language) { this.language = language; return this; }
        public Builder expertCategory(String expertCategory) { this.expertCategory = expertCategory; return this; }
        public Builder specialRequirements(String specialRequirements) { this.specialRequirements = specialRequirements; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Requirement build() {
            return new Requirement(id, publicId, studentId, title, subject, topic, description, targetAudience, numAttendees, preferredDate, preferredTime, durationMinutes, mode, location, budgetMin, budgetMax, language, expertCategory, specialRequirements, status, createdAt, updatedAt);
        }
    }
}
