package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Requirement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
public interface RequirementRepository extends JpaRepository<Requirement, Long> {
    List<Requirement> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    Optional<Requirement> findByPublicId(UUID publicId);
    long countByStatus(String status);
}
