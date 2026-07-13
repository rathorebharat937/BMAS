package com.bmas.entity;

import jakarta.persistence.*;
<<<<<<< HEAD
=======
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
>>>>>>> v1_bharat
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_by", nullable = false)
    private Long createdBy;

    @Column(name = "transparency_enabled", nullable = false)
    private boolean transparencyEnabled = true;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, ARCHIVED, COMPLETED
=======
    @NotBlank(message = "Project name is required")
    @Size(max = 100, message = "Project name must not exceed 100 characters")
    @Column(nullable = false, unique = true)
    private String name;

    @Size(max = 500, message = "Description must not exceed 500 characters")
    @Column(length = 500)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
>>>>>>> v1_bharat

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

<<<<<<< HEAD
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Project() {
    }

    public Project(Long id, String name, String description, Long createdBy, boolean transparencyEnabled, String status) {
=======
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private boolean active = true;

    public Project() {
        this.active = true;
    }

    public Project(Long id, String name, String description, User createdBy,
                   LocalDateTime createdAt, LocalDateTime updatedAt, boolean active) {
>>>>>>> v1_bharat
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
<<<<<<< HEAD
        this.transparencyEnabled = transparencyEnabled;
        this.status = status;
=======
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.active = active;
>>>>>>> v1_bharat
    }

    @PrePersist
    protected void onCreate() {
<<<<<<< HEAD
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
=======
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
>>>>>>> v1_bharat
    }

    @PreUpdate
    protected void onUpdate() {
<<<<<<< HEAD
        updatedAt = LocalDateTime.now();
=======
        this.updatedAt = LocalDateTime.now();
>>>>>>> v1_bharat
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

<<<<<<< HEAD
    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public boolean isTransparencyEnabled() {
        return transparencyEnabled;
    }

    public void setTransparencyEnabled(boolean transparencyEnabled) {
        this.transparencyEnabled = transparencyEnabled;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

=======
    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

>>>>>>> v1_bharat
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
<<<<<<< HEAD
=======

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
        private Long id;
        private String name;
        private String description;
        private User createdBy;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private boolean active = true;

        ProjectBuilder() {}

        public ProjectBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProjectBuilder name(String name) {
            this.name = name;
            return this;
        }

        public ProjectBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ProjectBuilder createdBy(User createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public ProjectBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ProjectBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ProjectBuilder active(boolean active) {
            this.active = active;
            return this;
        }

        public Project build() {
            return new Project(id, name, description, createdBy, createdAt, updatedAt, active);
        }
    }
>>>>>>> v1_bharat
}
