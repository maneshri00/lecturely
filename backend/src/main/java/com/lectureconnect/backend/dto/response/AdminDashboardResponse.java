package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;

public class AdminDashboardResponse {
    private Long totalStudents;
    private Long totalExperts;
    private Long verifiedExperts;
    private Long pendingVerification;
    private Long totalBookings;
    private Long completedSessions;
    private BigDecimal totalRevenue;
    private BigDecimal platformCommission;
    private Long activeRequirements;
    private Long newUsersToday;
    private Long bookingsToday;

    public AdminDashboardResponse() {}

    public AdminDashboardResponse(Long totalStudents, Long totalExperts, Long verifiedExperts, Long pendingVerification, Long totalBookings, Long completedSessions, BigDecimal totalRevenue, BigDecimal platformCommission, Long activeRequirements, Long newUsersToday, Long bookingsToday) {
        this.totalStudents = totalStudents;
        this.totalExperts = totalExperts;
        this.verifiedExperts = verifiedExperts;
        this.pendingVerification = pendingVerification;
        this.totalBookings = totalBookings;
        this.completedSessions = completedSessions;
        this.totalRevenue = totalRevenue;
        this.platformCommission = platformCommission;
        this.activeRequirements = activeRequirements;
        this.newUsersToday = newUsersToday;
        this.bookingsToday = bookingsToday;
    }

    public Long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(Long totalStudents) { this.totalStudents = totalStudents; }

    public Long getTotalExperts() { return totalExperts; }
    public void setTotalExperts(Long totalExperts) { this.totalExperts = totalExperts; }

    public Long getVerifiedExperts() { return verifiedExperts; }
    public void setVerifiedExperts(Long verifiedExperts) { this.verifiedExperts = verifiedExperts; }

    public Long getPendingVerification() { return pendingVerification; }
    public void setPendingVerification(Long pendingVerification) { this.pendingVerification = pendingVerification; }

    public Long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(Long totalBookings) { this.totalBookings = totalBookings; }

    public Long getCompletedSessions() { return completedSessions; }
    public void setCompletedSessions(Long completedSessions) { this.completedSessions = completedSessions; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public BigDecimal getPlatformCommission() { return platformCommission; }
    public void setPlatformCommission(BigDecimal platformCommission) { this.platformCommission = platformCommission; }

    public Long getActiveRequirements() { return activeRequirements; }
    public void setActiveRequirements(Long activeRequirements) { this.activeRequirements = activeRequirements; }

    public Long getNewUsersToday() { return newUsersToday; }
    public void setNewUsersToday(Long newUsersToday) { this.newUsersToday = newUsersToday; }

    public Long getBookingsToday() { return bookingsToday; }
    public void setBookingsToday(Long bookingsToday) { this.bookingsToday = bookingsToday; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long totalStudents;
        private Long totalExperts;
        private Long verifiedExperts;
        private Long pendingVerification;
        private Long totalBookings;
        private Long completedSessions;
        private BigDecimal totalRevenue;
        private BigDecimal platformCommission;
        private Long activeRequirements;
        private Long newUsersToday;
        private Long bookingsToday;

        public Builder totalStudents(Long totalStudents) { this.totalStudents = totalStudents; return this; }
        public Builder totalExperts(Long totalExperts) { this.totalExperts = totalExperts; return this; }
        public Builder verifiedExperts(Long verifiedExperts) { this.verifiedExperts = verifiedExperts; return this; }
        public Builder pendingVerification(Long pendingVerification) { this.pendingVerification = pendingVerification; return this; }
        public Builder totalBookings(Long totalBookings) { this.totalBookings = totalBookings; return this; }
        public Builder completedSessions(Long completedSessions) { this.completedSessions = completedSessions; return this; }
        public Builder totalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; return this; }
        public Builder platformCommission(BigDecimal platformCommission) { this.platformCommission = platformCommission; return this; }
        public Builder activeRequirements(Long activeRequirements) { this.activeRequirements = activeRequirements; return this; }
        public Builder newUsersToday(Long newUsersToday) { this.newUsersToday = newUsersToday; return this; }
        public Builder bookingsToday(Long bookingsToday) { this.bookingsToday = bookingsToday; return this; }

        public AdminDashboardResponse build() {
            return new AdminDashboardResponse(totalStudents, totalExperts, verifiedExperts, pendingVerification, totalBookings, completedSessions, totalRevenue, platformCommission, activeRequirements, newUsersToday, bookingsToday);
        }
    }
}
