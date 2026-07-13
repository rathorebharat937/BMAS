package com.bmas.dto;

public class ProjectDashboardResponse {
    private long totalProjects;
    private long activeProjects;
    private long completedProjects;
    private long totalMembers;
    private long openBugs;
    private long criticalBugs;
    private long escalatedBugs;

    public ProjectDashboardResponse() {
    }

    public ProjectDashboardResponse(long totalProjects, long activeProjects, long completedProjects, long totalMembers, long openBugs, long criticalBugs, long escalatedBugs) {
        this.totalProjects = totalProjects;
        this.activeProjects = activeProjects;
        this.completedProjects = completedProjects;
        this.totalMembers = totalMembers;
        this.openBugs = openBugs;
        this.criticalBugs = criticalBugs;
        this.escalatedBugs = escalatedBugs;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getActiveProjects() {
        return activeProjects;
    }

    public void setActiveProjects(long activeProjects) {
        this.activeProjects = activeProjects;
    }

    public long getCompletedProjects() {
        return completedProjects;
    }

    public void setCompletedProjects(long completedProjects) {
        this.completedProjects = completedProjects;
    }

    public long getTotalMembers() {
        return totalMembers;
    }

    public void setTotalMembers(long totalMembers) {
        this.totalMembers = totalMembers;
    }

    public long getOpenBugs() {
        return openBugs;
    }

    public void setOpenBugs(long openBugs) {
        this.openBugs = openBugs;
    }

    public long getCriticalBugs() {
        return criticalBugs;
    }

    public void setCriticalBugs(long criticalBugs) {
        this.criticalBugs = criticalBugs;
    }

    public long getEscalatedBugs() {
        return escalatedBugs;
    }

    public void setEscalatedBugs(long escalatedBugs) {
        this.escalatedBugs = escalatedBugs;
    }
}
