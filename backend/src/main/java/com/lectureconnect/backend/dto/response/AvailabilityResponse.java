package com.lectureconnect.backend.dto.response;

public class AvailabilityResponse {
    private Long id;
    private Long expertId;
    private Integer dayOfWeek;
    private String startTime;
    private String endTime;
    private Boolean isOnline;
    private Boolean isOffline;

    public AvailabilityResponse() {}

    public AvailabilityResponse(Long id, Long expertId, Integer dayOfWeek, String startTime, String endTime, Boolean isOnline, Boolean isOffline) {
        this.id = id;
        this.expertId = expertId;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isOnline = isOnline;
        this.isOffline = isOffline;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public Integer getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public Boolean getIsOnline() { return isOnline; }
    public void setIsOnline(Boolean isOnline) { this.isOnline = isOnline; }

    public Boolean getIsOffline() { return isOffline; }
    public void setIsOffline(Boolean isOffline) { this.isOffline = isOffline; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long expertId;
        private Integer dayOfWeek;
        private String startTime;
        private String endTime;
        private Boolean isOnline;
        private Boolean isOffline;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder dayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; return this; }
        public Builder startTime(String startTime) { this.startTime = startTime; return this; }
        public Builder endTime(String endTime) { this.endTime = endTime; return this; }
        public Builder isOnline(Boolean isOnline) { this.isOnline = isOnline; return this; }
        public Builder isOffline(Boolean isOffline) { this.isOffline = isOffline; return this; }

        public AvailabilityResponse build() {
            return new AvailabilityResponse(id, expertId, dayOfWeek, startTime, endTime, isOnline, isOffline);
        }
    }
}
