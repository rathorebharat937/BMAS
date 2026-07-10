package com.bmas.repository;

import com.bmas.entity.Project;
import com.bmas.entity.ProjectMember;
import com.bmas.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Long> {
    List<ProjectMember> findByProject(Project project);
    List<ProjectMember> findByUser(User user);
    boolean existsByProjectAndUser(Project project, User user);
    void deleteByProjectAndUser(Project project, User user);

    @Query("SELECT COUNT(pm) FROM ProjectMember pm WHERE pm.project.id = :projectId")
    int countByProjectId(@Param("projectId") Long projectId);
}
