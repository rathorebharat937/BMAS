package com.bmas.dto;

public class EscalatedBugResponse {
    private Long id;
    private String title;
    private String priority;
    private String status;
    private String assigneeName;

    public EscalatedBugResponse() {
    }

    public EscalatedBugResponse(Long id, String title, String priority, String status, String assigneeName) {
        this.id = id;
        this.title = title;
        this.priority = priority;
        this.status = status;
        this.assigneeName = assigneeName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssigneeName() {
        return assigneeName;
    }

    public void setAssigneeName(String assigneeName) {
        this.assigneeName = assigneeName;
    }
}
