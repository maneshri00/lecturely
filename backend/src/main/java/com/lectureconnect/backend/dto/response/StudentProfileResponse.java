package com.lectureconnect.backend.dto.response;

public class StudentProfileResponse {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String institution;
    private String course;
    private String branch;
    private Integer yearOfStudy;
    private Integer semester;
    private String city;
    private String state;
    private String bookingRole;
    private String profilePhotoUrl;
    private String bio;

    public StudentProfileResponse() {}

    public StudentProfileResponse(Long id, Long userId, String fullName, String email, String phone, String institution, String course, String branch, Integer yearOfStudy, Integer semester, String city, String state, String bookingRole, String profilePhotoUrl, String bio) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.institution = institution;
        this.course = course;
        this.branch = branch;
        this.yearOfStudy = yearOfStudy;
        this.semester = semester;
        this.city = city;
        this.state = state;
        this.bookingRole = bookingRole;
        this.profilePhotoUrl = profilePhotoUrl;
        this.bio = bio;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public Integer getYearOfStudy() { return yearOfStudy; }
    public void setYearOfStudy(Integer yearOfStudy) { this.yearOfStudy = yearOfStudy; }

    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getBookingRole() { return bookingRole; }
    public void setBookingRole(String bookingRole) { this.bookingRole = bookingRole; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long userId;
        private String fullName;
        private String email;
        private String phone;
        private String institution;
        private String course;
        private String branch;
        private Integer yearOfStudy;
        private Integer semester;
        private String city;
        private String state;
        private String bookingRole;
        private String profilePhotoUrl;
        private String bio;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder userId(Long userId) { this.userId = userId; return this; }
        public Builder fullName(String fullName) { this.fullName = fullName; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder institution(String institution) { this.institution = institution; return this; }
        public Builder course(String course) { this.course = course; return this; }
        public Builder branch(String branch) { this.branch = branch; return this; }
        public Builder yearOfStudy(Integer yearOfStudy) { this.yearOfStudy = yearOfStudy; return this; }
        public Builder semester(Integer semester) { this.semester = semester; return this; }
        public Builder city(String city) { this.city = city; return this; }
        public Builder state(String state) { this.state = state; return this; }
        public Builder bookingRole(String bookingRole) { this.bookingRole = bookingRole; return this; }
        public Builder profilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; return this; }
        public Builder bio(String bio) { this.bio = bio; return this; }

        public StudentProfileResponse build() {
            return new StudentProfileResponse(id, userId, fullName, email, phone, institution, course, branch, yearOfStudy, semester, city, state, bookingRole, profilePhotoUrl, bio);
        }
    }
}
