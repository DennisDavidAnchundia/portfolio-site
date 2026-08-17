package com.dennis.portfolio.dto.mapper;

import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.model.Project;

import java.util.ArrayList;

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

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getImageUrl(),
                project.getGithubUrl(),
                project.getDemoUrl(),
                project.isFeatured(),
                project.getCreatedAt(),
                skills
        );
    }
}
