package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_id", unique = true, nullable = false)
    private Long bookingId;

    @Column(name = "reviewer_id", nullable = false)
    private Long reviewerId;

    @Column(name = "expert_id", nullable = false)
    private Long expertId;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(name = "is_visible")
    private Boolean isVisible = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Review() {}

    public Review(Long id, Long bookingId, Long reviewerId, Long expertId, Integer rating, String comment, Boolean isVisible, LocalDateTime createdAt) {
        this.id = id;
        this.bookingId = bookingId;
        this.reviewerId = reviewerId;
        this.expertId = expertId;
        this.rating = rating;
        this.comment = comment;
        this.isVisible = isVisible != null ? isVisible : true;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public Long getReviewerId() { return reviewerId; }
    public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public Boolean getIsVisible() { return isVisible; }
    public void setIsVisible(Boolean isVisible) { this.isVisible = isVisible; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long bookingId;
        private Long reviewerId;
        private Long expertId;
        private Integer rating;
        private String comment;
        private Boolean isVisible = true;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder bookingId(Long bookingId) { this.bookingId = bookingId; return this; }
        public Builder reviewerId(Long reviewerId) { this.reviewerId = reviewerId; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder rating(Integer rating) { this.rating = rating; return this; }
        public Builder comment(String comment) { this.comment = comment; return this; }
        public Builder isVisible(Boolean isVisible) { this.isVisible = isVisible; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Review build() {
            return new Review(id, bookingId, reviewerId, expertId, rating, comment, isVisible, createdAt);
        }
    }
}
