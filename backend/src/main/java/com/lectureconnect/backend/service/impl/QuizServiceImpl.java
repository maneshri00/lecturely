package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.QuizQuestion;
import com.lectureconnect.backend.dto.request.QuizEvaluationRequest;
import com.lectureconnect.backend.dto.response.QuizDiagnosticResponse;
import com.lectureconnect.backend.entity.ExpertProfile;
import com.lectureconnect.backend.repository.ExpertProfileRepository;
import com.lectureconnect.backend.service.QuizService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    private final ExpertProfileRepository expertProfileRepository;
    private final Map<String, List<QuizQuestion>> questionBank = new HashMap<>();

    public QuizServiceImpl(ExpertProfileRepository expertProfileRepository) {
        this.expertProfileRepository = expertProfileRepository;
        initQuestionBank();
    }

    private void initQuestionBank() {
        // 1. Data Structures & Algorithms
        List<QuizQuestion> dsaQuestions = Arrays.asList(
            new QuizQuestion(1L, "Data Structures & Algorithms", "Dynamic Programming",
                "What is the main characteristic of a problem that can be solved using Dynamic Programming?",
                Arrays.asList("Greedy Choice Property", "Overlapping Subproblems & Optimal Substructure", "Divide and Conquer without memoization", "LIFO execution"),
                1, "Dynamic Programming relies on overlapping subproblems and optimal substructure.", "MEDIUM"),

            new QuizQuestion(2L, "Data Structures & Algorithms", "Graph Algorithms",
                "Which algorithm is best suited for finding the shortest path in a weighted graph with non-negative edge weights?",
                Arrays.asList("Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Depth-First Search (DFS)"),
                1, "Dijkstra's algorithm efficiently computes single-source shortest paths for non-negative weighted graphs.", "EASY"),

            new QuizQuestion(3L, "Data Structures & Algorithms", "Tree Traversal",
                "In a Binary Search Tree (BST), which traversal order yields elements in sorted ascending order?",
                Arrays.asList("Pre-order Traversal", "In-order Traversal", "Post-order Traversal", "Level-order Traversal"),
                1, "In-order traversal of a BST visits Left subtree -> Root -> Right subtree, producing sorted output.", "EASY"),

            new QuizQuestion(4L, "Data Structures & Algorithms", "Dynamic Programming",
                "What is the time complexity of the classic Knapsack 0/1 problem using dynamic programming with N items and capacity W?",
                Arrays.asList("O(N * W)", "O(2^N)", "O(N log N)", "O(W^2)"),
                0, "The 0/1 Knapsack DP solution requires O(N * W) pseudo-polynomial time.", "HARD")
        );
        questionBank.put("Data Structures & Algorithms", dsaQuestions);

        // 2. System Design & Distributed Systems
        List<QuizQuestion> systemDesignQuestions = Arrays.asList(
            new QuizQuestion(5L, "System Design & Distributed Systems", "Load Balancing & Caching",
                "Which caching eviction policy removes the item that has not been accessed for the longest time?",
                Arrays.asList("FIFO (First In First Out)", "LRU (Least Recently Used)", "LFU (Least Frequently Used)", "Random Eviction"),
                1, "LRU removes the least recently accessed item from cache memory.", "EASY"),

            new QuizQuestion(6L, "System Design & Distributed Systems", "Database Sharding",
                "In consistent hashing, what problem does adding virtual nodes primarily solve?",
                Arrays.asList("Increases encryption strength", "Prevents hot spots and ensures even load distribution", "Speeds up SQL joins", "Enforces ACID transactions"),
                1, "Virtual nodes prevent data skew and hotspots across physical cache/DB servers.", "HARD"),

            new QuizQuestion(7L, "System Design & Distributed Systems", "Message Queues",
                "Which message delivery guarantee ensures a message is processed at least once, but may result in duplicate processing?",
                Arrays.asList("At-Most-Once", "At-Least-Once", "Exactly-Once", "Zero-Message Loss"),
                1, "At-Least-Once guarantees message delivery but requires consumers to handle idempotency.", "MEDIUM")
        );
        questionBank.put("System Design & Distributed Systems", systemDesignQuestions);

        // 3. Machine Learning & Artificial Intelligence
        List<QuizQuestion> aiQuestions = Arrays.asList(
            new QuizQuestion(8L, "Machine Learning & AI", "Neural Networks",
                "Which activation function is most commonly used in hidden layers of Deep Neural Networks to mitigate vanishing gradients?",
                Arrays.asList("Sigmoid", "ReLU (Rectified Linear Unit)", "Tanh", "Softmax"),
                1, "ReLU avoids vanishing gradients for positive inputs and is computationally efficient.", "EASY"),

            new QuizQuestion(9L, "Machine Learning & AI", "Transformer Architecture",
                "What key mechanism allows Transformer models (like GPT and BERT) to process sequence tokens in parallel rather than sequentially?",
                Arrays.asList("Recurrent Backpropagation", "Self-Attention Mechanism", "Convolutional Stride", "Greedy Decoding"),
                1, "Self-attention evaluates contextual relationships between all tokens simultaneously.", "HARD"),

            new QuizQuestion(10L, "Machine Learning & AI", "Supervised Learning",
                "What technique is used to prevent overfitting by penalizing large model weight coefficients in L2 regularization?",
                Arrays.asList("Dropout", "Ridge Regularization", "Lasso Regularization", "Batch Normalization"),
                1, "L2 regularization (Ridge) adds squared magnitude of coefficients to penalty loss.", "MEDIUM")
        );
        questionBank.put("Machine Learning & AI", aiQuestions);

        // 4. Full-Stack Web Development
        List<QuizQuestion> webQuestions = Arrays.asList(
            new QuizQuestion(11L, "Full-Stack Web Development", "Database Indexing",
                "What data structure is most commonly used by relational databases (like PostgreSQL) for standard B-tree indexing?",
                Arrays.asList("Red-Black Tree", "B+ Tree", "Hash Map", "Linked List"),
                1, "B+ Trees store data at leaf nodes, optimizing range queries and disk block reads.", "MEDIUM"),

            new QuizQuestion(12L, "Full-Stack Web Development", "Web Security & OAuth",
                "Which token-based authentication mechanism allows statutory authorization without storing session state on the server?",
                Arrays.asList("Session Cookies", "JWT (JSON Web Token)", "HTTP Basic Auth", "TLS Certificate"),
                1, "JWT tokens are cryptographically signed and self-contained stateless tokens.", "EASY")
        );
        questionBank.put("Full-Stack Web Development", webQuestions);
    }

    @Override
    public List<String> getAvailableTopics() {
        return new ArrayList<>(questionBank.keySet());
    }

    @Override
    public List<QuizQuestion> getQuestionsForTopic(String topic) {
        return questionBank.getOrDefault(topic, new ArrayList<>());
    }

    @Override
    public QuizDiagnosticResponse evaluateQuiz(QuizEvaluationRequest request) {
        String topic = request.getTopic();
        List<QuizQuestion> questions = getQuestionsForTopic(topic);

        if (questions.isEmpty()) {
            throw new IllegalArgumentException("No quiz questions found for topic: " + topic);
        }

        Map<Long, Integer> answers = request.getAnswers() != null ? request.getAnswers() : new HashMap<>();
        int correctCount = 0;
        Map<String, Integer> subTopicTotal = new HashMap<>();
        Map<String, Integer> subTopicCorrect = new HashMap<>();

        for (QuizQuestion q : questions) {
            String sub = q.getSubTopic();
            subTopicTotal.put(sub, subTopicTotal.getOrDefault(sub, 0) + 1);

            Integer selected = answers.get(q.getId());
            if (selected != null && selected == q.getCorrectOptionIndex()) {
                correctCount++;
                subTopicCorrect.put(sub, subTopicCorrect.getOrDefault(sub, 0) + 1);
            }
        }

        double scorePercentage = Math.round(((double) correctCount / questions.size()) * 100.0 * 10.0) / 10.0;

        List<String> laggingSubTopics = new ArrayList<>();
        List<String> strongSubTopics = new ArrayList<>();
        Map<String, Double> subTopicScores = new HashMap<>();

        for (Map.Entry<String, Integer> entry : subTopicTotal.entrySet()) {
            String sub = entry.getKey();
            int total = entry.getValue();
            int correct = subTopicCorrect.getOrDefault(sub, 0);
            double pct = Math.round(((double) correct / total) * 100.0);
            subTopicScores.put(sub, pct);

            if (pct < 65.0) {
                laggingSubTopics.add(sub);
            } else {
                strongSubTopics.add(sub);
            }
        }

        String overallStatus = scorePercentage >= 80.0 ? "MASTERY" : scorePercentage >= 60.0 ? "PROFICIENT" : "NEEDS_IMPROVEMENT";

        StringBuilder advice = new StringBuilder();
        if (laggingSubTopics.isEmpty()) {
            advice.append("Outstanding performance! You have mastered ").append(topic).append(". We recommend advanced guest masterclasses to stay ahead.");
        } else {
            advice.append("Diagnostic complete! You are currently lagging in: ")
                  .append(String.join(", ", laggingSubTopics))
                  .append(". We recommend booking targeted guest lectures and 1-on-1 expert sessions below to reinforce these weak areas.");
        }

        // Fetch matching verified experts from database
        List<ExpertProfile> verifiedExperts = expertProfileRepository.findByVerificationStatus("VERIFIED");
        List<QuizDiagnosticResponse.RecommendedExpertDTO> recommendedDTOs = verifiedExperts.stream()
            .map(e -> new QuizDiagnosticResponse.RecommendedExpertDTO(
                e.getId(),
                e.getFullName() != null ? e.getFullName() : "Verified Expert",
                e.getDesignation(),
                e.getOrganization(),
                e.getRating(),
                e.getSessionFee(),
                Arrays.asList(e.getDesignation(), e.getCity() != null ? e.getCity() : "India")
            ))
            .limit(4)
            .collect(Collectors.toList());

        QuizDiagnosticResponse response = new QuizDiagnosticResponse();
        response.setTopic(topic);
        response.setTotalQuestions(questions.size());
        response.setCorrectAnswers(correctCount);
        response.setScorePercentage(scorePercentage);
        response.setOverallStatus(overallStatus);
        response.setLaggingSubTopics(laggingSubTopics);
        response.setStrongSubTopics(strongSubTopics);
        response.setSubTopicScores(subTopicScores);
        response.setAiRecommendationMessage(advice.toString());
        response.setRecommendedExperts(recommendedDTOs);

        return response;
    }
}
