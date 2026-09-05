package com.lectureconnect.backend.dto.response;

public class SubjectResponse {
    private Long id;
    private String name;
    private String category;

    public SubjectResponse() {}

    public SubjectResponse(Long id, String name, String category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public static SubjectResponseBuilder builder() { return new SubjectResponseBuilder(); }

    public static class SubjectResponseBuilder {
        private Long id;
        private String name;
        private String category;

        public SubjectResponseBuilder id(Long id) { this.id = id; return this; }
        public SubjectResponseBuilder name(String name) { this.name = name; return this; }
        public SubjectResponseBuilder category(String category) { this.category = category; return this; }

        public SubjectResponse build() {
            return new SubjectResponse(id, name, category);
        }
    }
}
