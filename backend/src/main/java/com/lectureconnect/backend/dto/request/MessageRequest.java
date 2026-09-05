package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public class MessageRequest {
    @NotBlank(message = "Message cannot be empty")
    private String message;

    public MessageRequest() {}
    public MessageRequest(String message) { this.message = message; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
