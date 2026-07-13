package com.bmas.controller;

<<<<<<< HEAD
import com.bmas.dto.CreateProjectRequest;
import com.bmas.dto.ProjectResponse;
import com.bmas.dto.UpdateProjectRequest;
=======
import com.bmas.dto.AddMemberRequest;
import com.bmas.dto.ProjectMemberResponse;
import com.bmas.dto.ProjectRequest;
import com.bmas.dto.ProjectResponse;
import com.bmas.security.JwtUtil;
>>>>>>> v1_bharat
import com.bmas.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
<<<<<<< HEAD
=======
import java.util.Map;
>>>>>>> v1_bharat

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
<<<<<<< HEAD

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
=======
    private final JwtUtil jwtUtil;

    @Autowired
    public ProjectController(ProjectService projectService, JwtUtil jwtUtil) {
        this.projectService = projectService;
        this.jwtUtil = jwtUtil;
>>>>>>> v1_bharat
    }

    @PostMapping
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
<<<<<<< HEAD
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        ProjectResponse response = projectService.createProject(request, email);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id, @Valid @RequestBody UpdateProjectRequest request) {
        ProjectResponse response = projectService.updateProject(id, request);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/archive")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ProjectResponse> archiveProject(@PathVariable Long id) {
        ProjectResponse response = projectService.archiveProject(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProject(@PathVariable Long id) {
        ProjectResponse response = projectService.getProjectById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        List<ProjectResponse> response = projectService.getAllProjects();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/transparency")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ProjectResponse> toggleTransparency(@PathVariable Long id) {
        ProjectResponse response = projectService.toggleTransparency(id);
        return ResponseEntity.ok(response);
=======
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectRequest request) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            ProjectResponse response = projectService.createProject(request, email);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> listProjects(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            String token = authHeader.substring(7);
            String activeRole = jwtUtil.extractActiveRole(token);
            List<ProjectResponse> projects = projectService.listProjects(email, activeRole);
            return ResponseEntity.ok(projects);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProject(@PathVariable Long id) {
        try {
            ProjectResponse response = projectService.getProject(id);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/{id}/members")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<?> addMember(@PathVariable Long id, @Valid @RequestBody AddMemberRequest request) {
        try {
            projectService.addMember(id, request.getUserId());
            return new ResponseEntity<>(Map.of("message", "Member added successfully"), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            String msg = e.getMessage();
            if (msg != null && msg.contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", msg));
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", msg));
        }
    }

    @DeleteMapping("/{id}/members/{userId}")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<?> removeMember(@PathVariable Long id, @PathVariable Long userId) {
        try {
            projectService.removeMember(id, userId);
            return ResponseEntity.ok(Map.of("message", "Member removed successfully"));
        } catch (IllegalArgumentException e) {
            // Covers: project not found, user not found (404), and user not a member (409)
            String msg = e.getMessage();
            if (msg != null && msg.contains("not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", msg));
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", msg));
        }
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> listMembers(@PathVariable Long id) {
        try {
            List<ProjectMemberResponse> members = projectService.listMembers(id);
            return ResponseEntity.ok(members);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
>>>>>>> v1_bharat
    }
}
