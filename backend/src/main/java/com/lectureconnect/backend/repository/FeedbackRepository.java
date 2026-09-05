package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Feedback;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Page<Feedback> findByStatusOrderByCreatedAtDesc(String status, Pageable pageable);
    Page<Feedback> findByCategoryOrderByCreatedAtDesc(String category, Pageable pageable);
    Page<Feedback> findByStatusAndCategoryOrderByCreatedAtDesc(String status, String category, Pageable pageable);
}
