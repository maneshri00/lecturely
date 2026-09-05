package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.FeedbackRequest;
import com.lectureconnect.backend.dto.response.*;
import org.springframework.data.domain.*;

public interface FeedbackService {
    FeedbackResponse submitFeedback(FeedbackRequest request, Long userId);
    Page<FeedbackResponse> getFeedback(String status, String category, Pageable pageable);
    FeedbackResponse updateFeedbackStatus(Long feedbackId, String status);
}
