package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByExpertIdOrderByDayOfWeek(Long expertId);
    @Transactional
    void deleteByExpertId(Long expertId);
}
