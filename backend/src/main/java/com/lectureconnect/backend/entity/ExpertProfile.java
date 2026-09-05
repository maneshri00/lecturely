package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "expert_profiles")
public class ExpertProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String organization;

    @Column(nullable = false)
    private String designation;

    @Column(name = "industry_experience")
    private Integer industryExperience = 0;

    @Column(name = "academic_experience")
    private Integer academicExperience = 0;

    private String education;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "session_fee")
    private BigDecimal sessionFee;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "portfolio_url")
    private String portfolioUrl;

    @Column(name = "profile_photo_url", columnDefinition = "TEXT")
    private String profilePhotoUrl;

    @Column(name = "banner_photo_url", columnDefinition = "TEXT")
    private String bannerPhotoUrl;

    @Column(name = "verification_status")
    private String verificationStatus = "PENDING";

    @Column(name = "is_online_available")
    private Boolean isOnlineAvailable = true;

    @Column(name = "is_offline_available")
    private Boolean isOfflineAvailable = false;

    @Column(name = "is_travel_available")
    private Boolean isTravelAvailable = false;

    private Double rating = 0.0;

    @Column(name = "total_sessions")
    private Integer totalSessions = 0;

    @Column(name = "total_institutions")
    private Integer totalInstitutions = 0;

    private String languages;

    @Column(name = "services_offered")
    private String servicesOffered;

    @Column(name = "service_pricing_json", columnDefinition = "TEXT")
    private String servicePricingJson;

    @Column(name = "account_holder_name")
    private String accountHolderName;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account_number")
    private String bankAccountNumber;

    @Column(name = "bank_ifsc_code")
    private String bankIfscCode;

    @Column(name = "upi_id")
    private String upiId;

    @Column(name = "payout_qr_url", columnDefinition = "TEXT")
    private String payoutQrUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public ExpertProfile() {}

    public ExpertProfile(Long id, Long userId, String fullName, String organization, String designation, Integer industryExperience, Integer academicExperience, String education, String bio, BigDecimal sessionFee, String city, String state, String linkedinUrl, String portfolioUrl, String profilePhotoUrl, String verificationStatus, Boolean isOnlineAvailable, Boolean isOfflineAvailable, Boolean isTravelAvailable, Double rating, Integer totalSessions, Integer totalInstitutions, String languages, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.organization = organization;
        this.designation = designation;
        this.industryExperience = industryExperience != null ? industryExperience : 0;
        this.academicExperience = academicExperience != null ? academicExperience : 0;
        this.education = education;
        this.bio = bio;
        this.sessionFee = sessionFee;
        this.city = city;
        this.state = state;
        this.linkedinUrl = linkedinUrl;
        this.portfolioUrl = portfolioUrl;
        this.profilePhotoUrl = profilePhotoUrl;
        this.verificationStatus = verificationStatus != null ? verificationStatus : "PENDING";
        this.isOnlineAvailable = isOnlineAvailable != null ? isOnlineAvailable : true;
        this.isOfflineAvailable = isOfflineAvailable != null ? isOfflineAvailable : false;
        this.isTravelAvailable = isTravelAvailable != null ? isTravelAvailable : false;
        this.rating = rating != null ? rating : 0.0;
        this.totalSessions = totalSessions != null ? totalSessions : 0;
        this.totalInstitutions = totalInstitutions != null ? totalInstitutions : 0;
        this.languages = languages;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

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

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getBannerPhotoUrl() { return bannerPhotoUrl; }
    public void setBannerPhotoUrl(String bannerPhotoUrl) { this.bannerPhotoUrl = bannerPhotoUrl; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public Boolean getIsOnlineAvailable() { return isOnlineAvailable; }
    public void setIsOnlineAvailable(Boolean isOnlineAvailable) { this.isOnlineAvailable = isOnlineAvailable; }

    public Boolean getIsOfflineAvailable() { return isOfflineAvailable; }
    public void setIsOfflineAvailable(Boolean isOfflineAvailable) { this.isOfflineAvailable = isOfflineAvailable; }

    public Boolean getIsTravelAvailable() { return isTravelAvailable; }
    public void setIsTravelAvailable(Boolean isTravelAvailable) { this.isTravelAvailable = isTravelAvailable; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalSessions() { return totalSessions; }
    public void setTotalSessions(Integer totalSessions) { this.totalSessions = totalSessions; }

    public Integer getTotalInstitutions() { return totalInstitutions; }
    public void setTotalInstitutions(Integer totalInstitutions) { this.totalInstitutions = totalInstitutions; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }

    public String getServicesOffered() { return servicesOffered; }
    public void setServicesOffered(String servicesOffered) { this.servicesOffered = servicesOffered; }

    public String getServicePricingJson() { return servicePricingJson; }
    public void setServicePricingJson(String servicePricingJson) { this.servicePricingJson = servicePricingJson; }

    public String getAccountHolderName() { return accountHolderName; }
    public void setAccountHolderName(String accountHolderName) { this.accountHolderName = accountHolderName; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getBankAccountNumber() { return bankAccountNumber; }
    public void setBankAccountNumber(String bankAccountNumber) { this.bankAccountNumber = bankAccountNumber; }

    public String getBankIfscCode() { return bankIfscCode; }
    public void setBankIfscCode(String bankIfscCode) { this.bankIfscCode = bankIfscCode; }

    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }

    public String getPayoutQrUrl() { return payoutQrUrl; }
    public void setPayoutQrUrl(String payoutQrUrl) { this.payoutQrUrl = payoutQrUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long userId;
        private String fullName;
        private String organization;
        private String designation;
        private Integer industryExperience = 0;
        private Integer academicExperience = 0;
        private String education;
        private String bio;
        private BigDecimal sessionFee;
        private String city;
        private String state;
        private String linkedinUrl;
        private String portfolioUrl;
        private String profilePhotoUrl;
        private String verificationStatus = "PENDING";
        private Boolean isOnlineAvailable = true;
        private Boolean isOfflineAvailable = false;
        private Boolean isTravelAvailable = false;
        private Double rating = 0.0;
        private Integer totalSessions = 0;
        private Integer totalInstitutions = 0;
        private String languages;
        private String accountHolderName;
        private String bankName;
        private String bankAccountNumber;
        private String bankIfscCode;
        private String upiId;
        private String payoutQrUrl;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder organization(String organization) { this.organization = organization; return this; }
        public Builder designation(String designation) { this.designation = designation; return this; }
        public Builder industryExperience(Integer industryExperience) { this.industryExperience = industryExperience; return this; }
        public Builder academicExperience(Integer academicExperience) { this.academicExperience = academicExperience; return this; }
        public Builder education(String education) { this.education = education; return this; }
        public Builder bio(String bio) { this.bio = bio; return this; }
        public Builder sessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public Builder portfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; return this; }
        public Builder profilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; return this; }
        public Builder verificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; return this; }
        public Builder isOnlineAvailable(Boolean isOnlineAvailable) { this.isOnlineAvailable = isOnlineAvailable; return this; }
        public Builder isOfflineAvailable(Boolean isOfflineAvailable) { this.isOfflineAvailable = isOfflineAvailable; return this; }
        public Builder isTravelAvailable(Boolean isTravelAvailable) { this.isTravelAvailable = isTravelAvailable; return this; }
        public Builder rating(Double rating) { this.rating = rating; return this; }
        public Builder totalSessions(Integer totalSessions) { this.totalSessions = totalSessions; return this; }
        public Builder totalInstitutions(Integer totalInstitutions) { this.totalInstitutions = totalInstitutions; return this; }
        public Builder languages(String languages) { this.languages = languages; return this; }
        public Builder accountHolderName(String accountHolderName) { this.accountHolderName = accountHolderName; return this; }
        public Builder bankName(String bankName) { this.bankName = bankName; return this; }
        public Builder bankAccountNumber(String bankAccountNumber) { this.bankAccountNumber = bankAccountNumber; return this; }
        public Builder bankIfscCode(String bankIfscCode) { this.bankIfscCode = bankIfscCode; return this; }
        public Builder upiId(String upiId) { this.upiId = upiId; return this; }
        public Builder payoutQrUrl(String payoutQrUrl) { this.payoutQrUrl = payoutQrUrl; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ExpertProfile build() {
            ExpertProfile p = new ExpertProfile(id, userId, fullName, organization, designation, industryExperience, academicExperience, education, bio, sessionFee, city, state, linkedinUrl, portfolioUrl, profilePhotoUrl, verificationStatus, isOnlineAvailable, isOfflineAvailable, isTravelAvailable, rating, totalSessions, totalInstitutions, languages, createdAt, updatedAt);
            p.setAccountHolderName(accountHolderName);
            p.setBankName(bankName);
            p.setBankAccountNumber(bankAccountNumber);
            p.setBankIfscCode(bankIfscCode);
            p.setUpiId(upiId);
            p.setPayoutQrUrl(payoutQrUrl);
            return p;
        }
    }
}
