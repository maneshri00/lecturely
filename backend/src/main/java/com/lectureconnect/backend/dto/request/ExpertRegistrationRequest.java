package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public class ExpertRegistrationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email")
    private String email;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Organization is required")
    private String organization;

    @NotBlank(message = "Designation is required")
    private String designation;

    @Min(value = 0, message = "Industry experience cannot be negative")
    private Integer industryExperience;

    @Min(value = 0, message = "Academic experience cannot be negative")
    private Integer academicExperience;

    private String education;

    @Size(max = 2000, message = "Bio cannot exceed 2000 characters")
    private String bio;

    @DecimalMin(value = "0", message = "Session fee cannot be negative")
    private BigDecimal sessionFee;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    private String linkedinUrl;
    private String portfolioUrl;
    private List<String> areas;
    private List<String> languages;

    public ExpertRegistrationRequest() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Integer getIndustryExperience() { return industryExperience; }
    public void setIndustryExperience(Integer industryExperience) { this.industryExperience = industryExperience; }

    public Integer getAcademicExperience() { return academicExperience; }
    public void setAcademicExperience(Integer academicExperience) { this.academicExperience = academicExperience; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }

    public List<String> getAreas() { return areas; }
    public void setAreas(List<String> areas) { this.areas = areas; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }
}
