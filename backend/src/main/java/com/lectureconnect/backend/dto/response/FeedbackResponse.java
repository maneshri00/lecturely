package com.lectureconnect.backend.dto.response;

import java.time.LocalDateTime;

public class FeedbackResponse {
    private Long id;
    private String name;
    private String email;
    private String category;
    private String message;
    private Integer platformRating;
    private String status;
    private LocalDateTime createdAt;

    public FeedbackResponse() {}

    public FeedbackResponse(Long id, String name, String email, String category, String message, Integer platformRating, String status, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.category = category;
        this.message = message;
        this.platformRating = platformRating;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
        private String name;
        private String email;
        private String category;
        private String message;
        private Integer platformRating;
        private String status;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder category(String category) { this.category = category; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder platformRating(Integer platformRating) { this.platformRating = platformRating; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public FeedbackResponse build() {
            return new FeedbackResponse(id, name, email, category, message, platformRating, status, createdAt);
        }
    }
}
