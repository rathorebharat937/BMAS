package com.bmas.controller;

import com.bmas.dto.AddMemberRequest;
import com.bmas.dto.ProjectMemberResponse;
import com.bmas.service.ProjectMemberService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects/{id}/members")
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    @Autowired
    public ProjectMemberController(ProjectMemberService projectMemberService) {
        this.projectMemberService = projectMemberService;
    }

    @PostMapping
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ProjectMemberResponse> addMember(
            @PathVariable Long id,
            @Valid @RequestBody AddMemberRequest request) {
        ProjectMemberResponse response = projectMemberService.addMember(id, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{memberId}")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<Map<String, String>> removeMember(
            @PathVariable Long id,
            @PathVariable Long memberId) {
        projectMemberService.removeMember(id, memberId);
        return ResponseEntity.ok(Map.of("message", "Member removed successfully"));
    }

    @GetMapping
    public ResponseEntity<List<ProjectMemberResponse>> getMembers(@PathVariable Long id) {
        List<ProjectMemberResponse> response = projectMemberService.getProjectMembers(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{memberId}/role")
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<ProjectMemberResponse> changeRole(
            @PathVariable Long id,
            @PathVariable Long memberId,
            @RequestBody Map<String, String> body) {
        String role = body.get("roleInProject");
        if (role == null) {
            role = body.get("role");
        }
        if (role == null || role.trim().isEmpty()) {
            throw new IllegalArgumentException("roleInProject is required");
        }
        ProjectMemberResponse response = projectMemberService.changeProjectRole(id, memberId, role.trim());
        return ResponseEntity.ok(response);
    }
}
