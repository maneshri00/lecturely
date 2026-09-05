package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/experts")
public class ExpertController {

    private final ExpertService expertService;
    private final ReviewService reviewService;
    private final SavedExpertRepository savedExpertRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final BookingService bookingService;

    public ExpertController(ExpertService expertService, ReviewService reviewService, SavedExpertRepository savedExpertRepository, ExpertProfileRepository expertProfileRepository, BookingService bookingService) {
        this.expertService = expertService;
        this.reviewService = reviewService;
        this.savedExpertRepository = savedExpertRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ExpertSummaryResponse>>> search(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String mode,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) BigDecimal maxFee,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ExpertSummaryResponse> result = expertService.searchExperts(city, mode, minRating, maxFee, sortBy, pageable);
        return ResponseEntity.ok(ApiResponse.success("Experts fetched", PageResponse.of(result)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> getById(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.success("Expert found", expertService.getExpertByUserId(userId)));
    }

    @GetMapping("/{userId}/reviews")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getReviews(@PathVariable Long userId) {
        var profile = expertProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Expert not found"));
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched", reviewService.getReviewsByExpert(profile.getId())));
    }

    @GetMapping("/{userId}/availability")
    public ResponseEntity<ApiResponse<List<AvailabilityResponse>>> getAvailability(@PathVariable Long userId) {
        var detail = expertService.getExpertByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("Availability fetched", detail.getAvailability()));
    }

    @GetMapping("/{expertId}/booked-slots")
    public ResponseEntity<ApiResponse<List<BookedSlotResponse>>> getBookedSlots(@PathVariable Long expertId) {
        return ResponseEntity.ok(ApiResponse.success("Booked slots fetched", bookingService.getBookedSlotsForExpert(expertId)));
    }

    @PostMapping("/{expertProfileId}/save")
    public ResponseEntity<ApiResponse<Void>> save(@PathVariable Long expertProfileId, @AuthenticationPrincipal User user) {
        var id = new SavedExpert.SavedExpertId(user.getId(), expertProfileId);
        if (!savedExpertRepository.existsByIdStudentIdAndIdExpertId(user.getId(), expertProfileId)) {
            savedExpertRepository.save(SavedExpert.builder().id(id).build());
        }
        return ResponseEntity.ok(ApiResponse.success("Expert saved"));
    }

    @DeleteMapping("/{expertProfileId}/save")
    public ResponseEntity<ApiResponse<Void>> unsave(@PathVariable Long expertProfileId, @AuthenticationPrincipal User user) {
        savedExpertRepository.deleteByIdStudentIdAndIdExpertId(user.getId(), expertProfileId);
        return ResponseEntity.ok(ApiResponse.success("Expert unsaved"));
    }
}
