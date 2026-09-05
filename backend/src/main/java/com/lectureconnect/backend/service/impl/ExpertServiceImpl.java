package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.ExpertService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpertServiceImpl implements ExpertService {

    private final ExpertProfileRepository expertProfileRepository;
    private final ExpertExpertiseRepository expertExpertiseRepository;
    private final AvailabilityRepository availabilityRepository;
    private final ReviewRepository reviewRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public ExpertServiceImpl(ExpertProfileRepository expertProfileRepository, ExpertExpertiseRepository expertExpertiseRepository, AvailabilityRepository availabilityRepository, ReviewRepository reviewRepository, SubjectRepository subjectRepository, UserRepository userRepository) {
        this.expertProfileRepository = expertProfileRepository;
        this.expertExpertiseRepository = expertExpertiseRepository;
        this.availabilityRepository = availabilityRepository;
        this.reviewRepository = reviewRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Page<ExpertSummaryResponse> searchExperts(String city, String mode, Double minRating, BigDecimal maxFee, String sortBy, Pageable pageable) {
        Page<ExpertProfile> page = expertProfileRepository.searchExperts(city, minRating, maxFee, mode, pageable);
        return page.map(this::toSummary);
    }

    @Override
    public ExpertDetailResponse getExpertByUserId(Long userId) {
        ExpertProfile profile = expertProfileRepository.findById(userId).orElse(null);
        if (profile == null) {
            profile = expertProfileRepository.findByUserId(userId).orElse(null);
        }
        if (profile == null) {
            throw new ResourceNotFoundException("Expert profile not found");
        }
        return toDetail(profile);
    }

    @Override
    public ExpertDetailResponse getExpertById(Long expertId) {
        ExpertProfile profile = expertProfileRepository.findById(expertId).orElse(null);
        if (profile == null) {
            profile = expertProfileRepository.findByUserId(expertId).orElse(null);
        }
        if (profile == null) {
            throw new ResourceNotFoundException("Expert not found");
        }
        return toDetail(profile);
    }

    @Override
    public List<ExpertSummaryResponse> getAllVerifiedExperts() {
        return expertProfileRepository.findAllVerified(PageRequest.of(0, 100))
                .stream().map(this::toSummary).collect(Collectors.toList());
    }

    @Override
    public ExpertSummaryResponse toSummary(ExpertProfile profile) {
        List<String> expertise = expertExpertiseRepository.findByExpertId(profile.getId())
                .stream().map(ExpertExpertise::getArea).collect(Collectors.toList());
        return ExpertSummaryResponse.builder()
                .id(profile.getId())
                .publicId(profile.getUserId().toString())
                .fullName(profile.getFullName())
                .organization(profile.getOrganization())
                .designation(profile.getDesignation())
                .rating(profile.getRating())
                .totalSessions(profile.getTotalSessions())
                .totalInstitutions(profile.getTotalInstitutions())
                .city(profile.getCity())
                .state(profile.getState())
                .sessionFee(profile.getSessionFee())
                .verificationStatus(profile.getVerificationStatus())
                .isOnlineAvailable(profile.getIsOnlineAvailable())
                .isOfflineAvailable(profile.getIsOfflineAvailable())
                .isTravelAvailable(profile.getIsTravelAvailable())
                .expertise(expertise)
                .languages(profile.getLanguages() != null ? Arrays.asList(profile.getLanguages().split(",")) : List.of())
                .profilePhotoUrl(profile.getProfilePhotoUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .servicesOffered(profile.getServicesOffered() != null ? Arrays.asList(profile.getServicesOffered().split(",")) : List.of("GUEST_LECTURE", "MENTORSHIP"))
                .industryExperience(profile.getIndustryExperience())
                .academicExperience(profile.getAcademicExperience())
                .build();
    }

    @Override
    public ExpertDetailResponse updateProfile(Long userId, com.lectureconnect.backend.dto.request.UpdateExpertProfileRequest request) {
        ExpertProfile profile = expertProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        if (request.getFullName() != null) profile.setFullName(request.getFullName());
        if (request.getOrganization() != null) profile.setOrganization(request.getOrganization());
        if (request.getDesignation() != null) profile.setDesignation(request.getDesignation());
        if (request.getCity() != null) profile.setCity(request.getCity());
        if (request.getState() != null) profile.setState(request.getState());
        if (request.getLinkedinUrl() != null) profile.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getPortfolioUrl() != null) profile.setPortfolioUrl(request.getPortfolioUrl());
        if (request.getBio() != null) profile.setBio(request.getBio());
        if (request.getSessionFee() != null) profile.setSessionFee(request.getSessionFee());
        if (request.getIndustryExperience() != null) profile.setIndustryExperience(request.getIndustryExperience());
        if (request.getAcademicExperience() != null) profile.setAcademicExperience(request.getAcademicExperience());
        if (request.getEducation() != null) profile.setEducation(request.getEducation());
        if (request.getLanguages() != null) profile.setLanguages(request.getLanguages());
        if (request.getServicesOffered() != null) profile.setServicesOffered(request.getServicesOffered());
        if (request.getProfilePhotoUrl() != null) profile.setProfilePhotoUrl(request.getProfilePhotoUrl());
        if (request.getAccountHolderName() != null) profile.setAccountHolderName(request.getAccountHolderName());
        if (request.getBankName() != null) profile.setBankName(request.getBankName());
        if (request.getBankAccountNumber() != null) profile.setBankAccountNumber(request.getBankAccountNumber());
        if (request.getBankIfscCode() != null) profile.setBankIfscCode(request.getBankIfscCode());
        if (request.getUpiId() != null) profile.setUpiId(request.getUpiId());
        if (request.getPayoutQrUrl() != null) profile.setPayoutQrUrl(request.getPayoutQrUrl());
        if (request.getServicePricing() != null) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                profile.setServicePricingJson(mapper.writeValueAsString(request.getServicePricing()));
            } catch (Exception ignored) {}
        }
        profile = expertProfileRepository.save(profile);
        return toDetail(profile);
    }

    @Override
    public ExpertDetailResponse toDetail(ExpertProfile profile) {
        ExpertSummaryResponse summary = toSummary(profile);
        List<AvailabilityResponse> availability = availabilityRepository.findByExpertIdOrderByDayOfWeek(profile.getId())
                .stream().map(a -> AvailabilityResponse.builder()
                        .id(a.getId()).expertId(a.getExpertId())
                        .dayOfWeek(a.getDayOfWeek())
                        .startTime(a.getStartTime() != null ? a.getStartTime().toString() : null)
                        .endTime(a.getEndTime() != null ? a.getEndTime().toString() : null)
                        .isOnline(a.getIsOnline()).isOffline(a.getIsOffline())
                        .build()).collect(Collectors.toList());

        java.util.Map<String, java.math.BigDecimal> servicePricingMap = null;
        if (profile.getServicePricingJson() != null && !profile.getServicePricingJson().isBlank()) {
            try {
                com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
                servicePricingMap = mapper.readValue(profile.getServicePricingJson(),
                        new com.fasterxml.jackson.core.type.TypeReference<java.util.Map<String, java.math.BigDecimal>>() {});
            } catch (Exception ignored) {}
        }

        List<String> servicesOfferedList = summary.getServicesOffered();
        if (servicesOfferedList == null || servicesOfferedList.isEmpty()) {
            if (profile.getServicesOffered() != null && !profile.getServicesOffered().isBlank()) {
                servicesOfferedList = Arrays.stream(profile.getServicesOffered().split(","))
                        .map(String::trim).filter(s -> !s.isEmpty()).collect(Collectors.toList());
            }
        }

        return ExpertDetailResponse.builder()
                .id(summary.getId()).publicId(summary.getPublicId())
                .fullName(summary.getFullName()).organization(summary.getOrganization())
                .designation(summary.getDesignation()).rating(summary.getRating())
                .totalSessions(summary.getTotalSessions()).totalInstitutions(summary.getTotalInstitutions())
                .city(summary.getCity()).state(summary.getState())
                .sessionFee(summary.getSessionFee()).verificationStatus(summary.getVerificationStatus())
                .isOnlineAvailable(summary.getIsOnlineAvailable())
                .isOfflineAvailable(summary.getIsOfflineAvailable())
                .isTravelAvailable(summary.getIsTravelAvailable())
                .expertise(summary.getExpertise()).languages(summary.getLanguages())
                .profilePhotoUrl(summary.getProfilePhotoUrl())
                .industryExperience(summary.getIndustryExperience())
                .academicExperience(summary.getAcademicExperience())
                .bio(profile.getBio()).linkedinUrl(profile.getLinkedinUrl())
                .portfolioUrl(profile.getPortfolioUrl()).education(profile.getEducation())
                .availability(availability)
                .subjects(List.of())
                .servicePricing(servicePricingMap)
                .servicesOffered(servicesOfferedList)
                .accountHolderName(profile.getAccountHolderName())
                .bankName(profile.getBankName())
                .bankAccountNumber(profile.getBankAccountNumber())
                .bankIfscCode(profile.getBankIfscCode())
                .upiId(profile.getUpiId())
                .payoutQrUrl(profile.getPayoutQrUrl())
                .build();
    }

    @Override
    public int calculateMatchScore(ExpertProfile expert, Requirement requirement) {
        int score = 0;
        List<String> expertAreas = expertExpertiseRepository.findByExpertId(expert.getId())
                .stream().map(e -> e.getArea().toLowerCase()).collect(Collectors.toList());

        if (requirement.getSubject() != null) {
            String subjectLower = requirement.getSubject().toLowerCase();
            if (expertAreas.stream().anyMatch(a -> a.contains(subjectLower) || subjectLower.contains(a))) {
                score += 30;
            }
        }

        String mode = requirement.getMode();
        if (mode == null) {
            score += 10;
        } else if ("ONLINE".equals(mode) && Boolean.TRUE.equals(expert.getIsOnlineAvailable())) {
            score += 15;
        } else if ("OFFLINE".equals(mode) && Boolean.TRUE.equals(expert.getIsOfflineAvailable())) {
            score += 15;
        } else if ("HYBRID".equals(mode) && (Boolean.TRUE.equals(expert.getIsOnlineAvailable()) || Boolean.TRUE.equals(expert.getIsOfflineAvailable()))) {
            score += 10;
        }

        if (requirement.getBudgetMax() != null && expert.getSessionFee() != null &&
                expert.getSessionFee().compareTo(requirement.getBudgetMax()) <= 0) {
            score += 15;
        }

        if (expert.getRating() != null && expert.getRating() > 0) {
            score += (int) (expert.getRating() / 5.0 * 10);
        }

        int exp = (expert.getIndustryExperience() != null ? expert.getIndustryExperience() : 0) +
                  (expert.getAcademicExperience() != null ? expert.getAcademicExperience() : 0);
        score += Math.min(exp, 10);

        return Math.min(score, 100);
    }

    @Override
    public void updateExpertRating(Long expertId) {
        Double avg = reviewRepository.getAverageRatingByExpertId(expertId);
        long count = reviewRepository.countByExpertId(expertId);
        expertProfileRepository.findById(expertId).ifPresent(profile -> {
            profile.setRating(avg != null ? avg : 0.0);
            profile.setTotalSessions((int) count);
            expertProfileRepository.save(profile);
        });
    }
}
