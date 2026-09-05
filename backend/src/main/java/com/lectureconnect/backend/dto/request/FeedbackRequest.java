package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;

public class FeedbackRequest {
    private String name;
    private String email;
    private String category;

    @NotBlank(message = "Feedback message is required")
    @Size(min = 10, message = "Please write at least 10 characters")
    private String message;

    @Min(1) @Max(5)
    private Integer platformRating;

    public FeedbackRequest() {}

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
}
