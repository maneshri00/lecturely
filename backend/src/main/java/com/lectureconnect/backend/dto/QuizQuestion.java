package com.lectureconnect.backend.dto;

import java.util.List;

public class QuizQuestion {
    private Long id;
    private String topic;
    private String subTopic;
    private String questionText;
    private List<String> options;
    private int correctOptionIndex;
    private String explanation;
    private String difficulty; // EASY, MEDIUM, HARD

    public QuizQuestion() {}

    public QuizQuestion(Long id, String topic, String subTopic, String questionText, List<String> options, int correctOptionIndex, String explanation, String difficulty) {
        this.id = id;
        this.topic = topic;
        this.subTopic = subTopic;
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getSubTopic() { return subTopic; }
    public void setSubTopic(String subTopic) { this.subTopic = subTopic; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getCorrectOptionIndex() { return correctOptionIndex; }
    public void setCorrectOptionIndex(int correctOptionIndex) { this.correctOptionIndex = correctOptionIndex; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
