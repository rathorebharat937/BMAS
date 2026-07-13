package com.bmas.controller;

import com.bmas.dto.SwitchRoleRequest;
<<<<<<< HEAD
=======
import com.bmas.dto.UserResponse;
>>>>>>> v1_bharat
import com.bmas.entity.Role;
import com.bmas.entity.User;
import com.bmas.repository.UserRepository;
import com.bmas.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;

import java.util.Map;
=======
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
>>>>>>> v1_bharat

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/switch-role")
<<<<<<< HEAD
=======
    @Transactional
>>>>>>> v1_bharat
    public ResponseEntity<?> switchRole(@Valid @RequestBody SwitchRoleRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Role targetRole = request.getRole();
        if (!user.getRoles().contains(targetRole)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "User does not possess the requested role: " + targetRole));
        }

        user.setActiveRole(targetRole);
        user.setPreferredRole(targetRole);

        int count = user.getRoleUsageCount().getOrDefault(targetRole.name(), 0);
        user.getRoleUsageCount().put(targetRole.name(), count + 1);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), targetRole.name());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "activeRole", targetRole.name(),
                "preferredRole", targetRole.name()
        ));
    }
<<<<<<< HEAD
=======

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam(value = "query", defaultValue = "") String query) {
        if (query.trim().isEmpty()) {
            return ResponseEntity.ok(List.of());
        }

        List<User> users = userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query);

        List<UserResponse> responses = users.stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .roles(user.getRoles())
                        .activeRole(user.getActiveRole())
                        .preferredRole(user.getPreferredRole())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
>>>>>>> v1_bharat
}
