package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import org.springframework.data.domain.*;
import java.math.BigDecimal;

public interface ExpertService {
    Page<ExpertSummaryResponse> searchExperts(String city, String mode, Double minRating, BigDecimal maxFee, String sortBy, Pageable pageable);
    ExpertDetailResponse getExpertByUserId(Long userId);
    ExpertDetailResponse updateProfile(Long userId, com.lectureconnect.backend.dto.request.UpdateExpertProfileRequest request);
    ExpertDetailResponse getExpertById(Long expertId);
    ExpertSummaryResponse toSummary(ExpertProfile profile);
    ExpertDetailResponse toDetail(ExpertProfile profile);
    int calculateMatchScore(ExpertProfile expert, Requirement requirement);
    void updateExpertRating(Long expertId);
    java.util.List<ExpertSummaryResponse> getAllVerifiedExperts();
}
