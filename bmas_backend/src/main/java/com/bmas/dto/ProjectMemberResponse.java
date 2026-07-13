package com.bmas.dto;

import java.time.LocalDateTime;

public class ProjectMemberResponse {
    private Long id;
    private Long projectId;
    private String projectName;
    private Long userId;
    private String userName;
    private String userEmail;
    private String roleInProject;
    private LocalDateTime joinedAt;

    public ProjectMemberResponse() {
    }

    public ProjectMemberResponse(Long id, Long projectId, String projectName, Long userId, String userName, String userEmail, String roleInProject, LocalDateTime joinedAt) {
        this.id = id;
        this.projectId = projectId;
        this.projectName = projectName;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.roleInProject = roleInProject;
        this.joinedAt = joinedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
}
