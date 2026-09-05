package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.ReviewRequest;
import com.lectureconnect.backend.dto.response.ReviewResponse;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.*;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final ExpertService expertService;

    public ReviewServiceImpl(ReviewRepository reviewRepository, BookingRepository bookingRepository, ExpertProfileRepository expertProfileRepository, StudentProfileRepository studentProfileRepository, UserRepository userRepository, ExpertService expertService) {
        this.reviewRepository = reviewRepository;
        this.bookingRepository = bookingRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.expertService = expertService;
    }

    @Override
    @Transactional
    public ReviewResponse createReview(ReviewRequest req, Long reviewerId) {
        Booking booking = bookingRepository.findById(req.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!"COMPLETED".equals(booking.getStatus())) {
            throw new BookingStatusException("Can only review completed sessions");
        }
        if (!booking.getStudentId().equals(reviewerId)) {
            throw new UnauthorizedException("Only the student can leave a review");
        }
        if (reviewRepository.existsByBookingIdAndReviewerId(req.getBookingId(), reviewerId)) {
            throw new BookingStatusException("You have already reviewed this session");
        }

        ExpertProfile expert = expertProfileRepository.findById(booking.getExpertId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert not found"));

        Review review = Review.builder()
                .bookingId(req.getBookingId())
                .reviewerId(reviewerId)
                .expertId(expert.getId())
                .rating(req.getRating())
                .comment(req.getComment())
                .isVisible(true)
                .build();
        review = reviewRepository.save(review);

        expertService.updateExpertRating(expert.getId());

        return toResponse(review, reviewerId);
    }

    @Override
    public List<ReviewResponse> getReviewsByExpert(Long expertId) {
        return reviewRepository.findByExpertIdAndIsVisibleTrueOrderByCreatedAtDesc(expertId)
                .stream().map(r -> toResponse(r, r.getReviewerId())).collect(Collectors.toList());
    }

    @Override
    public boolean hasReviewed(Long bookingId, Long reviewerId) {
        return reviewRepository.existsByBookingIdAndReviewerId(bookingId, reviewerId);
    }

    @Override
    public ReviewResponse getReviewForBooking(Long bookingId, Long reviewerId) {
        return reviewRepository.findByBookingIdAndReviewerId(bookingId, reviewerId)
                .map(r -> toResponse(r, reviewerId))
                .orElse(null);
    }

    private ReviewResponse toResponse(Review r, Long reviewerId) {
        String reviewerName = studentProfileRepository.findByUserId(reviewerId)
                .map(StudentProfile::getFullName).orElse("Student");
        return ReviewResponse.builder()
                .id(r.getId())
                .rating(r.getRating())
                .comment(r.getComment())
                .reviewerName(reviewerName)
                .createdAt(r.getCreatedAt())
                .build();
    }
}
