package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse registerStudent(StudentRegistrationRequest request);
    AuthResponse registerExpert(ExpertRegistrationRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse loginWithGoogle(GoogleAuthRequest request);
    AuthResponse refreshToken(RefreshTokenRequest request);
}
