package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.ProjectRequest;
import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.dto.mapper.ProjectMapper;
import com.dennis.portfolio.exception.ResourceNotFoundException;
import com.dennis.portfolio.model.Project;
import com.dennis.portfolio.model.Skill;
import com.dennis.portfolio.repository.ProjectRepository;
import com.dennis.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;

    public ProjectService(ProjectRepository projectRepository, SkillRepository skillRepository) {
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
    }

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponse findById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return ProjectMapper.toResponse(project);
    }

    public List<ProjectResponse> findFeatured() {
        return projectRepository.findByFeaturedTrueOrderByCreatedAtDesc().stream()
                .map(ProjectMapper::toResponse)
                .toList();
    }

    public ProjectResponse create(ProjectRequest request) {
        Project project = new Project();
        applyFields(project, request);
        return ProjectMapper.toResponse(projectRepository.save(project));
    }

    public ProjectResponse update(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        applyFields(project, request);
        return ProjectMapper.toResponse(projectRepository.save(project));
    }

    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    private void applyFields(Project project, ProjectRequest request) {
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setLongDescription(request.longDescription());
        project.setCategory(request.category());
        project.setImageUrl(request.imageUrl());
        project.setGithubUrl(request.githubUrl());
        project.setDemoUrl(request.demoUrl());
        project.setFeatured(request.featured());

        if (request.skillIds() != null && !request.skillIds().isEmpty()) {
            project.setSkills(new HashSet<>(skillRepository.findAllById(request.skillIds())));
        } else {
            project.setSkills(new HashSet<>());
        }
    }
}
