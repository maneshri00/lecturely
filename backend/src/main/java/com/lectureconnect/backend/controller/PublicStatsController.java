package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.ApiResponse;
import com.lectureconnect.backend.dto.response.PublicStatsResponse;
import com.lectureconnect.backend.repository.BookingRepository;
import com.lectureconnect.backend.repository.ExpertProfileRepository;
import com.lectureconnect.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class PublicStatsController {

    private final UserRepository userRepository;
    private final ExpertProfileRepository expertProfileRepository;
    private final BookingRepository bookingRepository;

    public PublicStatsController(UserRepository userRepository, ExpertProfileRepository expertProfileRepository, BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.expertProfileRepository = expertProfileRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<PublicStatsResponse>> getPublicStats() {
        long totalStudents = userRepository.countByRole("STUDENT");
        long totalVerifiedExperts = expertProfileRepository.count();
        
        Long institutionsSum = expertProfileRepository.getTotalInstitutionsSum();
        long totalInstitutions = (institutionsSum != null) ? institutionsSum : 0L;

        Double avgRatingRaw = expertProfileRepository.getAverageRating();
        double averageRating = (avgRatingRaw != null && avgRatingRaw > 0) ? Math.round(avgRatingRaw * 10.0) / 10.0 : 0.0;

        long totalSessionsCompleted = bookingRepository.countByStatus("COMPLETED");

        PublicStatsResponse response = PublicStatsResponse.builder()
                .totalStudents(totalStudents)
                .totalVerifiedExperts(totalVerifiedExperts)
                .totalInstitutions(totalInstitutions)
                .averageRating(averageRating)
                .totalSessionsCompleted(totalSessionsCompleted)
                .build();

        return ResponseEntity.ok(ApiResponse.success("Exact real-time platform stats fetched", response));
    }
}
