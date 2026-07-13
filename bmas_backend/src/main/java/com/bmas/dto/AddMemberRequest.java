package com.bmas.dto;

<<<<<<< HEAD
import jakarta.validation.constraints.NotBlank;
=======
>>>>>>> v1_bharat
import jakarta.validation.constraints.NotNull;

public class AddMemberRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

<<<<<<< HEAD
    @NotBlank(message = "Role in project is required")
    private String roleInProject; // PROJECT_MANAGER, DEVELOPER, TESTER

    public AddMemberRequest() {
    }

    public AddMemberRequest(Long userId, String roleInProject) {
        this.userId = userId;
        this.roleInProject = roleInProject;
=======
    public AddMemberRequest() {
    }

    public AddMemberRequest(Long userId) {
        this.userId = userId;
>>>>>>> v1_bharat
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
<<<<<<< HEAD

    public String getRoleInProject() {
        return roleInProject;
    }

    public void setRoleInProject(String roleInProject) {
        this.roleInProject = roleInProject;
    }
=======
>>>>>>> v1_bharat
}
