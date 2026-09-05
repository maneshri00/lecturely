package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Review;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.*;
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByExpertIdAndIsVisibleTrueOrderByCreatedAtDesc(Long expertId);
    boolean existsByBookingId(Long bookingId);
    boolean existsByBookingIdAndReviewerId(Long bookingId, Long reviewerId);
    java.util.Optional<Review> findByBookingIdAndReviewerId(Long bookingId, Long reviewerId);
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.expertId = :expertId AND r.isVisible = true")
    Double getAverageRatingByExpertId(@Param("expertId") Long expertId);
    long countByExpertId(Long expertId);
}
