package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.ExpertProfile;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.*;

public interface ExpertProfileRepository extends JpaRepository<ExpertProfile, Long> {
    Optional<ExpertProfile> findByUserId(Long userId);
    List<ExpertProfile> findByVerificationStatus(String status);
    long countByVerificationStatus(String status);

    @Query("SELECT e FROM ExpertProfile e WHERE e.verificationStatus IN ('VERIFIED', 'PENDING') " +
           "AND (:#{#city == null || #city.isEmpty()} = true OR LOWER(e.city) LIKE LOWER(CONCAT('%', :city, '%'))) " +
           "AND (:#{#minRating == null} = true OR e.rating >= :minRating) " +
           "AND (:#{#maxFee == null} = true OR e.sessionFee <= :maxFee) " +
           "AND (:#{#mode == null || #mode.isEmpty()} = true OR " +
           "(:mode = 'ONLINE' AND e.isOnlineAvailable = true) OR " +
           "(:mode = 'OFFLINE' AND e.isOfflineAvailable = true))")
    Page<ExpertProfile> searchExperts(
            @Param("city") String city,
            @Param("minRating") Double minRating,
            @Param("maxFee") BigDecimal maxFee,
            @Param("mode") String mode,
            Pageable pageable);

    @Query("SELECT e FROM ExpertProfile e WHERE e.verificationStatus IN ('VERIFIED', 'PENDING')")
    Page<ExpertProfile> findAllVerified(Pageable pageable);

    @Query("SELECT COALESCE(AVG(e.rating), 0.0) FROM ExpertProfile e")
    Double getAverageRating();

    @Query("SELECT COALESCE(SUM(e.totalInstitutions), 0) FROM ExpertProfile e")
    Long getTotalInstitutionsSum();
}
