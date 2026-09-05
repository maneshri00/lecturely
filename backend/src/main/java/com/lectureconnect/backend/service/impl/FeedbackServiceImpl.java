package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.FeedbackRequest;
import com.lectureconnect.backend.dto.response.FeedbackResponse;
import com.lectureconnect.backend.entity.Feedback;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.FeedbackRepository;
import com.lectureconnect.backend.service.FeedbackService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public FeedbackResponse submitFeedback(FeedbackRequest req, Long userId) {
        Feedback feedback = Feedback.builder()
                .userId(userId)
                .name(req.getName())
                .email(req.getEmail())
                .category(req.getCategory())
                .message(req.getMessage())
                .platformRating(req.getPlatformRating())
                .status("NEW")
                .build();
        feedback = feedbackRepository.save(feedback);
        return toResponse(feedback);
    }

    @Override
    public Page<FeedbackResponse> getFeedback(String status, String category, Pageable pageable) {
        Page<Feedback> page;
        if (status != null && category != null) {
            page = feedbackRepository.findByStatusAndCategoryOrderByCreatedAtDesc(status, category, pageable);
        } else if (status != null) {
            page = feedbackRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else if (category != null) {
            page = feedbackRepository.findByCategoryOrderByCreatedAtDesc(category, pageable);
        } else {
            page = feedbackRepository.findAll(pageable);
        }
        return page.map(this::toResponse);
    }

    @Override
    public FeedbackResponse updateFeedbackStatus(Long feedbackId, String status) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found"));
        feedback.setStatus(status);
        return toResponse(feedbackRepository.save(feedback));
    }

    private FeedbackResponse toResponse(Feedback f) {
        return FeedbackResponse.builder()
                .id(f.getId()).name(f.getName()).email(f.getEmail())
                .category(f.getCategory()).message(f.getMessage())
                .platformRating(f.getPlatformRating()).status(f.getStatus())
                .createdAt(f.getCreatedAt()).build();
    }
}
