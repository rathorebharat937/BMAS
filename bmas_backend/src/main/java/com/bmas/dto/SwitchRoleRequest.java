package com.bmas.dto;

import com.bmas.entity.Role;
import jakarta.validation.constraints.NotNull;

public class SwitchRoleRequest {

    @NotNull(message = "Role is required")
    private Role role;

    public SwitchRoleRequest() {
    }

    public SwitchRoleRequest(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
