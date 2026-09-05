package com.lectureconnect.backend.dto.response;

public class PublicStatsResponse {
    private long totalStudents;
    private long totalVerifiedExperts;
    private long totalInstitutions;
    private double averageRating;
    private long totalSessionsCompleted;

    public PublicStatsResponse() {}

    public PublicStatsResponse(long totalStudents, long totalVerifiedExperts, long totalInstitutions, double averageRating, long totalSessionsCompleted) {
        this.totalStudents = totalStudents;
        this.totalVerifiedExperts = totalVerifiedExperts;
        this.totalInstitutions = totalInstitutions;
        this.averageRating = averageRating;
        this.totalSessionsCompleted = totalSessionsCompleted;
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalVerifiedExperts() { return totalVerifiedExperts; }
    public void setTotalVerifiedExperts(long totalVerifiedExperts) { this.totalVerifiedExperts = totalVerifiedExperts; }

    public long getTotalInstitutions() { return totalInstitutions; }
    public void setTotalInstitutions(long totalInstitutions) { this.totalInstitutions = totalInstitutions; }

    public double getAverageRating() { return averageRating; }
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }

    public long getTotalSessionsCompleted() { return totalSessionsCompleted; }
    public void setTotalSessionsCompleted(long totalSessionsCompleted) { this.totalSessionsCompleted = totalSessionsCompleted; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private long totalStudents;
        private long totalVerifiedExperts;
        private long totalInstitutions;
        private double averageRating;
        private long totalSessionsCompleted;

        public Builder totalStudents(long totalStudents) { this.totalStudents = totalStudents; return this; }
        public Builder totalVerifiedExperts(long totalVerifiedExperts) { this.totalVerifiedExperts = totalVerifiedExperts; return this; }
        public Builder totalInstitutions(long totalInstitutions) { this.totalInstitutions = totalInstitutions; return this; }
        public Builder averageRating(double averageRating) { this.averageRating = averageRating; return this; }
        public Builder totalSessionsCompleted(long totalSessionsCompleted) { this.totalSessionsCompleted = totalSessionsCompleted; return this; }

        public PublicStatsResponse build() {
            return new PublicStatsResponse(totalStudents, totalVerifiedExperts, totalInstitutions, averageRating, totalSessionsCompleted);
        }
    }
}
