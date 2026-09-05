package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.ExpertExpertise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
public interface ExpertExpertiseRepository extends JpaRepository<ExpertExpertise, Long> {
    List<ExpertExpertise> findByExpertId(Long expertId);
    @Transactional
    void deleteByExpertId(Long expertId);
}
