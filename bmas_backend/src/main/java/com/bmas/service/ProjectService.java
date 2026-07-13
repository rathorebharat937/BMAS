package com.bmas.service;

import com.bmas.dto.CreateProjectRequest;
import com.bmas.dto.ProjectResponse;
import com.bmas.dto.UpdateProjectRequest;
import com.bmas.entity.Project;
import com.bmas.entity.ProjectMember;
import com.bmas.entity.User;
import com.bmas.repository.ProjectMemberRepository;
import com.bmas.repository.ProjectRepository;
import com.bmas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository,
                          ProjectMemberRepository projectMemberRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.projectMemberRepository = projectMemberRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ProjectResponse createProject(CreateProjectRequest request, String creatorEmail) {
        User creator = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new IllegalArgumentException("Creator user not found"));

        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setCreatedBy(creator.getId());
        project.setTransparencyEnabled(true);
        project.setStatus("ACTIVE");

        Project savedProject = projectRepository.save(project);

        // Add creator as member of project with PROJECT_MANAGER role
        ProjectMember member = new ProjectMember();
        member.setProject(savedProject);
        member.setUser(creator);
        member.setRoleInProject("PROJECT_MANAGER");
        projectMemberRepository.save(member);

        return mapToResponse(savedProject);
    }

    @Transactional
    public ProjectResponse updateProject(Long id, UpdateProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));

        if (request.getName() != null) {
            project.setName(request.getName());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            project.setStatus(request.getStatus());
        }
        if (request.getTransparencyEnabled() != null) {
            project.setTransparencyEnabled(request.getTransparencyEnabled());
        }

        Project updatedProject = projectRepository.save(project);
        return mapToResponse(updatedProject);
    }

    @Transactional
    public ProjectResponse archiveProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        project.setStatus("ARCHIVED");
        Project updatedProject = projectRepository.save(project);
        return mapToResponse(updatedProject);
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProjectResponse toggleTransparency(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        project.setTransparencyEnabled(!project.isTransparencyEnabled());
        Project updatedProject = projectRepository.save(project);
        return mapToResponse(updatedProject);
    }

    private ProjectResponse mapToResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getName(),
                project.getDescription(),
                project.getCreatedBy(),
                project.isTransparencyEnabled(),
                project.getStatus(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
