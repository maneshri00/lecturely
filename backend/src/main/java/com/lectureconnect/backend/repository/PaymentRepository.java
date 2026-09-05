package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Payment;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import java.math.BigDecimal;
import java.util.*;
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBookingId(Long bookingId);
    List<Payment> findByStatusOrderByCreatedAtDesc(String status);
    List<Payment> findByVerificationStatusOrderByCreatedAtDesc(String verificationStatus);
    Page<Payment> findAllByOrderByCreatedAtDesc(Pageable pageable);
    @Query("SELECT COALESCE(SUM(p.platformFee), 0) FROM Payment p WHERE p.status = 'COMPLETED'")
    BigDecimal sumPlatformFees();
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = 'COMPLETED'")
    BigDecimal sumTotalRevenue();
}
