package com.lectureconnect.backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private final Map<String, RequestBucket> ipRequestMap = new ConcurrentHashMap<>();

    private static class RequestBucket {
        long startTime;
        AtomicInteger count;

        RequestBucket(long startTime) {
            this.startTime = startTime;
            this.count = new AtomicInteger(1);
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Apply rate-limiting specifically to authentication endpoints and general API
        if (path.startsWith("/api/auth/") || path.startsWith("/api/")) {
            String clientIp = getClientIp(request);
            long currentTime = System.currentTimeMillis();

            RequestBucket bucket = ipRequestMap.compute(clientIp, (ip, b) -> {
                if (b == null || (currentTime - b.startTime) > 60000) {
                    return new RequestBucket(currentTime);
                } else {
                    b.count.incrementAndGet();
                    return b;
                }
            });

            if (bucket.count.get() > MAX_REQUESTS_PER_MINUTE) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write("{\"success\":false,\"message\":\"Too many requests. Please wait a minute before retrying.\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf == null || xf.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xf.split(",")[0].trim();
    }
}
