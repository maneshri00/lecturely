package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SubjectRepository extends JpaRepository<Subject, Long> {}
