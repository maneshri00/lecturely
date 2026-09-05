package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.entity.Otp;
import com.lectureconnect.backend.exception.BadRequestException;
import com.lectureconnect.backend.repository.OtpRepository;
import com.lectureconnect.backend.service.EmailService;
import com.lectureconnect.backend.service.OtpService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpServiceImpl implements OtpService {

    private final EmailService emailService;
    private final OtpRepository otpRepository;
    private final SecureRandom random = new SecureRandom();

    public OtpServiceImpl(EmailService emailService, OtpRepository otpRepository) {
        this.emailService = emailService;
        this.otpRepository = otpRepository;
    }

    private String generateOtpCode() {
        int number = 100000 + random.nextInt(900000);
        return String.valueOf(number);
    }

    @Override
    @Transactional
    public String sendOtp(String email) {
        String cleanEmail = email.trim().toLowerCase();

        // Resend Cooldown check (60 seconds)
        Optional<Otp> latestOtp = otpRepository.findTopByEmailOrderByIdDesc(cleanEmail);
        if (latestOtp.isPresent()) {
            Otp existing = latestOtp.get();
            if (existing.getCreatedAt() != null && existing.getCreatedAt().isAfter(LocalDateTime.now().minusSeconds(60))) {
                throw new BadRequestException("Please wait 60 seconds before requesting a new OTP.");
            }
        }

        // Generate 6-digit OTP
        String otpCode = generateOtpCode();

        // Create database entity with 5-minute expiration time
        Otp otpEntity = new Otp(cleanEmail, otpCode, LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otpEntity);

        // Send email via JavaMailSender
        emailService.sendOtpEmail(cleanEmail, otpCode);

        return otpCode;
    }

    @Override
    public String generateAndSendOtp(String email) {
        return sendOtp(email);
    }

    @Override
    @Transactional
    public String resendOtp(String email) {
        return sendOtp(email);
    }

    @Override
    @Transactional
    public boolean verifyOtp(String email, String enteredOtp) {
        String cleanEmail = email.trim().toLowerCase();
        String cleanEnteredOtp = enteredOtp != null ? enteredOtp.trim() : "";

        // Master OTP bypass for instant testing & demo (123456)
        if ("123456".equals(cleanEnteredOtp)) {
            return true;
        }

        Optional<Otp> result = otpRepository.findTopByEmailOrderByIdDesc(cleanEmail);
        if (result.isEmpty()) {
            throw new BadRequestException("No OTP found for this email. Please request a new OTP.");
        }

        Otp savedOtp = result.get();

        // 1. Check attempt count (Max 5 failed attempts)
        if (savedOtp.getAttempts() >= 5) {
            throw new BadRequestException("Too many failed attempts. This OTP has been blocked. Please request a new OTP.");
        }

        // 2. Check expiration time (5 minutes)
        if (savedOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP code has expired. Please request a new OTP.");
        }

        // 3. Compare OTP code
        String cleanEnteredOtp = enteredOtp != null ? enteredOtp.trim() : "";
        if (!savedOtp.getOtp().equals(cleanEnteredOtp)) {
            savedOtp.setAttempts(savedOtp.getAttempts() + 1);
            otpRepository.save(savedOtp);
            int remaining = 5 - savedOtp.getAttempts();
            throw new BadRequestException(String.format("Invalid OTP code. %d attempt(s) remaining.", Math.max(0, remaining)));
        }

        // 4. Verification successful -> Delete OTP from database (One-time consumption)
        otpRepository.delete(savedOtp);

        return true;
    }
}
