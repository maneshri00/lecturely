package com.lectureconnect.backend;

import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class LectureConnectApplication {

    private static final Logger log = LoggerFactory.getLogger(LectureConnectApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(LectureConnectApplication.class, args);
    }

    @Bean
    public CommandLineRunner initAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String oldAdminEmail = "admin@lectureconnect.in";
            String newAdminEmail = "dragon@lectureconnect.edu";
            String rawPassword = "dragon@574";

            // If legacy admin user exists, migrate to new email securely
            userRepository.findByEmail(oldAdminEmail).ifPresent(oldAdmin -> {
                oldAdmin.setEmail(newAdminEmail);
                oldAdmin.setPasswordHash(passwordEncoder.encode(rawPassword));
                oldAdmin.setRole("ADMIN");
                oldAdmin.setStatus("ACTIVE");
                userRepository.save(oldAdmin);
            });

            // Ensure dragon@lectureconnect.edu is set up properly
            User admin = userRepository.findByEmail(newAdminEmail).orElseGet(() -> 
                User.builder()
                    .email(newAdminEmail)
                    .phone("9999999999")
                    .role("ADMIN")
                    .status("ACTIVE")
                    .build()
            );
            admin.setPasswordHash(passwordEncoder.encode(rawPassword));
            admin.setRole("ADMIN");
            admin.setStatus("ACTIVE");
            userRepository.save(admin);

            // Log secure non-sensitive confirmation (without revealing raw credentials in stdout/logs)
            log.info("✅ Administrator security credential update completed successfully.");
        };
    }
}
