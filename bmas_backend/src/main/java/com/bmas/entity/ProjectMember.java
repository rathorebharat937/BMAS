package com.bmas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_members", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"project_id", "user_id"})
})
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "joined_at", nullable = false, updatable = false)
    private LocalDateTime joinedAt;

    public ProjectMember() {
    }

    public ProjectMember(Long id, Project project, User user, LocalDateTime joinedAt) {
        this.id = id;
        this.project = project;
        this.user = user;
        this.joinedAt = joinedAt;
    }

    @PrePersist
    protected void onCreate() {
        this.joinedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public static ProjectMemberBuilder builder() {
        return new ProjectMemberBuilder();
    }

    public static class ProjectMemberBuilder {
        private Long id;
        private Project project;
        private User user;
        private LocalDateTime joinedAt;

        ProjectMemberBuilder() {}

        public ProjectMemberBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProjectMemberBuilder project(Project project) {
            this.project = project;
            return this;
        }

        public ProjectMemberBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ProjectMemberBuilder joinedAt(LocalDateTime joinedAt) {
            this.joinedAt = joinedAt;
            return this;
        }

        public ProjectMember build() {
            return new ProjectMember(id, project, user, joinedAt);
        }
    }
}
