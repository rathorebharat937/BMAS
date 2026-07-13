package com.bmas.service;

<<<<<<< HEAD
import com.bmas.dto.CreateProjectRequest;
import com.bmas.dto.ProjectResponse;
import com.bmas.dto.UpdateProjectRequest;
import com.bmas.entity.Project;
import com.bmas.entity.ProjectMember;
=======
import com.bmas.dto.ProjectMemberResponse;
import com.bmas.dto.ProjectRequest;
import com.bmas.dto.ProjectResponse;
import com.bmas.entity.Project;
import com.bmas.entity.ProjectMember;
import com.bmas.entity.Role;
>>>>>>> v1_bharat
import com.bmas.entity.User;
import com.bmas.repository.ProjectMemberRepository;
import com.bmas.repository.ProjectRepository;
import com.bmas.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

<<<<<<< HEAD
import java.time.LocalDateTime;
=======
>>>>>>> v1_bharat
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
<<<<<<< HEAD
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
=======
    public ProjectResponse createProject(ProjectRequest request, String email) {
        if (projectRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("A project with this name already exists");
        }

        User creator = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .createdBy(creator)
                .active(true)
                .build();

        Project savedProject = projectRepository.save(project);

        // Automatically add the creator as a project member
        ProjectMember creatorMembership = ProjectMember.builder()
                .project(savedProject)
                .user(creator)
                .build();
        projectMemberRepository.save(creatorMembership);

        return toProjectResponse(savedProject, 1);
    }

    @Transactional
    public void addMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (projectMemberRepository.existsByProjectAndUser(project, user)) {
            throw new IllegalArgumentException("User is already a member of this project");
        }

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .user(user)
                .build();

        projectMemberRepository.save(member);
    }

    @Transactional
    public void removeMember(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!projectMemberRepository.existsByProjectAndUser(project, user)) {
            throw new IllegalArgumentException("User is not a member of this project");
        }

        projectMemberRepository.deleteByProjectAndUser(project, user);
    }

    public List<ProjectMemberResponse> listMembers(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        return projectMemberRepository.findByProject(project)
                .stream()
                .map(this::toProjectMemberResponse)
                .collect(Collectors.toList());
    }

    public List<ProjectResponse> listProjects(String email, String activeRole) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Project> projects;

        if (Role.PROJECT_MANAGER.name().equals(activeRole)) {
            projects = projectRepository.findByCreatedBy(user);
        } else {
            // Developers and Testers see projects where they are members
            projects = projectMemberRepository.findByUser(user)
                    .stream()
                    .map(ProjectMember::getProject)
                    .collect(Collectors.toList());
        }

        // Use a single COUNT query per project instead of loading full member lists (avoids N+1)
        return projects.stream()
                .map(project -> toProjectResponse(project,
                        projectMemberRepository.countByProjectId(project.getId())))
                .collect(Collectors.toList());
    }

    public ProjectResponse getProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        int memberCount = projectMemberRepository.countByProjectId(project.getId());
        return toProjectResponse(project, memberCount);
    }

    private ProjectResponse toProjectResponse(Project project, int memberCount) {
        return ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .createdBy(project.getCreatedBy().getName())
                .createdAt(project.getCreatedAt())
                .memberCount(memberCount)
                .build();
    }

    private ProjectMemberResponse toProjectMemberResponse(ProjectMember member) {
        return ProjectMemberResponse.builder()
                .id(member.getId())
                .userId(member.getUser().getId())
                .name(member.getUser().getName())
                .email(member.getUser().getEmail())
                .joinedAt(member.getJoinedAt())
                .build();
>>>>>>> v1_bharat
    }
}
