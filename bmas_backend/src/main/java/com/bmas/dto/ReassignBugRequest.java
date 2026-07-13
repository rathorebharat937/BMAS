package com.bmas.dto;

import jakarta.validation.constraints.NotNull;

public class ReassignBugRequest {

    @NotNull(message = "User ID is required")
    private Long userId;

    public ReassignBugRequest() {
    }

    public ReassignBugRequest(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
