package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.ReviewRequest;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.repository.ExpertProfileRepository;
import com.lectureconnect.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final ExpertProfileRepository expertProfileRepository;

    public ReviewController(ReviewService reviewService, ExpertProfileRepository expertProfileRepository) {
        this.reviewService = reviewService;
        this.expertProfileRepository = expertProfileRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResponse>> create(
            @Valid @RequestBody ReviewRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Review submitted", reviewService.createReview(req, user.getId())));
    }

    @GetMapping("/expert/{expertId}")
    public ResponseEntity<ApiResponse<List<ReviewResponse>>> getByExpert(@PathVariable Long expertId) {
        var profile = expertProfileRepository.findByUserId(expertId)
                .orElseGet(() -> expertProfileRepository.findById(expertId).orElse(null));
        Long profileId = profile != null ? profile.getId() : expertId;
        return ResponseEntity.ok(ApiResponse.success("Reviews fetched", reviewService.getReviewsByExpert(profileId)));
    }

    @GetMapping("/has-reviewed/{bookingId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ReviewExistsResponse> hasReviewed(@PathVariable Long bookingId,
                                                             @AuthenticationPrincipal User principal) {
        boolean exists = reviewService.hasReviewed(bookingId, principal.getId());
        return ResponseEntity.ok(new ReviewExistsResponse(exists));
    }

    @GetMapping("/booking/{bookingId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ReviewResponse> getReviewForBooking(@PathVariable Long bookingId,
                                                              @AuthenticationPrincipal User principal) {
        ReviewResponse response = reviewService.getReviewForBooking(bookingId, principal.getId());
        if (response == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(response);
    }
}
