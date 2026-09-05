package com.lectureconnect.backend.service.impl;

import com.lectureconnect.backend.dto.response.NotificationResponse;
import com.lectureconnect.backend.entity.Notification;
import com.lectureconnect.backend.exception.ResourceNotFoundException;
import com.lectureconnect.backend.repository.NotificationRepository;
import com.lectureconnect.backend.service.NotificationService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void createNotification(Long userId, String type, String title, String message, String link) {
        Notification n = Notification.builder()
                .userId(userId)
                .type(type)
                .title(title)
                .message(message)
                .link(link)
                .isRead(false)
                .build();
        notificationRepository.save(n);
    }

    @Override
    public Page<NotificationResponse> getUserNotifications(Long userId, Pageable pageable) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::toResponse);
    }

    @Override
    public long getUnreadCount(Long userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    @Override
    public void markAsRead(Long notificationId, Long userId) {
        Notification n = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        if (n.getUserId().equals(userId)) {
            n.setIsRead(true);
            notificationRepository.save(n);
        }
    }

    @Override
    public void markAllAsRead(Long userId) {
        notificationRepository.findByUserIdAndIsReadFalse(userId)
                .forEach(n -> { n.setIsRead(true); notificationRepository.save(n); });
    }

    private NotificationResponse toResponse(Notification n) {
        return NotificationResponse.builder()
                .id(n.getId())
                .type(n.getType())
                .title(n.getTitle())
                .message(n.getMessage())
                .isRead(n.getIsRead())
                .link(n.getLink())
                .createdAt(n.getCreatedAt())
                .build();
    }
}
