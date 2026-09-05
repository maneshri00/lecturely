package com.lectureconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;

    private String name;

    @Column(name = "is_active")
    private Boolean isActive = true;

    public Topic() {}

    public Topic(Long id, Subject subject, String name, Boolean isActive) {
        this.id = id;
        this.subject = subject;
        this.name = name;
        this.isActive = isActive != null ? isActive : true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public static TopicBuilder builder() { return new TopicBuilder(); }

    public static class TopicBuilder {
        private Long id;
        private Subject subject;
        private String name;
        private Boolean isActive = true;

        public TopicBuilder id(Long id) { this.id = id; return this; }
        public TopicBuilder subject(Subject subject) { this.subject = subject; return this; }
        public TopicBuilder name(String name) { this.name = name; return this; }
        public TopicBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }

        public Topic build() {
            return new Topic(id, subject, name, isActive);
        }
    }
}
