package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.*;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.security.JwtUtil;
import com.lectureconnect.backend.service.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class AuthServiceImpl implements AuthService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final ExpertExpertiseRepository expertExpertiseRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthServiceImpl(UserRepository userRepository, StudentProfileRepository studentProfileRepository, ExpertProfileRepository expertProfileRepository, ExpertExpertiseRepository expertExpertiseRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.expertExpertiseRepository = expertExpertiseRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public AuthResponse registerStudent(StudentRegistrationRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new DuplicateEmailException();
        }
        User user = User.builder()
                .email(req.getEmail())
                .phone(req.getPhone())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role("STUDENT")
                .status("ACTIVE")
                .build();
        user = userRepository.save(user);

        StudentProfile profile = StudentProfile.builder()
                .userId(user.getId())
                .fullName(req.getFullName())
                .institution(req.getInstitution())
                .course(req.getCourse())
                .branch(req.getBranch())
                .yearOfStudy(req.getYearOfStudy())
                .semester(req.getSemester())
                .city(req.getCity())
                .state(req.getState())
                .bookingRole(req.getBookingRole())
                .build();
        studentProfileRepository.save(profile);

        try { emailService.sendWelcomeEmail(user.getEmail(), req.getFullName(), "STUDENT"); } catch (Exception e) { log.warn("Email failed: {}", e.getMessage()); }

        return buildAuthResponse(user, req.getFullName());
    }

    @Override
    @Transactional
    public AuthResponse registerExpert(ExpertRegistrationRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new DuplicateEmailException();
        }
        User user = User.builder()
                .email(req.getEmail())
                .phone(req.getPhone())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .role("EXPERT")
                .status("ACTIVE")
                .build();
        user = userRepository.save(user);

        ExpertProfile profile = ExpertProfile.builder()
                .userId(user.getId())
                .fullName(req.getFullName())
                .organization(req.getOrganization())
                .designation(req.getDesignation())
                .industryExperience(req.getIndustryExperience() != null ? req.getIndustryExperience() : 0)
                .academicExperience(req.getAcademicExperience() != null ? req.getAcademicExperience() : 0)
                .education(req.getEducation())
                .bio(req.getBio())
                .sessionFee(req.getSessionFee())
                .city(req.getCity())
                .state(req.getState())
                .linkedinUrl(req.getLinkedinUrl())
                .portfolioUrl(req.getPortfolioUrl())
                .verificationStatus("VERIFIED")
                .isOnlineAvailable(true)
                .isOfflineAvailable(false)
                .isTravelAvailable(false)
                .rating(0.0)
                .totalSessions(0)
                .totalInstitutions(0)
                .build();
        profile = expertProfileRepository.save(profile);

        if (req.getAreas() != null) {
            final Long expertId = profile.getId();
            req.getAreas().forEach(area -> expertExpertiseRepository.save(
                    ExpertExpertise.builder().expertId(expertId).area(area).build()));
        }

        try { emailService.sendWelcomeEmail(user.getEmail(), req.getFullName(), "EXPERT"); } catch (Exception e) { log.warn("Email failed: {}", e.getMessage()); }

        return buildAuthResponse(user, req.getFullName());
    }

    @Override
    public AuthResponse login(LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String fullName = getFullName(user);
        return buildAuthResponse(user, fullName);
    }

    @Override
    @Transactional
    public AuthResponse loginWithGoogle(GoogleAuthRequest req) {
        String email = req.getEmail() != null ? req.getEmail() : "student." + UUID.randomUUID().toString().substring(0, 8) + "@gmail.com";
        String fullName = req.getFullName() != null ? req.getFullName() : "Google Student Learner";
        String targetRole = req.getRole() != null ? req.getRole() : "STUDENT";

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .phone("+91-0000000000")
                    .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(targetRole)
                    .status("ACTIVE")
                    .build();
            User saved = userRepository.save(newUser);

            if ("STUDENT".equals(targetRole)) {
                StudentProfile profile = StudentProfile.builder()
                        .userId(saved.getId())
                        .fullName(fullName)
                        .institution(req.getInstitution() != null ? req.getInstitution() : "Google SSO Institution")
                        .course("B.Tech / General Studies")
                        .yearOfStudy(1)
                        .city("Bengaluru")
                        .state("Karnataka")
                        .bookingRole("INDIVIDUAL")
                        .build();
                studentProfileRepository.save(profile);
            }
            return saved;
        });

        String resolvedName = getFullName(user);
        return buildAuthResponse(user, resolvedName);
    }

    @Override
    public AuthResponse refreshToken(RefreshTokenRequest req) {
        String email = jwtUtil.extractUsername(req.getRefreshToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!jwtUtil.isTokenValid(req.getRefreshToken(), user)) {
            throw new ApiException("Invalid or expired refresh token", org.springframework.http.HttpStatus.UNAUTHORIZED);
        }
        String newAccessToken = jwtUtil.generateAccessToken(user);
        String fullName = getFullName(user);
        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(req.getRefreshToken())
                .user(UserSummaryResponse.builder()
                        .id(user.getId())
                        .publicId(user.getPublicId().toString())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .fullName(fullName)
                        .build())
                .build();
    }

    private String getFullName(User user) {
        try {
            if ("STUDENT".equals(user.getRole())) {
                return studentProfileRepository.findByUserId(user.getId())
                        .map(StudentProfile::getFullName).orElse(user.getEmail());
            } else if ("EXPERT".equals(user.getRole())) {
                return expertProfileRepository.findByUserId(user.getId())
                        .map(ExpertProfile::getFullName).orElse(user.getEmail());
            }
        } catch (Exception e) { log.warn("Could not get full name: {}", e.getMessage()); }
        return user.getEmail();
    }

    private AuthResponse buildAuthResponse(User user, String fullName) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole());
        String accessToken = jwtUtil.generateAccessToken(user, claims);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(UserSummaryResponse.builder()
                        .id(user.getId())
                        .publicId(user.getPublicId().toString())
                        .email(user.getEmail())
                        .role(user.getRole())
                        .fullName(fullName)
                        .build())
                .build();
    }
}
