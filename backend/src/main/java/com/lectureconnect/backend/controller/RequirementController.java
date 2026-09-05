package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.RequirementRequest;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.service.RequirementService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requirements")
public class RequirementController {

    private final RequirementService requirementService;

    public RequirementController(RequirementService requirementService) {
        this.requirementService = requirementService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RequirementResponse>> create(
            @Valid @RequestBody RequirementRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Requirement created", requirementService.createRequirement(req, user.getId())));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<RequirementResponse>>> getMyRequirements(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Requirements fetched", requirementService.getMyRequirements(user.getId())));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RequirementResponse>> getById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Requirement found", requirementService.getRequirementById(id, user.getId())));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RequirementResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody RequirementRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Requirement updated", requirementService.updateRequirement(id, user.getId(), req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        requirementService.deleteRequirement(id, user.getId());
        return ResponseEntity.ok(ApiResponse.success("Requirement deleted"));
    }

    @GetMapping("/{id}/matches")
    public ResponseEntity<ApiResponse<List<RequirementMatchResponse>>> getMatches(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Matching experts fetched", requirementService.getMatchesForRequirement(id, user.getId())));
    }
}
