package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.ReviewRequest;
import com.lectureconnect.backend.dto.response.ReviewResponse;
import java.util.List;

public interface ReviewService {
    ReviewResponse createReview(ReviewRequest request, Long reviewerId);
    List<ReviewResponse> getReviewsByExpert(Long expertId);
    boolean hasReviewed(Long bookingId, Long reviewerId);
    ReviewResponse getReviewForBooking(Long bookingId, Long reviewerId);
}
