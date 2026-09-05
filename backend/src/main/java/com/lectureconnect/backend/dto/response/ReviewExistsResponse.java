package com.lectureconnect.backend.dto.response;

public class ReviewExistsResponse {
    private boolean hasReviewed;

    public ReviewExistsResponse() {}

    public ReviewExistsResponse(boolean hasReviewed) {
        this.hasReviewed = hasReviewed;
    }

    public boolean isHasReviewed() {
        return hasReviewed;
    }

    public void setHasReviewed(boolean hasReviewed) {
        this.hasReviewed = hasReviewed;
    }
}
