package com.bmas.config;

import com.bmas.entity.Role;
import com.bmas.entity.User;
import com.bmas.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Project Manager
            Set<Role> pmRoles = new HashSet<>();
            pmRoles.add(Role.PROJECT_MANAGER);
            Map<String, Integer> pmUsage = new HashMap<>();
            pmUsage.put(Role.PROJECT_MANAGER.name(), 0);

            userRepository.save(new User(
                    null,
                    "Project Manager User",
                    "pm@bmas.com",
                    passwordEncoder.encode("password123"),
                    pmRoles,
                    Role.PROJECT_MANAGER,
                    Role.PROJECT_MANAGER,
                    pmUsage,
                    "Management",
                    0
            ));

            // Seed Developer
            Set<Role> devRoles = new HashSet<>();
            devRoles.add(Role.DEVELOPER);
            Map<String, Integer> devUsage = new HashMap<>();
            devUsage.put(Role.DEVELOPER.name(), 0);

            userRepository.save(new User(
                    null,
                    "Developer User",
                    "developer@bmas.com",
                    passwordEncoder.encode("password123"),
                    devRoles,
                    Role.DEVELOPER,
                    Role.DEVELOPER,
                    devUsage,
                    "Java, React",
                    0
            ));

            // Seed Tester
            Set<Role> testerRoles = new HashSet<>();
            testerRoles.add(Role.TESTER);
            Map<String, Integer> testerUsage = new HashMap<>();
            testerUsage.put(Role.TESTER.name(), 0);

            userRepository.save(new User(
                    null,
                    "Tester User",
                    "tester@bmas.com",
                    passwordEncoder.encode("password123"),
                    testerRoles,
                    Role.TESTER,
                    Role.TESTER,
                    testerUsage,
                    "Selenium, JUnit",
                    0
            ));

            // Seed Bharat (Developer & Tester)
            Set<Role> bharatRoles = new HashSet<>();
            bharatRoles.add(Role.DEVELOPER);
            bharatRoles.add(Role.TESTER);
            Map<String, Integer> bharatUsage = new HashMap<>();
            bharatUsage.put(Role.DEVELOPER.name(), 25);
            bharatUsage.put(Role.TESTER.name(), 4);

            userRepository.save(new User(
                    null,
                    "Bharat",
                    "bharat@gmail.com",
                    passwordEncoder.encode("password123"),
                    bharatRoles,
                    Role.DEVELOPER,
                    Role.DEVELOPER,
                    bharatUsage,
                    "Java",
                    0
            ));

            System.out.println("Database successfully seeded with default multi-role testing accounts!");
        }
    }
}
