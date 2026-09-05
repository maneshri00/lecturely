package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Booking;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    List<Booking> findByExpertIdOrderByCreatedAtDesc(Long expertId);
    List<Booking> findByExpertIdAndStatusOrderByCreatedAtDesc(Long expertId, String status);
    List<Booking> findByStudentIdAndStatusOrderByCreatedAtDesc(Long studentId, String status);
    Optional<Booking> findByPublicId(UUID publicId);
    long countByStatus(String status);
    long countByStatusAndCreatedAtAfter(String status, LocalDateTime after);
    long countByCreatedAtAfter(LocalDateTime after);
    @Query("SELECT COALESCE(SUM(b.platformFee), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
    BigDecimal sumPlatformFees();
    @Query("SELECT COALESCE(SUM(b.sessionFee), 0) FROM Booking b WHERE b.status = 'COMPLETED'")
    BigDecimal sumTotalRevenue();
    List<Booking> findByExpertIdAndStatus(Long expertId, String status);
    List<Booking> findByExpertIdAndStatusNotIn(Long expertId, Collection<String> statuses);
    List<Booking> findTop5ByOrderByCreatedAtDesc();
}
