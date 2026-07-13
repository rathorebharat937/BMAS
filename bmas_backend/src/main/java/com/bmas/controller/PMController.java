package com.bmas.controller;

import com.bmas.dto.EscalatedBugResponse;
import com.bmas.dto.ProjectDashboardResponse;
import com.bmas.dto.ReassignBugRequest;
import com.bmas.dto.WorkloadResponse;
import com.bmas.service.PMService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pm")
@PreAuthorize("hasRole('PROJECT_MANAGER')")
public class PMController {

    private final PMService pmService;

    @Autowired
    public PMController(PMService pmService) {
        this.pmService = pmService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ProjectDashboardResponse> getPMDashboard() {
        ProjectDashboardResponse response = pmService.getPMDashboard();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/escalated-bugs")
    public ResponseEntity<List<EscalatedBugResponse>> getEscalatedBugs() {
        List<EscalatedBugResponse> response = pmService.getEscalatedBugs();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/bugs/{bugId}/assign")
    public ResponseEntity<Map<String, String>> reassignBug(
            @PathVariable Long bugId,
            @Valid @RequestBody ReassignBugRequest request) {
        pmService.reassignBug(bugId, request.getUserId());
        return ResponseEntity.ok(Map.of("message", "Bug reassigned successfully"));
    }

    @GetMapping("/workload")
    public ResponseEntity<List<WorkloadResponse>> getWorkload() {
        List<WorkloadResponse> response = pmService.getWorkloads();
        return ResponseEntity.ok(response);
    }
}
