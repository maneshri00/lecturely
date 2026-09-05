package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.service.*;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    private final FeedbackService feedbackService;
    private final BookingService bookingService;

    public AdminController(AdminService adminService, FeedbackService feedbackService, BookingService bookingService) {
        this.adminService = adminService;
        this.feedbackService = feedbackService;
        this.bookingService = bookingService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardResponse>> dashboard() {
        return ResponseEntity.ok(ApiResponse.success("Dashboard stats", adminService.getDashboardStats()));
    }

    @GetMapping("/experts")
    public ResponseEntity<ApiResponse<PageResponse<ExpertSummaryResponse>>> getExperts(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success("Experts fetched",
                PageResponse.of(adminService.getAllExperts(status, PageRequest.of(page, size)))));
    }

    @GetMapping("/experts/{id}")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> getExpert(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Expert found", adminService.getExpertDetail(id)));
    }

    @GetMapping("/experts/{id}/documents")
    public ResponseEntity<ApiResponse<List<ExpertDocumentResponse>>> getDocs(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", adminService.getExpertDocuments(id)));
    }

    @PutMapping("/experts/{id}/verify")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> verify(
            @PathVariable Long id, @AuthenticationPrincipal User admin) {
        return ResponseEntity.ok(ApiResponse.success("Expert verified", adminService.verifyExpert(id, admin.getId())));
    }

    @PutMapping("/experts/{id}/reject")
    public ResponseEntity<ApiResponse<ExpertDetailResponse>> reject(
            @PathVariable Long id,
            @RequestParam(required = false) String reason,
            @AuthenticationPrincipal User admin) {
        return ResponseEntity.ok(ApiResponse.success("Expert rejected", adminService.rejectExpert(id, reason, admin.getId())));
    }

    @PutMapping("/documents/{id}/approve")
    public ResponseEntity<ApiResponse<ExpertDocumentResponse>> approveDoc(
            @PathVariable Long id, @AuthenticationPrincipal User admin) {
        return ResponseEntity.ok(ApiResponse.success("Document approved", adminService.approveDocument(id, admin.getId())));
    }

    @PutMapping("/documents/{id}/reject")
    public ResponseEntity<ApiResponse<ExpertDocumentResponse>> rejectDoc(
            @PathVariable Long id,
            @RequestParam(required = false) String notes,
            @AuthenticationPrincipal User admin) {
        return ResponseEntity.ok(ApiResponse.success("Document rejected", adminService.rejectDocument(id, notes, admin.getId())));
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<PageResponse<StudentSummaryResponse>>> getStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success("Students fetched",
                PageResponse.of(adminService.getAllStudents(PageRequest.of(page, size)))));
    }

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<PageResponse<BookingResponse>>> getBookings(
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched",
                PageResponse.of(adminService.getAllBookings(status, PageRequest.of(page, size)))));
    }

    @GetMapping("/payments")
    public ResponseEntity<ApiResponse<PageResponse<PaymentResponse>>> getPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success("Payments fetched",
                PageResponse.of(adminService.getAllPayments(PageRequest.of(page, size)))));
    }

    @GetMapping("/payments/pending-verifications")
    public ResponseEntity<ApiResponse<List<PendingPaymentVerificationResponse>>> getPendingPaymentVerifications() {
        return ResponseEntity.ok(ApiResponse.success("Pending manual payment verifications fetched",
                bookingService.getPendingPaymentVerifications()));
    }

    @PostMapping("/payments/{id}/verify")
    public ResponseEntity<ApiResponse<BookingResponse>> verifyPayment(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Payment verified and booking confirmed",
                bookingService.verifyQrPayment(id, true, null)));
    }

    @PostMapping("/payments/{id}/reject")
    public ResponseEntity<ApiResponse<BookingResponse>> rejectPayment(
            @PathVariable Long id, @RequestParam(required = false) String reason) {
        return ResponseEntity.ok(ApiResponse.success("Payment rejected",
                bookingService.verifyQrPayment(id, false, reason)));
    }

    @GetMapping("/feedback")
    public ResponseEntity<ApiResponse<PageResponse<FeedbackResponse>>> getFeedback(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(ApiResponse.success("Feedback fetched",
                PageResponse.of(feedbackService.getFeedback(status, category, PageRequest.of(page, size)))));
    }

    @PutMapping("/feedback/{id}/status")
    public ResponseEntity<ApiResponse<FeedbackResponse>> updateFeedbackStatus(
            @PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(ApiResponse.success("Status updated", feedbackService.updateFeedbackStatus(id, status)));
    }

    @PutMapping("/users/{id}/suspend")
    public ResponseEntity<ApiResponse<Void>> suspend(@PathVariable Long id) {
        adminService.suspendUser(id);
        return ResponseEntity.ok(ApiResponse.success("User suspended"));
    }

    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse<Void>> toggleUserStatus(@PathVariable Long id) {
        adminService.toggleUserStatus(id);
        return ResponseEntity.ok(ApiResponse.success("User account status updated"));
    }

    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<ApiResponse<String>> forceResetPassword(
            @PathVariable Long id, @RequestParam(required = false) String password) {
        String newPassword = adminService.forceResetPassword(id, password);
        return ResponseEntity.ok(ApiResponse.success("User password reset successfully", newPassword));
    }

    @PostMapping("/users/{id}/change-role")
    public ResponseEntity<ApiResponse<Void>> changeUserRole(
            @PathVariable Long id, @RequestParam String role) {
        adminService.changeUserRole(id, role);
        return ResponseEntity.ok(ApiResponse.success("User role updated to " + role.toUpperCase()));
    }

    @PostMapping("/users/{id}/revoke-sessions")
    public ResponseEntity<ApiResponse<Void>> revokeUserSessions(@PathVariable Long id) {
        adminService.revokeUserSessions(id);
        return ResponseEntity.ok(ApiResponse.success("User sessions revoked and invalidated"));
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<ApiResponse<Void>> overrideBookingStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.overrideBookingStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Booking status overridden to " + status));
    }

    @PutMapping("/payments/{id}/status")
    public ResponseEntity<ApiResponse<Void>> overridePaymentStatus(@PathVariable Long id, @RequestParam String status) {
        adminService.overridePaymentStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Payment status overridden to " + status));
    }
}
