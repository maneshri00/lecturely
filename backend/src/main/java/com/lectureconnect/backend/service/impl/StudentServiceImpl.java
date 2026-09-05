package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.StudentProfileRequest;
import com.lectureconnect.backend.dto.response.StudentProfileResponse;
import com.lectureconnect.backend.entity.StudentProfile;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.StudentProfileRepository;
import com.lectureconnect.backend.repository.UserRepository;
import com.lectureconnect.backend.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;

    public StudentServiceImpl(StudentProfileRepository studentProfileRepository, UserRepository userRepository) {
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public StudentProfileResponse getStudentProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    StudentProfile newProfile = StudentProfile.builder()
                            .userId(userId)
                            .fullName("Student User")
                            .institution("Not specified")
                            .build();
                    return studentProfileRepository.save(newProfile);
                });

        return mapToResponse(user, profile);
    }

    @Override
    @Transactional
    public StudentProfileResponse updateStudentProfile(Long userId, StudentProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        StudentProfile profile = studentProfileRepository.findByUserId(userId)
                .orElseGet(() -> StudentProfile.builder()
                        .userId(userId)
                        .fullName(request.getFullName() != null ? request.getFullName() : "Student User")
                        .institution("Not specified")
                        .build());

        if (request.getFullName() != null && !request.getFullName().trim().isEmpty()) {
            profile.setFullName(request.getFullName().trim());
        }
        if (request.getInstitution() != null) {
            profile.setInstitution(request.getInstitution());
        }
        if (request.getCourse() != null) {
            profile.setCourse(request.getCourse());
        }
        if (request.getBranch() != null) {
            profile.setBranch(request.getBranch());
        }
        if (request.getYearOfStudy() != null) {
            profile.setYearOfStudy(request.getYearOfStudy());
        }
        if (request.getSemester() != null) {
            profile.setSemester(request.getSemester());
        }
        if (request.getCity() != null) {
            profile.setCity(request.getCity());
        }
        if (request.getState() != null) {
            profile.setState(request.getState());
        }
        if (request.getBookingRole() != null) {
            profile.setBookingRole(request.getBookingRole());
        }
        if (request.getProfilePhotoUrl() != null) {
            profile.setProfilePhotoUrl(request.getProfilePhotoUrl());
        }
        if (request.getBio() != null) {
            profile.setBio(request.getBio());
        }

        profile = studentProfileRepository.save(profile);
        return mapToResponse(user, profile);
    }

    private StudentProfileResponse mapToResponse(User user, StudentProfile profile) {
        return StudentProfileResponse.builder()
                .id(profile.getId())
                .userId(user.getId())
                .fullName(profile.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .institution(profile.getInstitution())
                .course(profile.getCourse())
                .branch(profile.getBranch())
                .yearOfStudy(profile.getYearOfStudy())
                .semester(profile.getSemester())
                .city(profile.getCity())
                .state(profile.getState())
                .bookingRole(profile.getBookingRole())
                .profilePhotoUrl(profile.getProfilePhotoUrl())
                .bio(profile.getBio())
                .build();
    }
}
