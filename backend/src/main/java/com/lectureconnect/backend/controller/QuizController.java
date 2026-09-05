package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.ApiResponse;
import com.lectureconnect.backend.dto.QuizQuestion;
import com.lectureconnect.backend.dto.request.QuizEvaluationRequest;
import com.lectureconnect.backend.dto.response.QuizDiagnosticResponse;
import com.lectureconnect.backend.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/topics")
    public ResponseEntity<ApiResponse<List<String>>> getTopics() {
        return ResponseEntity.ok(ApiResponse.success("Available quiz topics fetched successfully", quizService.getAvailableTopics()));
    }

    @GetMapping("/questions")
    public ResponseEntity<ApiResponse<List<QuizQuestion>>> getQuestions(@RequestParam String topic) {
        return ResponseEntity.ok(ApiResponse.success("Quiz questions fetched for topic: " + topic, quizService.getQuestionsForTopic(topic)));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<ApiResponse<QuizDiagnosticResponse>> evaluateQuiz(@RequestBody QuizEvaluationRequest request) {
        QuizDiagnosticResponse response = quizService.evaluateQuiz(request);
        return ResponseEntity.ok(ApiResponse.success("Quiz evaluated successfully", response));
    }
}
