package com.lectureconnect.backend.dto.response;

import java.time.LocalDateTime;

public class NotificationResponse {
    private Long id;
    private String type;
    private String title;
    private String message;
    private Boolean isRead;
    private String link;
    private LocalDateTime createdAt;

    public NotificationResponse() {}

    public NotificationResponse(Long id, String type, String title, String message, Boolean isRead, String link, LocalDateTime createdAt) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.isRead = isRead;
        this.link = link;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String type;
        private String title;
        private String message;
        private Boolean isRead;
        private String link;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder type(String type) { this.type = type; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public Builder link(String link) { this.link = link; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public NotificationResponse build() {
            return new NotificationResponse(id, type, title, message, isRead, link, createdAt);
        }
    }
}
