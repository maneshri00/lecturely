package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.SendOtpRequest;
import com.lectureconnect.backend.dto.request.VerifyOtpRequest;
import com.lectureconnect.backend.dto.response.ApiResponse;
import com.lectureconnect.backend.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    private final OtpService otpService;

    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Map<String, String>>> sendOtp(@Valid @RequestBody SendOtpRequest request) {
        String otp = otpService.sendOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("OTP sent successfully to " + request.getEmail(), Map.of("email", request.getEmail(), "otp", otp)));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        boolean verified = otpService.verifyOtp(request.getEmail(), request.getOtp());
        return ResponseEntity.ok(ApiResponse.success("OTP verified successfully", Map.of("verified", verified)));
    }

    @PostMapping("/resend")
    public ResponseEntity<ApiResponse<Map<String, String>>> resendOtp(@Valid @RequestBody SendOtpRequest request) {
        String otp = otpService.resendOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("OTP resent successfully to " + request.getEmail(), Map.of("email", request.getEmail(), "otp", otp)));
    }
}
