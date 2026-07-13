package com.bmas.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.Set;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @NotEmpty(message = "At least one role is required")
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private Set<Role> roles = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_role")
    private Role preferredRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "active_role")
    private Role activeRole;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role_usage", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "role_name")
    @Column(name = "usage_count")
    private Map<String, Integer> roleUsageCount = new HashMap<>();

    @Column
    private String expertise;

    @Column(name = "current_workload")
    private Integer currentWorkload = 0;

    public User() {
        this.currentWorkload = 0;
    }

    public User(Long id, String name, String email, String password, Set<Role> roles, Role preferredRole, Role activeRole, Map<String, Integer> roleUsageCount, String expertise, Integer currentWorkload) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles != null ? roles : new HashSet<>();
        this.preferredRole = preferredRole;
        this.activeRole = activeRole;
        this.roleUsageCount = roleUsageCount != null ? roleUsageCount : new HashMap<>();
        this.expertise = expertise;
        this.currentWorkload = currentWorkload != null ? currentWorkload : 0;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Role getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(Role preferredRole) {
        this.preferredRole = preferredRole;
    }

    public Role getActiveRole() {
        return activeRole;
    }

    public void setActiveRole(Role activeRole) {
        this.activeRole = activeRole;
    }

    public Map<String, Integer> getRoleUsageCount() {
        return roleUsageCount;
    }

    public void setRoleUsageCount(Map<String, Integer> roleUsageCount) {
        this.roleUsageCount = roleUsageCount;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public Integer getCurrentWorkload() {
        return currentWorkload;
    }

    public void setCurrentWorkload(Integer currentWorkload) {
        this.currentWorkload = currentWorkload;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String name;
        private String email;
        private String password;
        private Set<Role> roles = new HashSet<>();
        private Role preferredRole;
        private Role activeRole;
        private Map<String, Integer> roleUsageCount = new HashMap<>();
        private String expertise;
        private Integer currentWorkload = 0;

        UserBuilder() {}

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder roles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public UserBuilder preferredRole(Role preferredRole) {
            this.preferredRole = preferredRole;
            return this;
        }

        public UserBuilder activeRole(Role activeRole) {
            this.activeRole = activeRole;
            return this;
        }

        public UserBuilder roleUsageCount(Map<String, Integer> roleUsageCount) {
            this.roleUsageCount = roleUsageCount;
            return this;
        }

        public UserBuilder expertise(String expertise) {
            this.expertise = expertise;
            return this;
        }

        public UserBuilder currentWorkload(Integer currentWorkload) {
            this.currentWorkload = currentWorkload;
            return this;
        }

        public User build() {
            return new User(id, name, email, password, roles, preferredRole, activeRole, roleUsageCount, expertise, currentWorkload);
        }
    }
}
