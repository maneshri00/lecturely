package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findBySubjectId(Long subjectId);
}
