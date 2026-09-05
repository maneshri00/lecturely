package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String name;
    private String email;
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(name = "platform_rating")
    private Integer platformRating;

    private String status = "NEW";

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Feedback() {}

    public Feedback(Long id, Long userId, String name, String email, String category, String message, Integer platformRating, String status, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.category = category;
        this.message = message;
        this.platformRating = platformRating;
        this.status = status != null ? status : "NEW";
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Integer getPlatformRating() { return platformRating; }
    public void setPlatformRating(Integer platformRating) { this.platformRating = platformRating; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long userId;
        private String name;
        private String email;
        private String category;
        private String message;
        private Integer platformRating;
        private String status = "NEW";
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder platformRating(Integer platformRating) { this.platformRating = platformRating; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Feedback build() {
            return new Feedback(id, userId, name, email, category, message, platformRating, status, createdAt);
        }
    }
}
