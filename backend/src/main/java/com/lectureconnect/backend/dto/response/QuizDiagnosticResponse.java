package com.lectureconnect.backend.dto.response;

import java.util.List;
import java.util.Map;

public class QuizDiagnosticResponse {
    private String topic;
    private int totalQuestions;
    private int correctAnswers;
    private double scorePercentage;
    private String overallStatus; // MASTERY, PROFICIENT, NEEDS_IMPROVEMENT
    private List<String> laggingSubTopics;
    private List<String> strongSubTopics;
    private Map<String, Double> subTopicScores;
    private String aiRecommendationMessage;
    private List<RecommendedExpertDTO> recommendedExperts;

    public QuizDiagnosticResponse() {}

    public static class RecommendedExpertDTO {
        private Long id;
        private String fullName;
        private String currentDesignation;
        private String organization;
        private Double rating;
        private Object sessionFee;
        private List<String> areas;

        public RecommendedExpertDTO() {}

        public RecommendedExpertDTO(Long id, String fullName, String currentDesignation, String organization, Double rating, Object sessionFee, List<String> areas) {
            this.id = id;
            this.fullName = fullName;
            this.currentDesignation = currentDesignation;
            this.organization = organization;
            this.rating = rating;
            this.sessionFee = sessionFee;
            this.areas = areas;
        }

        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getCurrentDesignation() { return currentDesignation; }
        public String getOrganization() { return organization; }
        public Double getRating() { return rating; }
        public Object getSessionFee() { return sessionFee; }
        public List<String> getAreas() { return areas; }
    }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(int correctAnswers) { this.correctAnswers = correctAnswers; }

    public double getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(double scorePercentage) { this.scorePercentage = scorePercentage; }

    public String getOverallStatus() { return overallStatus; }
    public void setOverallStatus(String overallStatus) { this.overallStatus = overallStatus; }

    public List<String> getLaggingSubTopics() { return laggingSubTopics; }
    public void setLaggingSubTopics(List<String> laggingSubTopics) { this.laggingSubTopics = laggingSubTopics; }

    public List<String> getStrongSubTopics() { return strongSubTopics; }
    public void setStrongSubTopics(List<String> strongSubTopics) { this.strongSubTopics = strongSubTopics; }

    public Map<String, Double> getSubTopicScores() { return subTopicScores; }
    public void setSubTopicScores(Map<String, Double> subTopicScores) { this.subTopicScores = subTopicScores; }

    public String getAiRecommendationMessage() { return aiRecommendationMessage; }
    public void setAiRecommendationMessage(String aiRecommendationMessage) { this.aiRecommendationMessage = aiRecommendationMessage; }

    public List<RecommendedExpertDTO> getRecommendedExperts() { return recommendedExperts; }
    public void setRecommendedExperts(List<RecommendedExpertDTO> recommendedExperts) { this.recommendedExperts = recommendedExperts; }
}
