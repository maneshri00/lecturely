package com.lectureconnect.backend.dto.response;

public class UserSummaryResponse {
    private Long id;
    private String publicId;
    private String email;
    private String role;
    private String fullName;

    public UserSummaryResponse() {}

    public UserSummaryResponse(Long id, String publicId, String email, String role, String fullName) {
        this.id = id;
        this.publicId = publicId;
        this.email = email;
        this.role = role;
        this.fullName = fullName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String publicId;
        private String email;
        private String role;
        private String fullName;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(String publicId) { this.publicId = publicId; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder role(String role) { this.role = role; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }

        public UserSummaryResponse build() {
            return new UserSummaryResponse(id, publicId, email, role, fullName);
        }
    }
}
