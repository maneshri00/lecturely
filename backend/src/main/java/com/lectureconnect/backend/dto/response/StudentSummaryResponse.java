package com.lectureconnect.backend.dto.response;

public class StudentSummaryResponse {
    private Long id;
    private String fullName;
    private String institution;
    private String city;
    private String email;
    private String course;
    private String branch;

    public StudentSummaryResponse() {}

    public StudentSummaryResponse(Long id, String fullName, String institution, String city, String email, String course, String branch) {
        this.id = id;
        this.fullName = fullName;
        this.institution = institution;
        this.city = city;
        this.email = email;
        this.course = course;
        this.branch = branch;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String fullName;
        private String institution;
        private String city;
        private String email;
        private String course;
        private String branch;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder institution(String institution) { this.institution = institution; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder course(String course) { this.course = course; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }

        public StudentSummaryResponse build() {
            return new StudentSummaryResponse(id, fullName, institution, city, email, course, branch);
        }
    }
}
