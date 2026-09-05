package com.lectureconnect.backend.dto.request;

import java.math.BigDecimal;

public class UpdateExpertProfileRequest {
    private String fullName;
    private String organization;
    private String designation;
    private String city;
    private String state;
    private String linkedinUrl;
    private String portfolioUrl;
    private String bio;
    private BigDecimal sessionFee;
    private Integer industryExperience;
    private Integer academicExperience;
    private String education;
    private String languages;
    private String servicesOffered;
    private String profilePhotoUrl;
    private java.util.List<com.lectureconnect.backend.dto.response.SkillRateDto> skillRates;
    private java.util.Map<String, BigDecimal> servicePricing;
    private String accountHolderName;
    private String bankName;
    private String bankAccountNumber;
    private String bankIfscCode;
    private String upiId;
    private String payoutQrUrl;

    public UpdateExpertProfileRequest() {}

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public BigDecimal getSessionFee() { return sessionFee; }
    public void setSessionFee(BigDecimal sessionFee) { this.sessionFee = sessionFee; }

    public Integer getIndustryExperience() { return industryExperience; }
    public void setIndustryExperience(Integer industryExperience) { this.industryExperience = industryExperience; }

    public Integer getAcademicExperience() { return academicExperience; }
    public void setAcademicExperience(Integer academicExperience) { this.academicExperience = academicExperience; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }

    public String getServicesOffered() { return servicesOffered; }
    public void setServicesOffered(String servicesOffered) { this.servicesOffered = servicesOffered; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public java.util.List<com.lectureconnect.backend.dto.response.SkillRateDto> getSkillRates() { return skillRates; }
    public void setSkillRates(java.util.List<com.lectureconnect.backend.dto.response.SkillRateDto> skillRates) { this.skillRates = skillRates; }

    public java.util.Map<String, BigDecimal> getServicePricing() { return servicePricing; }
    public void setServicePricing(java.util.Map<String, BigDecimal> servicePricing) { this.servicePricing = servicePricing; }

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
}
