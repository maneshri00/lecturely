package com.lectureconnect.backend.dto.request;

import java.util.Map;

public class QuizEvaluationRequest {
    private String topic;
    private Map<Long, Integer> answers; // QuestionId -> SelectedOptionIndex

    public QuizEvaluationRequest() {}

    public QuizEvaluationRequest(String topic, Map<Long, Integer> answers) {
        this.topic = topic;
        this.answers = answers;
    }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public Map<Long, Integer> getAnswers() { return answers; }
    public void setAnswers(Map<Long, Integer> answers) { this.answers = answers; }
}
