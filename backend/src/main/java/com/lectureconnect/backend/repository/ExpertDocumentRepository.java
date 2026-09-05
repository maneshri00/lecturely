package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.ExpertDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ExpertDocumentRepository extends JpaRepository<ExpertDocument, Long> {
    List<ExpertDocument> findByExpertId(Long expertId);
    List<ExpertDocument> findByExpertIdAndStatus(Long expertId, String status);
}
