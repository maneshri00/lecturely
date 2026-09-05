package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final BookingService bookingService;

    public PaymentController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> createOrder(
            @Valid @RequestBody PaymentCreateRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Payment order created",
                bookingService.createPaymentOrder(req.getBookingId(), req.getPaymentMethod(), user.getId())));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<BookingResponse>> verify(
            @Valid @RequestBody PaymentVerifyRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Payment verified! Booking confirmed!",
                bookingService.processPayment(req.getBookingId(), req, user.getId())));
    }

    @PostMapping("/submit-qr")
    public ResponseEntity<ApiResponse<BookingResponse>> submitQrPayment(
            @Valid @RequestBody QrPaymentSubmitRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Payment submitted for admin verification",
                bookingService.submitQrPayment(req, user.getId())));
    }
}
