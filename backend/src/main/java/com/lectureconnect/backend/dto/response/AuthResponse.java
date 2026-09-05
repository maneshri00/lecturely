package com.lectureconnect.backend.dto.response;

public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private UserSummaryResponse user;

    public AuthResponse() {}

    public AuthResponse(String accessToken, String refreshToken, String tokenType, UserSummaryResponse user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType != null ? tokenType : "Bearer";
        this.user = user;
    }

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }

    public String getRefreshToken() { return refreshToken; }
    public void setRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }

    public UserSummaryResponse getUser() { return user; }
    public void setUser(UserSummaryResponse user) { this.user = user; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String accessToken;
        private String refreshToken;
        private String tokenType = "Bearer";
        private UserSummaryResponse user;

        public Builder accessToken(String accessToken) { this.accessToken = accessToken; return this; }
        public Builder refreshToken(String refreshToken) { this.refreshToken = refreshToken; return this; }
        public Builder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public Builder user(UserSummaryResponse user) { this.user = user; return this; }

        public AuthResponse build() {
            return new AuthResponse(accessToken, refreshToken, tokenType, user);
        }
    }
}
