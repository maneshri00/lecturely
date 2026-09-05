package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class ExpertSummaryResponse {
    private Long id;
    private String publicId;
    private String fullName;
    private String organization;
    private String designation;
    private Double rating;
    private Integer totalSessions;
    private Integer totalInstitutions;
    private String city;
    private String state;
    private BigDecimal sessionFee;
    private String verificationStatus;
    private Boolean isOnlineAvailable;
    private Boolean isOfflineAvailable;
    private Boolean isTravelAvailable;
    private List<String> expertise;
    private List<String> languages;
    private String profilePhotoUrl;
    private String linkedinUrl;
    private List<String> servicesOffered;
    private Integer matchScore;
    private Integer industryExperience;
    private Integer academicExperience;

    public ExpertSummaryResponse() {}

    public ExpertSummaryResponse(Long id, String publicId, String fullName, String organization, String designation, Double rating, Integer totalSessions, Integer totalInstitutions, String city, String state, BigDecimal sessionFee, String verificationStatus, Boolean isOnlineAvailable, Boolean isOfflineAvailable, Boolean isTravelAvailable, List<String> expertise, List<String> languages, String profilePhotoUrl, String linkedinUrl, List<String> servicesOffered, Integer matchScore, Integer industryExperience, Integer academicExperience) {
        this.id = id;
        this.publicId = publicId;
        this.fullName = fullName;
        this.organization = organization;
        this.designation = designation;
        this.rating = rating;
        this.totalSessions = totalSessions;
        this.totalInstitutions = totalInstitutions;
        this.city = city;
        this.state = state;
        this.sessionFee = sessionFee;
        this.verificationStatus = verificationStatus;
        this.isOnlineAvailable = isOnlineAvailable;
        this.isOfflineAvailable = isOfflineAvailable;
        this.isTravelAvailable = isTravelAvailable;
        this.expertise = expertise;
        this.languages = languages;
        this.profilePhotoUrl = profilePhotoUrl;
        this.linkedinUrl = linkedinUrl;
        this.servicesOffered = servicesOffered;
        this.matchScore = matchScore;
        this.industryExperience = industryExperience;
        this.academicExperience = academicExperience;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalSessions() { return totalSessions; }
    public void setTotalSessions(Integer totalSessions) { this.totalSessions = totalSessions; }

    public Integer getTotalInstitutions() { return totalInstitutions; }
    public void setTotalInstitutions(Integer totalInstitutions) { this.totalInstitutions = totalInstitutions; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public Boolean getIsOnlineAvailable() { return isOnlineAvailable; }
    public void setIsOnlineAvailable(Boolean isOnlineAvailable) { this.isOnlineAvailable = isOnlineAvailable; }

    public Boolean getIsOfflineAvailable() { return isOfflineAvailable; }
    public void setIsOfflineAvailable(Boolean isOfflineAvailable) { this.isOfflineAvailable = isOfflineAvailable; }

    public Boolean getIsTravelAvailable() { return isTravelAvailable; }
    public void setIsTravelAvailable(Boolean isTravelAvailable) { this.isTravelAvailable = isTravelAvailable; }

    public List<String> getExpertise() { return expertise; }
    public void setExpertise(List<String> expertise) { this.expertise = expertise; }

    public List<String> getLanguages() { return languages; }
    public void setLanguages(List<String> languages) { this.languages = languages; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public List<String> getServicesOffered() { return servicesOffered; }
    public void setServicesOffered(List<String> servicesOffered) { this.servicesOffered = servicesOffered; }

    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }

    public Integer getIndustryExperience() { return industryExperience; }
    public void setIndustryExperience(Integer industryExperience) { this.industryExperience = industryExperience; }

    public Integer getAcademicExperience() { return academicExperience; }
    public void setAcademicExperience(Integer academicExperience) { this.academicExperience = academicExperience; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String publicId;
        private String fullName;
        private String organization;
        private String designation;
        private Double rating;
        private Integer totalSessions;
        private Integer totalInstitutions;
        private String city;
        private String state;
        private BigDecimal sessionFee;
        private String verificationStatus;
        private Boolean isOnlineAvailable;
        private Boolean isOfflineAvailable;
        private Boolean isTravelAvailable;
        private List<String> expertise;
        private List<String> languages;
        private String profilePhotoUrl;
        private String linkedinUrl;
        private List<String> servicesOffered;
        private Integer matchScore;
        private Integer industryExperience;
        private Integer academicExperience;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder publicId(String publicId) { this.publicId = publicId; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder organization(String organization) { this.organization = organization; return this; }
        public Builder designation(String designation) { this.designation = designation; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder totalSessions(Integer totalSessions) { this.totalSessions = totalSessions; return this; }
        public Builder totalInstitutions(Integer totalInstitutions) { this.totalInstitutions = totalInstitutions; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder sessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; return this; }
        public Builder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder isOnlineAvailable(Boolean isOnlineAvailable) { this.isOnlineAvailable = isOnlineAvailable; return this; }
        public Builder isOfflineAvailable(Boolean isOfflineAvailable) { this.isOfflineAvailable = isOfflineAvailable; return this; }
        public Builder isTravelAvailable(Boolean isTravelAvailable) { this.isTravelAvailable = isTravelAvailable; return this; }
        public Builder expertise(List<String> expertise) { this.expertise = expertise; return this; }
        public Builder languages(List<String> languages) { this.languages = languages; return this; }
        public Builder profilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; return this; }
        public Builder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public Builder servicesOffered(List<String> servicesOffered) { this.servicesOffered = servicesOffered; return this; }
        public Builder matchScore(Integer matchScore) { this.matchScore = matchScore; return this; }
        public Builder industryExperience(Integer industryExperience) { this.industryExperience = industryExperience; return this; }
        public Builder academicExperience(Integer academicExperience) { this.academicExperience = academicExperience; return this; }

        public ExpertSummaryResponse build() {
            return new ExpertSummaryResponse(id, publicId, fullName, organization, designation, rating, totalSessions, totalInstitutions, city, state, sessionFee, verificationStatus, isOnlineAvailable, isOfflineAvailable, isTravelAvailable, expertise, languages, profilePhotoUrl, linkedinUrl, servicesOffered, matchScore, industryExperience, academicExperience);
        }
    }
}
