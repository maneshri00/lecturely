package com.lectureconnect.backend.dto.request;

public class StudentProfileRequest {
    private String fullName;
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

    public StudentProfileRequest() {}

    public StudentProfileRequest(String fullName, String institution, String course, String branch, Integer yearOfStudy, Integer semester, String city, String state, String bookingRole, String profilePhotoUrl, String bio) {
        this.fullName = fullName;
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

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

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
}
