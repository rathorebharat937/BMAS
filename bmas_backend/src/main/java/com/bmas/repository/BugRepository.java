package com.bmas.repository;

import com.bmas.entity.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {
    List<Bug> findByProjectId(Long projectId);
    List<Bug> findByAssigneeId(Long assigneeId);
    List<Bug> findByEscalatedTrue();
    
    long countByStatus(String status);
    long countBySeverity(String severity);
    long countByPriority(String priority);
    long countByProjectId(Long projectId);
    
    long countByProjectIdAndStatus(Long projectId, String status);
    long countByProjectIdAndSeverity(Long projectId, String severity);
    long countByProjectIdAndPriority(Long projectId, String priority);
}
