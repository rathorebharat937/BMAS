package com.bmas.dto;

import com.bmas.entity.Role;
import java.util.Set;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Set<Role> roles;
    private Role activeRole;
    private Role preferredRole;

    public UserResponse() {
    }

    public UserResponse(Long id, String name, String email, Set<Role> roles, Role activeRole, Role preferredRole) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
        this.activeRole = activeRole;
        this.preferredRole = preferredRole;
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Role getActiveRole() {
        return activeRole;
    }

    public void setActiveRole(Role activeRole) {
        this.activeRole = activeRole;
    }

    public Role getPreferredRole() {
        return preferredRole;
    }

    public void setPreferredRole(Role preferredRole) {
        this.preferredRole = preferredRole;
    }

    public static UserResponseBuilder builder() {
        return new UserResponseBuilder();
    }

    public static class UserResponseBuilder {
        private Long id;
        private String name;
        private String email;
        private Set<Role> roles;
        private Role activeRole;
        private Role preferredRole;

        UserResponseBuilder() {}

        public UserResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserResponseBuilder name(String name) {
            this.name = name;
            return this;
        }

        public UserResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserResponseBuilder roles(Set<Role> roles) {
            this.roles = roles;
            return this;
        }

        public UserResponseBuilder activeRole(Role activeRole) {
            this.activeRole = activeRole;
            return this;
        }

        public UserResponseBuilder preferredRole(Role preferredRole) {
            this.preferredRole = preferredRole;
            return this;
        }

        public UserResponse build() {
            return new UserResponse(id, name, email, roles, activeRole, preferredRole);
        }
    }
}
