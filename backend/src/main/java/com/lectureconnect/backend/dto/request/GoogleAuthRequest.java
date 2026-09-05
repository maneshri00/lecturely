package com.lectureconnect.backend.dto.request;

public class GoogleAuthRequest {
    private String idToken;
    private String email;
    private String fullName;
    private String profilePhotoUrl;
    private String role = "STUDENT";
    private String institution;

    public GoogleAuthRequest() {}

    public String getIdToken() { return idToken; }
    public void setIdToken(String idToken) { this.idToken = idToken; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
}
