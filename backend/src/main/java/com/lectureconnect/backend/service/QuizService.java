package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.QuizQuestion;
import com.lectureconnect.backend.dto.request.QuizEvaluationRequest;
import com.lectureconnect.backend.dto.response.QuizDiagnosticResponse;

import java.util.List;

public interface QuizService {
    List<String> getAvailableTopics();
    List<QuizQuestion> getQuestionsForTopic(String topic);
    QuizDiagnosticResponse evaluateQuiz(QuizEvaluationRequest request);
}
