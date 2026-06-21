package com.bmas.service;

import com.bmas.dto.AuthResponse;
import com.bmas.dto.LoginRequest;
import com.bmas.dto.RegisterRequest;
import com.bmas.dto.UserResponse;
import com.bmas.entity.Role;
import com.bmas.entity.User;
import com.bmas.repository.UserRepository;
import com.bmas.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager,
                       UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        Set<Role> roles = request.getRoles();
        if (roles == null || roles.isEmpty()) {
            throw new IllegalArgumentException("At least one role is required");
        }

        Role defaultRole = roles.iterator().next();
        Map<String, Integer> usageCount = new HashMap<>();
        for (Role r : roles) {
            usageCount.put(r.name(), 0);
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .preferredRole(defaultRole)
                .activeRole(defaultRole)
                .roleUsageCount(usageCount)
                .expertise(request.getExpertise())
                .currentWorkload(0)
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .roles(savedUser.getRoles())
                .activeRole(savedUser.getActiveRole())
                .preferredRole(savedUser.getPreferredRole())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        Role activeRole = null;
        if (user.getRoles().size() == 1) {
            activeRole = user.getRoles().iterator().next();
        } else {
            if (user.getPreferredRole() != null && user.getRoles().contains(user.getPreferredRole())) {
                activeRole = user.getPreferredRole();
            } else {
                Role highestRole = null;
                int maxCount = -1;
                for (Role r : user.getRoles()) {
                    int count = user.getRoleUsageCount().getOrDefault(r.name(), 0);
                    if (count > maxCount) {
                        maxCount = count;
                        highestRole = r;
                    }
                }
                activeRole = highestRole != null ? highestRole : user.getRoles().iterator().next();
            }
        }

        user.setActiveRole(activeRole);
        if (user.getPreferredRole() == null) {
            user.setPreferredRole(activeRole);
        }
        
        // Increment usage count for login
        int currentCount = user.getRoleUsageCount().getOrDefault(activeRole.name(), 0);
        user.getRoleUsageCount().put(activeRole.name(), currentCount + 1);
        
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), activeRole.name());

        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .activeRole(user.getActiveRole())
                .preferredRole(user.getPreferredRole())
                .build();

        return AuthResponse.builder()
                .token(token)
                .user(userResponse)
                .build();
    }
}
