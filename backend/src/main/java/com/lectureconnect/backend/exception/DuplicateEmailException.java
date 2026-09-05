package com.lectureconnect.backend.exception;
import org.springframework.http.HttpStatus;
public class DuplicateEmailException extends ApiException {
    public DuplicateEmailException() {
        super("Email is already registered. Please use a different email or login.", HttpStatus.CONFLICT);
    }
}
