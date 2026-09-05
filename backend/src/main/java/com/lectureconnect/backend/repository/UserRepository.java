package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    long countByRole(String role);
    long countByRoleAndCreatedAtAfter(String role, LocalDateTime after);
    long countByCreatedAtAfter(LocalDateTime after);
}
