package com.bmas.service;

import com.bmas.dto.EscalatedBugResponse;
import com.bmas.dto.ProjectDashboardResponse;
import com.bmas.dto.WorkloadResponse;
import com.bmas.entity.Bug;
import com.bmas.entity.User;
import com.bmas.repository.BugRepository;
import com.bmas.repository.ProjectMemberRepository;
import com.bmas.repository.ProjectRepository;
import com.bmas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PMService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final BugRepository bugRepository;
    private final UserRepository userRepository;

    @Autowired
    public PMService(ProjectRepository projectRepository,
                     ProjectMemberRepository projectMemberRepository,
                     BugRepository bugRepository,
                     UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.bugRepository = bugRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public ProjectDashboardResponse getPMDashboard() {
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.findAll().stream()
                .filter(p -> "ACTIVE".equals(p.getStatus()))
                .count();
        long completedProjects = projectRepository.findAll().stream()
                .filter(p -> "COMPLETED".equals(p.getStatus()))
                .count();
        long totalMembers = userRepository.count();
        
        long openBugs = bugRepository.countByStatus("OPEN");
        long criticalBugs = bugRepository.findAll().stream()
                .filter(b -> "CRITICAL".equalsIgnoreCase(b.getSeverity()) || "CRITICAL".equalsIgnoreCase(b.getPriority()))
                .count();
        long escalatedBugs = bugRepository.findByEscalatedTrue().size();

        return new ProjectDashboardResponse(
                totalProjects,
                activeProjects,
                completedProjects,
                totalMembers,
                openBugs,
                criticalBugs,
                escalatedBugs
        );
    }

    @Transactional(readOnly = true)
    public List<EscalatedBugResponse> getEscalatedBugs() {
        return bugRepository.findByEscalatedTrue().stream()
                .map(bug -> new EscalatedBugResponse(
                        bug.getId(),
                        bug.getTitle(),
                        bug.getPriority(),
                        bug.getStatus(),
                        bug.getAssignee() != null ? bug.getAssignee().getName() : "Unassigned"
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public void reassignBug(Long bugId, Long userId) {
        Bug bug = bugRepository.findById(bugId)
                .orElseThrow(() -> new IllegalArgumentException("Bug not found with id: " + bugId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        bug.setAssignee(user);
        if ("OPEN".equalsIgnoreCase(bug.getStatus())) {
            bug.setStatus("ASSIGNED");
        }
        bugRepository.save(bug);
    }

    @Transactional(readOnly = true)
    public List<WorkloadResponse> getWorkloads() {
        List<User> users = userRepository.findAll();
        
        return users.stream().map(user -> {
            List<Bug> userBugs = bugRepository.findByAssigneeId(user.getId());
            
            long assignedBugs = userBugs.size();
            long activeBugs = userBugs.stream()
                    .filter(b -> !"RESOLVED".equalsIgnoreCase(b.getStatus()) && !"CLOSED".equalsIgnoreCase(b.getStatus()))
                    .count();
            long resolvedBugs = assignedBugs - activeBugs;

            return new WorkloadResponse(
                    user.getId(),
                    user.getName(),
                    assignedBugs,
                    activeBugs,
                    resolvedBugs
            );
        }).collect(Collectors.toList());
    }
}
