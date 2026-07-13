package com.bmas.dto;

public class UpdateProjectRequest {
    private String name;
    private String description;
    private String status;
    private Boolean transparencyEnabled;

    public UpdateProjectRequest() {
    }

    public UpdateProjectRequest(String name, String description, String status, Boolean transparencyEnabled) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.transparencyEnabled = transparencyEnabled;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getTransparencyEnabled() {
        return transparencyEnabled;
    }

    public void setTransparencyEnabled(Boolean transparencyEnabled) {
        this.transparencyEnabled = transparencyEnabled;
    }
}
