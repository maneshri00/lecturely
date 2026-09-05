package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.request.RequirementRequest;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.*;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RequirementServiceImpl implements RequirementService {

    private final RequirementRepository requirementRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ExpertService expertService;
    private final NotificationService notificationService;
    private final ExpertProfileRepository expertProfileRepository;

    public RequirementServiceImpl(RequirementRepository requirementRepository, StudentProfileRepository studentProfileRepository, ExpertService expertService, NotificationService notificationService, ExpertProfileRepository expertProfileRepository) {
        this.requirementRepository = requirementRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.expertService = expertService;
        this.notificationService = notificationService;
        this.expertProfileRepository = expertProfileRepository;
    }

    @Override
    @Transactional
    public RequirementResponse createRequirement(RequirementRequest req, Long studentId) {
        Requirement req2 = Requirement.builder()
                .studentId(studentId)
                .title(req.getTitle())
                .subject(req.getSubject())
                .topic(req.getTopic())
                .description(req.getDescription())
                .targetAudience(req.getTargetAudience())
                .numAttendees(req.getNumAttendees())
                .preferredDate(req.getPreferredDate())
                .preferredTime(req.getPreferredTime())
                .durationMinutes(req.getDurationMinutes())
                .mode(req.getMode())
                .location(req.getLocation())
                .budgetMin(req.getBudgetMin())
                .budgetMax(req.getBudgetMax())
                .language(req.getLanguage())
                .expertCategory(req.getExpertCategory())
                .specialRequirements(req.getSpecialRequirements())
                .status("OPEN")
                .build();
        return toResponse(requirementRepository.save(req2));
    }

    @Override
    public List<RequirementResponse> getMyRequirements(Long studentId) {
        return requirementRepository.findByStudentIdOrderByCreatedAtDesc(studentId)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public RequirementResponse getRequirementById(Long id, Long studentId) {
        Requirement r = requirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found"));
        if (!r.getStudentId().equals(studentId)) {
            throw new UnauthorizedException("Not authorized");
        }
        return toResponse(r);
    }

    @Override
    @Transactional
    public RequirementResponse updateRequirement(Long id, Long studentId, RequirementRequest req) {
        Requirement r = requirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found"));
        if (!r.getStudentId().equals(studentId)) {
            throw new UnauthorizedException("Not authorized");
        }
        r.setTitle(req.getTitle());
        r.setSubject(req.getSubject());
        r.setTopic(req.getTopic());
        r.setDescription(req.getDescription());
        r.setTargetAudience(req.getTargetAudience());
        r.setNumAttendees(req.getNumAttendees());
        r.setPreferredDate(req.getPreferredDate());
        r.setPreferredTime(req.getPreferredTime());
        r.setDurationMinutes(req.getDurationMinutes());
        r.setMode(req.getMode());
        r.setLocation(req.getLocation());
        r.setBudgetMin(req.getBudgetMin());
        r.setBudgetMax(req.getBudgetMax());
        r.setLanguage(req.getLanguage());
        r.setExpertCategory(req.getExpertCategory());
        r.setSpecialRequirements(req.getSpecialRequirements());
        return toResponse(requirementRepository.save(r));
    }

    @Override
    @Transactional
    public void deleteRequirement(Long id, Long studentId) {
        Requirement r = requirementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found"));
        if (!r.getStudentId().equals(studentId)) {
            throw new UnauthorizedException("Not authorized");
        }
        requirementRepository.delete(r);
    }

    @Override
    public List<RequirementMatchResponse> getMatchesForRequirement(Long requirementId, Long studentId) {
        Requirement req = requirementRepository.findById(requirementId)
                .orElseThrow(() -> new ResourceNotFoundException("Requirement not found"));
        if (!req.getStudentId().equals(studentId)) {
            throw new UnauthorizedException("Not authorized");
        }

        List<ExpertProfile> experts = expertProfileRepository.findAllVerified(PageRequest.of(0, 200)).getContent();

        return experts.stream()
                .map(expert -> {
                    int score = expertService.calculateMatchScore(expert, req);
                    ExpertSummaryResponse summary = expertService.toSummary(expert);
                    summary.setMatchScore(score);
                    return RequirementMatchResponse.builder()
                            .expert(summary).matchScore(score).build();
                })
                .sorted(Comparator.comparingInt(RequirementMatchResponse::getMatchScore).reversed())
                .limit(20)
                .collect(Collectors.toList());
    }

    private RequirementResponse toResponse(Requirement r) {
        return RequirementResponse.builder()
                .id(r.getId())
                .publicId(r.getPublicId() != null ? r.getPublicId().toString() : null)
                .title(r.getTitle()).subject(r.getSubject()).topic(r.getTopic())
                .description(r.getDescription()).targetAudience(r.getTargetAudience())
                .mode(r.getMode()).location(r.getLocation()).language(r.getLanguage())
                .status(r.getStatus()).numAttendees(r.getNumAttendees())
                .durationMinutes(r.getDurationMinutes())
                .budgetMin(r.getBudgetMin()).budgetMax(r.getBudgetMax())
                .preferredDate(r.getPreferredDate() != null ? r.getPreferredDate().toString() : null)
                .preferredTime(r.getPreferredTime() != null ? r.getPreferredTime().toString() : null)
                .expertCategory(r.getExpertCategory())
                .specialRequirements(r.getSpecialRequirements())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
