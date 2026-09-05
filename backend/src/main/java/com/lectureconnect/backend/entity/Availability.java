package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "availability")
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expert_id", nullable = false)
    private Long expertId;

    @Column(name = "day_of_week")
    private Integer dayOfWeek;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "is_online")
    private Boolean isOnline = true;

    @Column(name = "is_offline")
    private Boolean isOffline = false;

    public Availability() {}

    public Availability(Long id, Long expertId, Integer dayOfWeek, LocalTime startTime, LocalTime endTime, Boolean isOnline, Boolean isOffline) {
        this.id = id;
        this.expertId = expertId;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isOnline = isOnline != null ? isOnline : true;
        this.isOffline = isOffline != null ? isOffline : false;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public Integer getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public Boolean getIsOnline() { return isOnline; }
    public void setIsOnline(Boolean isOnline) { this.isOnline = isOnline; }

    public Boolean getIsOffline() { return isOffline; }
    public void setIsOffline(Boolean isOffline) { this.isOffline = isOffline; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long expertId;
        private Integer dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;
        private Boolean isOnline = true;
        private Boolean isOffline = false;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder dayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; return this; }
        public Builder startTime(LocalTime startTime) { this.startTime = startTime; return this; }
        public Builder endTime(LocalTime endTime) { this.endTime = endTime; return this; }
        public Builder isOnline(Boolean isOnline) { this.isOnline = isOnline; return this; }
        public Builder isOffline(Boolean isOffline) { this.isOffline = isOffline; return this; }

        public Availability build() {
            return new Availability(id, expertId, dayOfWeek, startTime, endTime, isOnline, isOffline);
        }
    }
}
