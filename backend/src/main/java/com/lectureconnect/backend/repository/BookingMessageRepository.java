package com.lectureconnect.backend.repository;
import com.lectureconnect.backend.entity.BookingMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface BookingMessageRepository extends JpaRepository<BookingMessage, Long> {
    List<BookingMessage> findByBookingIdOrderByCreatedAtAsc(Long bookingId);
}
