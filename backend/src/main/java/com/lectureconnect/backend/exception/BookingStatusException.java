package com.lectureconnect.backend.exception;
import org.springframework.http.HttpStatus;
public class BookingStatusException extends ApiException {
    public BookingStatusException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
