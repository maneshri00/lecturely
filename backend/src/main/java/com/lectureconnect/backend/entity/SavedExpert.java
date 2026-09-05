package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_experts")
public class SavedExpert {

    @EmbeddedId
    private SavedExpertId id;

    @Column(name = "saved_at", updatable = false)
    private LocalDateTime savedAt;

    public SavedExpert() {}
    public SavedExpert(SavedExpertId id, LocalDateTime savedAt) {
        this.id = id;
        this.savedAt = savedAt;
    }

    @PrePersist
    protected void onCreate() { savedAt = LocalDateTime.now(); }

    public SavedExpertId getId() { return id; }
    public void setId(SavedExpertId id) { this.id = id; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private SavedExpertId id;
        private LocalDateTime savedAt;

        public Builder id(SavedExpertId id) { this.id = id; return this; }
        public Builder savedAt(LocalDateTime savedAt) { this.savedAt = savedAt; return this; }

        public SavedExpert build() {
            return new SavedExpert(id, savedAt);
        }
    }

    @Embeddable
    public static class SavedExpertId implements Serializable {
        @Column(name = "student_id")
        private Long studentId;

        @Column(name = "expert_id")
        private Long expertId;

        public SavedExpertId() {}
        public SavedExpertId(Long studentId, Long expertId) {
            this.studentId = studentId;
            this.expertId = expertId;
        }

        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }

        public Long getExpertId() { return expertId; }
        public void setExpertId(Long expertId) { this.expertId = expertId; }
    }
}
