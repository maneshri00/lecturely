package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.exception.BadRequestException;
import com.lectureconnect.backend.exception.UnauthorizedException;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.AuthService;
import com.lectureconnect.backend.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final StudentProfileRepository studentProfileRepository;
    private final ExpertProfileRepository expertProfileRepository;

    public AuthController(AuthService authService, OtpService otpService, StudentProfileRepository studentProfileRepository, ExpertProfileRepository expertProfileRepository) {
        this.authService = authService;
        this.otpService = otpService;
        this.studentProfileRepository = studentProfileRepository;
        this.expertProfileRepository = expertProfileRepository;
    }

    @PostMapping("/register/student")
    public ResponseEntity<ApiResponse<AuthResponse>> registerStudent(@Valid @RequestBody StudentRegistrationRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Student registered successfully", authService.registerStudent(req)));
    }

    @PostMapping("/register/expert")
    public ResponseEntity<ApiResponse<AuthResponse>> registerExpert(@Valid @RequestBody ExpertRegistrationRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Expert registered. Verification pending.", authService.registerExpert(req)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Login successful", authService.login(req)));
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthResponse>> loginWithGoogle(@RequestBody GoogleAuthRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Google authentication successful", authService.loginWithGoogle(req)));
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<Map<String, String>>> sendOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        if (email == null || email.isBlank()) {
            throw new BadRequestException("Email is required");
        }
        String otp = otpService.generateAndSendOtp(email);
        return ResponseEntity.ok(ApiResponse.success("OTP sent to " + email, Map.of("email", email, "otp", otp)));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> verifyOtp(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String otp = payload.get("otp");
        if (email == null || otp == null) {
            throw new BadRequestException("Email and OTP code are required");
        }
        boolean isValid = otpService.verifyOtp(email, otp);
        if (!isValid) {
            throw new UnauthorizedException("Invalid or expired 6-digit OTP code");
        }
        return ResponseEntity.ok(ApiResponse.success("OTP verified successfully", Map.of("verified", true)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshTokenRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Token refreshed", authService.refreshToken(req)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> me(@AuthenticationPrincipal User user) {
        String fullName = "STUDENT".equals(user.getRole())
                ? studentProfileRepository.findByUserId(user.getId()).map(p -> p.getFullName()).orElse(user.getEmail())
                : expertProfileRepository.findByUserId(user.getId()).map(p -> p.getFullName()).orElse(user.getEmail());
        return ResponseEntity.ok(ApiResponse.success("Current user", UserSummaryResponse.builder()
                .id(user.getId()).publicId(user.getPublicId().toString())
                .email(user.getEmail()).role(user.getRole()).fullName(fullName).build()));
    }
}
