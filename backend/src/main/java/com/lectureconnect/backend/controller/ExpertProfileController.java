package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.*;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.*;
import com.lectureconnect.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expert")
public class ExpertProfileController {

    private final ExpertProfileRepository expertProfileRepository;
    private final AvailabilityRepository availabilityRepository;
    private final ExpertDocumentRepository expertDocumentRepository;
    private final ExpertService expertService;
    private final BookingService bookingService;

    public ExpertProfileController(ExpertProfileRepository expertProfileRepository, AvailabilityRepository availabilityRepository, ExpertDocumentRepository expertDocumentRepository, ExpertService expertService, BookingService bookingService) {
        this.expertProfileRepository = expertProfileRepository;
        this.availabilityRepository = availabilityRepository;
        this.expertDocumentRepository = expertDocumentRepository;
        this.expertService = expertService;
        this.bookingService = bookingService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> getProfile(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", expertService.getExpertByUserId(user.getId())));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> updateProfile(
            @RequestBody com.lectureconnect.backend.dto.request.UpdateExpertProfileRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", expertService.updateProfile(user.getId(), request)));
    }

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getPendingRequests(@AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        List<BookingResponse> requests = bookingService.getBookingsForExpert(profile.getId())
                .stream().filter(b -> "PENDING".equals(b.getStatus())).collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Pending requests", requests));
    }

    @GetMapping("/earnings")
    public ResponseEntity<ApiResponse<EarningsSummaryResponse>> getEarnings(@AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        List<BookingResponse> completed = bookingService.getBookingsForExpert(profile.getId())
                .stream().filter(b -> "COMPLETED".equals(b.getStatus())).collect(Collectors.toList());
        BigDecimal earned = completed.stream().map(BookingResponse::getExpertEarnings)
                .filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal fees = completed.stream().map(BookingResponse::getPlatformFee)
                .filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        return ResponseEntity.ok(ApiResponse.success("Earnings summary", EarningsSummaryResponse.builder()
                .totalEarned(earned.add(fees)).platformFeesDeducted(fees).netEarnings(earned)
                .monthlyBreakdown(List.of()).build()));
    }

    @GetMapping("/documents")
    public ResponseEntity<ApiResponse<List<ExpertDocumentResponse>>> getDocs(@AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        List<ExpertDocumentResponse> docs = expertDocumentRepository.findByExpertId(profile.getId())
                .stream().map(d -> ExpertDocumentResponse.builder()
                        .id(d.getId()).expertId(d.getExpertId()).documentType(d.getDocumentType())
                        .fileUrl(d.getFileUrl()).fileName(d.getFileName()).status(d.getStatus())
                        .reviewNotes(d.getReviewNotes()).createdAt(d.getCreatedAt()).build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", docs));
    }

    @PostMapping("/documents")
    public ResponseEntity<ApiResponse<ExpertDocumentResponse>> uploadDoc(
            @RequestBody Map<String, String> body, @AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        ExpertDocument doc = ExpertDocument.builder()
                .expertId(profile.getId())
                .documentType(body.get("documentType"))
                .fileUrl("https://storage.lectureconnect.in/mock/" + UUID.randomUUID() + "/" + body.getOrDefault("fileName", "document"))
                .fileName(body.getOrDefault("fileName", "document"))
                .status("PENDING").build();
        doc = expertDocumentRepository.save(doc);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded", ExpertDocumentResponse.builder()
                .id(doc.getId()).expertId(doc.getExpertId()).documentType(doc.getDocumentType())
                .fileUrl(doc.getFileUrl()).fileName(doc.getFileName()).status(doc.getStatus())
                .createdAt(doc.getCreatedAt()).build()));
    }

    @GetMapping("/availability")
    public ResponseEntity<ApiResponse<List<AvailabilityResponse>>> getMyAvailability(@AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        List<AvailabilityResponse> availability = availabilityRepository.findByExpertIdOrderByDayOfWeek(profile.getId())
                .stream().map(a -> AvailabilityResponse.builder()
                        .id(a.getId())
                        .expertId(a.getExpertId())
                        .dayOfWeek(a.getDayOfWeek())
                        .startTime(a.getStartTime() != null ? a.getStartTime().toString() : null)
                        .endTime(a.getEndTime() != null ? a.getEndTime().toString() : null)
                        .isOnline(a.getIsOnline())
                        .isOffline(a.getIsOffline())
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success("Availability fetched", availability));
    }

    @PutMapping("/availability")
    public ResponseEntity<ApiResponse<Void>> updateAvailability(
            @RequestBody List<Map<String, Object>> slots, @AuthenticationPrincipal User user) {
        var profile = expertProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Expert profile not found"));
        availabilityRepository.deleteByExpertId(profile.getId());
        slots.forEach(slot -> {
            Availability av = Availability.builder()
                    .expertId(profile.getId())
                    .dayOfWeek(Integer.parseInt(slot.getOrDefault("dayOfWeek", "0").toString()))
                    .isOnline(Boolean.parseBoolean(slot.getOrDefault("isOnline", "true").toString()))
                    .isOffline(Boolean.parseBoolean(slot.getOrDefault("isOffline", "false").toString())).build();
            if (slot.get("startTime") != null) av.setStartTime(java.time.LocalTime.parse(slot.get("startTime").toString()));
            if (slot.get("endTime") != null) av.setEndTime(java.time.LocalTime.parse(slot.get("endTime").toString()));
            availabilityRepository.save(av);
        });
        return ResponseEntity.ok(ApiResponse.success("Availability updated"));
    }
}
