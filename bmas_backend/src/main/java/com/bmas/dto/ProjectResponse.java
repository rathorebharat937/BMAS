package com.bmas.dto;

import java.time.LocalDateTime;

public class ProjectResponse {
<<<<<<< HEAD
    private Long id;
    private String name;
    private String description;
    private Long createdBy;
    private boolean transparencyEnabled;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
=======

    private Long id;
    private String name;
    private String description;
    private String createdBy;
    private LocalDateTime createdAt;
    private int memberCount;
>>>>>>> v1_bharat

    public ProjectResponse() {
    }

<<<<<<< HEAD
    public ProjectResponse(Long id, String name, String description, Long createdBy, boolean transparencyEnabled, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
=======
    public ProjectResponse(Long id, String name, String description, String createdBy,
                           LocalDateTime createdAt, int memberCount) {
>>>>>>> v1_bharat
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
<<<<<<< HEAD
        this.transparencyEnabled = transparencyEnabled;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
=======
        this.createdAt = createdAt;
        this.memberCount = memberCount;
>>>>>>> v1_bharat
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

<<<<<<< HEAD
    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public boolean isTransparencyEnabled() {
        return transparencyEnabled;
    }

    public void setTransparencyEnabled(boolean transparencyEnabled) {
        this.transparencyEnabled = transparencyEnabled;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

=======
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

>>>>>>> v1_bharat
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

<<<<<<< HEAD
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
=======
    public int getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(int memberCount) {
        this.memberCount = memberCount;
    }

    public static ProjectResponseBuilder builder() {
        return new ProjectResponseBuilder();
    }

    public static class ProjectResponseBuilder {
        private Long id;
        private String name;
        private String description;
        private String createdBy;
        private LocalDateTime createdAt;
        private int memberCount;

        ProjectResponseBuilder() {}

        public ProjectResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProjectResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectResponseBuilder createdBy(String createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public ProjectResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ProjectResponseBuilder memberCount(int memberCount) {
            this.memberCount = memberCount;
            return this;
        }

        public ProjectResponse build() {
            return new ProjectResponse(id, name, description, createdBy, createdAt, memberCount);
        }
>>>>>>> v1_bharat
    }
}
