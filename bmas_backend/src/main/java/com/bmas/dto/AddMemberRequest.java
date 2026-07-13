package com.bmas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AddMemberRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotBlank(message = "Role in project is required")
    private String roleInProject; // PROJECT_MANAGER, DEVELOPER, TESTER

    public AddMemberRequest() {
    }

    public AddMemberRequest(Long userId, String roleInProject) {
        this.userId = userId;
        this.roleInProject = roleInProject;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRoleInProject() {
        return roleInProject;
    }

    public void setRoleInProject(String roleInProject) {
        this.roleInProject = roleInProject;
    }
}
