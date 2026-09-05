package com.lectureconnect.backend.dto.response;

public class RequirementMatchResponse {
    private ExpertSummaryResponse expert;
    private Integer matchScore;

    public RequirementMatchResponse() {}

    public RequirementMatchResponse(ExpertSummaryResponse expert, Integer matchScore) {
        this.expert = expert;
        this.matchScore = matchScore;
    }

    public ExpertSummaryResponse getExpert() { return expert; }
    public void setExpert(ExpertSummaryResponse expert) { this.expert = expert; }

    public Integer getMatchScore() { return matchScore; }
    public void setMatchScore(Integer matchScore) { this.matchScore = matchScore; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private ExpertSummaryResponse expert;
        private Integer matchScore;

        public Builder expert(ExpertSummaryResponse expert) { this.expert = expert; return this; }
        public Builder matchScore(Integer matchScore) { this.matchScore = matchScore; return this; }

        public RequirementMatchResponse build() {
            return new RequirementMatchResponse(expert, matchScore);
        }
    }
}
