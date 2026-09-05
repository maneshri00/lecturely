package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.SavedExpert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
public interface SavedExpertRepository extends JpaRepository<SavedExpert, SavedExpert.SavedExpertId> {
    List<SavedExpert> findByIdStudentId(Long studentId);
    boolean existsByIdStudentIdAndIdExpertId(Long studentId, Long expertId);
    @Transactional
    void deleteByIdStudentIdAndIdExpertId(Long studentId, Long expertId);
}
