package com.lectureconnect.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subjects")
public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String category;
    
    @Column(name = "icon_url")
    private String iconUrl;
    
    @Column(name = "is_active")
    private Boolean isActive = true;

    public Subject() {}

    public Subject(Long id, String name, String category, String iconUrl, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.iconUrl = iconUrl;
        this.isActive = isActive != null ? isActive : true;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public static SubjectBuilder builder() { return new SubjectBuilder(); }

    public static class SubjectBuilder {
        private Long id;
        private String name;
        private String category;
        private String iconUrl;
        private Boolean isActive = true;

        public SubjectBuilder id(Long id) { this.id = id; return this; }
        public SubjectBuilder name(String name) { this.name = name; return this; }
        public SubjectBuilder category(String category) { this.category = category; return this; }
        public SubjectBuilder iconUrl(String iconUrl) { this.iconUrl = iconUrl; return this; }
        public SubjectBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }

        public Subject build() {
            return new Subject(id, name, category, iconUrl, isActive);
        }
    }
}
