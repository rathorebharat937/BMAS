package com.bmas.dto;

public class WorkloadResponse {
    private Long userId;
    private String name;
    private long assignedBugs;
    private long activeBugs;
    private long resolvedBugs;

    public WorkloadResponse() {
    }

    public WorkloadResponse(Long userId, String name, long assignedBugs, long activeBugs, long resolvedBugs) {
        this.userId = userId;
        this.name = name;
        this.assignedBugs = assignedBugs;
        this.activeBugs = activeBugs;
        this.resolvedBugs = resolvedBugs;
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

    public long getAssignedBugs() {
        return assignedBugs;
    }

    public void setAssignedBugs(long assignedBugs) {
        this.assignedBugs = assignedBugs;
    }

    public long getActiveBugs() {
        return activeBugs;
    }

    public void setActiveBugs(long activeBugs) {
        this.activeBugs = activeBugs;
    }

    public long getResolvedBugs() {
        return resolvedBugs;
    }

    public void setResolvedBugs(long resolvedBugs) {
        this.resolvedBugs = resolvedBugs;
    }
}
