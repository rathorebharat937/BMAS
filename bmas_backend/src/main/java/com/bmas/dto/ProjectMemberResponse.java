package com.bmas.dto;

import java.time.LocalDateTime;

public class ProjectMemberResponse {

    private Long id;
    private Long userId;
    private String name;
    private String email;
    private LocalDateTime joinedAt;

    public ProjectMemberResponse() {
    }

    public ProjectMemberResponse(Long id, Long userId, String name, String email, LocalDateTime joinedAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public static ProjectMemberResponseBuilder builder() {
        return new ProjectMemberResponseBuilder();
    }

    public static class ProjectMemberResponseBuilder {
        private Long id;
        private Long userId;
        private String name;
        private String email;
        private LocalDateTime joinedAt;

        ProjectMemberResponseBuilder() {}

        public ProjectMemberResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProjectMemberResponseBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public ProjectMemberResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectMemberResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public ProjectMemberResponseBuilder joinedAt(LocalDateTime joinedAt) {
            this.joinedAt = joinedAt;
            return this;
        }

        public ProjectMemberResponse build() {
            return new ProjectMemberResponse(id, userId, name, email, joinedAt);
        }
    }
}
