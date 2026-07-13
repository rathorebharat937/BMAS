package com.bmas.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
<<<<<<< HEAD
@RequestMapping("/api/dashboards")
public class DashboardController {

    @GetMapping("/tester")
=======
@RequestMapping("/api")
public class DashboardController {

    @GetMapping("/tester/dashboard")
>>>>>>> v1_bharat
    @PreAuthorize("hasRole('TESTER')")
    public ResponseEntity<?> getTesterDashboard() {
        return ResponseEntity.ok(Map.of(
                "role", "TESTER",
                "message", "Welcome to the Tester Dashboard. You have access to bug reports and tracking tools."
        ));
    }

<<<<<<< HEAD
    @GetMapping("/developer")
=======
    @GetMapping("/developer/dashboard")
>>>>>>> v1_bharat
    @PreAuthorize("hasRole('DEVELOPER')")
    public ResponseEntity<?> getDeveloperDashboard() {
        return ResponseEntity.ok(Map.of(
                "role", "DEVELOPER",
                "message", "Welcome to the Developer Dashboard. You can view assigned bugs and updates."
        ));
    }

<<<<<<< HEAD
    @GetMapping("/pm")
=======
    @GetMapping("/pm/dashboard")
>>>>>>> v1_bharat
    @PreAuthorize("hasRole('PROJECT_MANAGER')")
    public ResponseEntity<?> getPmDashboard() {
        return ResponseEntity.ok(Map.of(
                "role", "PROJECT_MANAGER",
                "message", "Welcome to the Project Manager Dashboard. Here is the overview of teams, bugs, and workloads."
        ));
    }
}
