package com.lectureconnect.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> root() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "message", "Lecturely Backend REST API is running successfully!",
            "version", "1.0.0",
            "frontendUrl", "https://lecturely.netlify.app",
            "docsUrl", "https://lecturely-obim.onrender.com/swagger-ui.html"
        ));
    }
}
