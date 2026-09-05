package com.lectureconnect.backend.service;

public interface OtpService {
    String sendOtp(String email);
    String generateAndSendOtp(String email);
    boolean verifyOtp(String email, String enteredOtp);
    String resendOtp(String email);
}
