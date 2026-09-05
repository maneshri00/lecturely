package com.lectureconnect.backend.service;

import com.lectureconnect.backend.dto.response.*;
import org.springframework.data.domain.*;
import java.util.List;

public interface AdminService {
    AdminDashboardResponse getDashboardStats();
    Page<ExpertSummaryResponse> getAllExperts(String status, Pageable pageable);
    ExpertDetailResponse getExpertDetail(Long expertId);
    ExpertDetailResponse verifyExpert(Long expertId, Long adminUserId);
    ExpertDetailResponse rejectExpert(Long expertId, String reason, Long adminUserId);
    void suspendUser(Long userId);
    List<ExpertDocumentResponse> getExpertDocuments(Long expertId);
    ExpertDocumentResponse approveDocument(Long documentId, Long adminUserId);
    ExpertDocumentResponse rejectDocument(Long documentId, String notes, Long adminUserId);
    Page<StudentSummaryResponse> getAllStudents(Pageable pageable);
    Page<BookingResponse> getAllBookings(String status, Pageable pageable);
    Page<PaymentResponse> getAllPayments(Pageable pageable);
    void toggleUserStatus(Long userId);
    void overrideBookingStatus(Long bookingId, String status);
    void overridePaymentStatus(Long paymentId, String status);
    String forceResetPassword(Long userId, String newPassword);
    void changeUserRole(Long userId, String newRole);
    void revokeUserSessions(Long userId);
}
