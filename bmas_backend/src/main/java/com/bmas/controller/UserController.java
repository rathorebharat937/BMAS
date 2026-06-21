package com.bmas.controller;

import com.bmas.dto.SwitchRoleRequest;
import com.bmas.entity.Role;
import com.bmas.entity.User;
import com.bmas.repository.UserRepository;
import com.bmas.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
}
