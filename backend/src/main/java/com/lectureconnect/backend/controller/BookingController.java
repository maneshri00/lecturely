package com.lectureconnect.backend.controller;

import com.lectureconnect.backend.dto.request.*;
import com.lectureconnect.backend.dto.response.*;
import com.lectureconnect.backend.entity.User;
import com.lectureconnect.backend.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponse>> create(
            @Valid @RequestBody BookingRequest req, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Booking request created", bookingService.createBookingRequest(req, user.getId())));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getMyBookings(@AuthenticationPrincipal User user) {
        List<BookingResponse> bookings = "STUDENT".equals(user.getRole())
                ? bookingService.getBookingsForStudent(user.getId())
                : bookingService.getBookingsForExpert(user.getId());
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched", bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponse>> getById(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Booking found", bookingService.getBookingById(id, user.getId())));
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<BookingResponse>> accept(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Booking accepted", bookingService.acceptBooking(id, user.getId())));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<BookingResponse>> reject(
            @PathVariable Long id,
            @RequestBody(required = false) RejectBookingRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Booking rejected", bookingService.rejectBooking(id, user.getId(), req != null ? req.getReason() : null)));
    }

    @PutMapping("/{id}/counter-offer")
    public ResponseEntity<ApiResponse<BookingResponse>> counterOffer(
            @PathVariable Long id,
            @Valid @RequestBody CounterOfferRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Counter offer sent", bookingService.counterOffer(id, user.getId(), req)));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<ApiResponse<BookingResponse>> confirm(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Counter offer accepted", bookingService.confirmCounterOffer(id, user.getId())));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<ApiResponse<BookingResponse>> complete(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Session completed", bookingService.completeSession(id, user.getId())));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<BookingResponse>> cancel(
            @PathVariable Long id,
            @RequestBody(required = false) CancelBookingRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Booking cancelled", bookingService.cancelBooking(id, user.getId(), req != null ? req.getReason() : null)));
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<ApiResponse<List<BookingMessageResponse>>> getMessages(
            @PathVariable Long id, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Messages fetched", bookingService.getMessages(id, user.getId())));
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<ApiResponse<BookingMessageResponse>> sendMessage(
            @PathVariable Long id,
            @Valid @RequestBody MessageRequest req,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success("Message sent", bookingService.sendMessage(id, user.getId(), req.getMessage())));
    }
}
