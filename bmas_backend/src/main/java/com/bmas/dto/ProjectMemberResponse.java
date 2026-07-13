package com.bmas.dto;

import java.time.LocalDateTime;

public class ProjectMemberResponse {
<<<<<<< HEAD
    private Long id;
    private Long projectId;
    private String projectName;
    private Long userId;
    private String userName;
    private String userEmail;
    private String roleInProject;
=======

    private Long id;
    private Long userId;
    private String name;
    private String email;
>>>>>>> v1_bharat
    private LocalDateTime joinedAt;

    public ProjectMemberResponse() {
    }

<<<<<<< HEAD
    public ProjectMemberResponse(Long id, Long projectId, String projectName, Long userId, String userName, String userEmail, String roleInProject, LocalDateTime joinedAt) {
        this.id = id;
        this.projectId = projectId;
        this.projectName = projectName;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.roleInProject = roleInProject;
=======
    public ProjectMemberResponse(Long id, Long userId, String name, String email, LocalDateTime joinedAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.email = email;
>>>>>>> v1_bharat
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

<<<<<<< HEAD
    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

=======
>>>>>>> v1_bharat
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

<<<<<<< HEAD
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getRoleInProject() {
        return roleInProject;
    }

    public void setRoleInProject(String roleInProject) {
        this.roleInProject = roleInProject;
=======
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
>>>>>>> v1_bharat
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
<<<<<<< HEAD
=======

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
>>>>>>> v1_bharat
}
