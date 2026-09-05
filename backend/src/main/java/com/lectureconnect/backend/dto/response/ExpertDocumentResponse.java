package com.lectureconnect.backend.dto.response;

import java.time.LocalDateTime;

public class ExpertDocumentResponse {
    private Long id;
    private Long expertId;
    private String documentType;
    private String fileUrl;
    private String fileName;
    private String status;
    private String reviewNotes;
    private LocalDateTime createdAt;

    public ExpertDocumentResponse() {}

    public ExpertDocumentResponse(Long id, Long expertId, String documentType, String fileUrl, String fileName, String status, String reviewNotes, LocalDateTime createdAt) {
        this.id = id;
        this.expertId = expertId;
        this.documentType = documentType;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.status = status;
        this.reviewNotes = reviewNotes;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReviewNotes() { return reviewNotes; }
    public void setReviewNotes(String reviewNotes) { this.reviewNotes = reviewNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long expertId;
        private String documentType;
        private String fileUrl;
        private String fileName;
        private String status;
        private String reviewNotes;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder documentType(String documentType) { this.documentType = documentType; return this; }
        public Builder fileUrl(String fileUrl) { this.fileUrl = fileUrl; return this; }
        public Builder fileName(String fileName) { this.fileName = fileName; return this; }
        public Builder status(String status) { this.status = status; return this; }
        public Builder reviewNotes(String reviewNotes) { this.reviewNotes = reviewNotes; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ExpertDocumentResponse build() {
            return new ExpertDocumentResponse(id, expertId, documentType, fileUrl, fileName, status, reviewNotes, createdAt);
        }
    }
}
