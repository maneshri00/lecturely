package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.StudentProfileRequest;
import com.lectureconnect.backend.dto.response.ApiResponse;
import com.lectureconnect.backend.dto.response.StudentProfileResponse;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentProfileController {

    private final StudentService studentService;

    public StudentProfileController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> getProfile(@AuthenticationPrincipal User user) {
        StudentProfileResponse profile = studentService.getStudentProfile(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Student profile fetched successfully", profile));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<StudentProfileResponse>> updateProfile(
            @RequestBody StudentProfileRequest request,
            @AuthenticationPrincipal User user) {
        StudentProfileResponse profile = studentService.updateStudentProfile(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Student profile updated successfully", profile));
    }
}
