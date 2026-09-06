package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.service.VideoConferenceService;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class MockVideoConferenceService implements VideoConferenceService {

    private static final String LETTERS = "abcdefghijklmnopqrstuvwxyz";
    private static final Random RANDOM = new Random();

    @Override
    public String generateMeetingLink(Long bookingId) {
        return "https://meet.jit.si/lecturely-guest-session-" + (bookingId != null ? bookingId : System.currentTimeMillis());
    }

    private String randomLetters(int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append(LETTERS.charAt(RANDOM.nextInt(LETTERS.length())));
        }
        return sb.toString();
    }
}
