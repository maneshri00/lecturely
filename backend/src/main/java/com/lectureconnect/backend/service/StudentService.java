package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.StudentProfileRequest;
import com.lectureconnect.backend.dto.response.StudentProfileResponse;

public interface StudentService {
    StudentProfileResponse getStudentProfile(Long userId);
    StudentProfileResponse updateStudentProfile(Long userId, StudentProfileRequest request);
}
