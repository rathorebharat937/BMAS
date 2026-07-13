package com.bmas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
<<<<<<< HEAD
@Table(name = "project_members")
=======
@Table(name = "project_members", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"project_id", "user_id"})
})
>>>>>>> v1_bharat
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "role_in_project", nullable = false)
    private String roleInProject; // PROJECT_MANAGER, DEVELOPER, TESTER

    @Column(name = "joined_at", nullable = false)
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "joined_at", nullable = false, updatable = false)
>>>>>>> v1_bharat
    private LocalDateTime joinedAt;

    public ProjectMember() {
    }

<<<<<<< HEAD
    public ProjectMember(Long id, Project project, User user, String roleInProject, LocalDateTime joinedAt) {
        this.id = id;
        this.project = project;
        this.user = user;
        this.roleInProject = roleInProject;
=======
    public ProjectMember(Long id, Project project, User user, LocalDateTime joinedAt) {
        this.id = id;
        this.project = project;
        this.user = user;
>>>>>>> v1_bharat
        this.joinedAt = joinedAt;
    }

    @PrePersist
    protected void onCreate() {
<<<<<<< HEAD
        joinedAt = LocalDateTime.now();
=======
        this.joinedAt = LocalDateTime.now();
>>>>>>> v1_bharat
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

<<<<<<< HEAD
    public String getRoleInProject() {
        return roleInProject;
    }

    public void setRoleInProject(String roleInProject) {
        this.roleInProject = roleInProject;
    }

=======
>>>>>>> v1_bharat
    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }
<<<<<<< HEAD
=======

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
>>>>>>> v1_bharat
}
