package com.bmas.service;

import com.bmas.dto.AddMemberRequest;
import com.bmas.dto.ProjectMemberResponse;
import com.bmas.entity.Project;
import com.bmas.entity.ProjectMember;
import com.bmas.entity.User;
import com.bmas.repository.ProjectMemberRepository;
import com.bmas.repository.ProjectRepository;
import com.bmas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectMemberService {

    private final ProjectMemberRepository projectMemberRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectMemberService(ProjectMemberRepository projectMemberRepository,
                                ProjectRepository projectRepository,
                                UserRepository userRepository) {
        this.projectMemberRepository = projectMemberRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProjectMemberResponse addMember(Long projectId, AddMemberRequest request) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + projectId));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + request.getUserId()));

        if (projectMemberRepository.existsByProjectIdAndUserId(projectId, request.getUserId())) {
            throw new IllegalArgumentException("User is already a member of this project");
        }

        ProjectMember member = new ProjectMember();
        member.setProject(project);
        member.setUser(user);
        member.setRoleInProject(request.getRoleInProject());

        ProjectMember savedMember = projectMemberRepository.save(member);
        return mapToResponse(savedMember);
    }

    @Transactional
    public void removeMember(Long projectId, Long memberId) {
        ProjectMember member = projectMemberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Project member not found with id: " + memberId));

        if (!member.getProject().getId().equals(projectId)) {
            throw new IllegalArgumentException("Member does not belong to the specified project");
        }

        projectMemberRepository.delete(member);
    }

    @Transactional(readOnly = true)
    public List<ProjectMemberResponse> getProjectMembers(Long projectId) {
        if (!projectRepository.existsById(projectId)) {
            throw new IllegalArgumentException("Project not found with id: " + projectId);
        }
        return projectMemberRepository.findByProjectId(projectId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectMemberResponse changeProjectRole(Long projectId, Long memberId, String newRole) {
        ProjectMember member = projectMemberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Project member not found with id: " + memberId));

        if (!member.getProject().getId().equals(projectId)) {
            throw new IllegalArgumentException("Member does not belong to the specified project");
        }

        member.setRoleInProject(newRole);
        ProjectMember savedMember = projectMemberRepository.save(member);
        return mapToResponse(savedMember);
    }

    private ProjectMemberResponse mapToResponse(ProjectMember member) {
        return new ProjectMemberResponse(
                member.getId(),
                member.getProject().getId(),
                member.getProject().getName(),
                member.getUser().getId(),
                member.getUser().getName(),
                member.getUser().getEmail(),
                member.getRoleInProject(),
                member.getJoinedAt()
        );
    }
}
