package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.request.RequirementRequest;
import com.lectureconnect.backend.dto.response.*;
import java.util.List;

public interface RequirementService {
    RequirementResponse createRequirement(RequirementRequest request, Long studentId);
    List<RequirementResponse> getMyRequirements(Long studentId);
    RequirementResponse getRequirementById(Long id, Long studentId);
    RequirementResponse updateRequirement(Long id, Long studentId, RequirementRequest request);
    void deleteRequirement(Long id, Long studentId);
    List<RequirementMatchResponse> getMatchesForRequirement(Long requirementId, Long studentId);
}
