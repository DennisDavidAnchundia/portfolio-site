package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.dto.mapper.ProjectMapper;
import com.dennis.portfolio.model.Project;
import com.dennis.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponse findById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        return ProjectMapper.toResponse(project);
    }

    public List<ProjectResponse> findFeatured() {
        return projectRepository.findByFeaturedTrueOrderByCreatedAtDesc().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }
}
