package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.ExpertService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/saved-experts")
public class SavedExpertController {

    private final SavedExpertRepository savedExpertRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final ExpertService expertService;

    public SavedExpertController(SavedExpertRepository savedExpertRepository, ExpertProfileRepository expertProfileRepository, ExpertService expertService) {
        this.savedExpertRepository = savedExpertRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.expertService = expertService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ExpertSummaryResponse>>> getSavedExperts(@AuthenticationPrincipal User user) {
        List<ExpertSummaryResponse> experts = savedExpertRepository.findByIdStudentId(user.getId())
                .stream()
                .map(se -> expertProfileRepository.findById(se.getId().getExpertId()).map(expertService::toSummary))
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Saved experts fetched", experts));
    }
}
