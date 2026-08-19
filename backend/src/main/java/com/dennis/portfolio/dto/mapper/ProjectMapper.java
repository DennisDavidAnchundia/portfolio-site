package com.dennis.portfolio.dto.mapper;

import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.model.Project;

public final class ProjectMapper {

    private ProjectMapper() {
    }

    public static ProjectResponse toResponse(Project project) {
        var skills = project.getSkills().stream()
                .map(s -> new ProjectResponse.SkillSummary(
                        s.getId(),
                        s.getName(),
                        s.getCategory(),
                        s.getLevel()
                ))
                .toList();

        var tech = project.getSkills().stream()
                .map(s -> s.getName())
                .toList();

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getLongDescription(),
                project.getCategory(),
                project.getImageUrl(),
                project.getGithubUrl(),
                project.getDemoUrl(),
                project.isFeatured(),
                project.getCreatedAt(),
                tech,
                skills
        );
    }
}
