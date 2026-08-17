package com.dennis.portfolio.dto;

import com.dennis.portfolio.model.SkillCategory;
import com.dennis.portfolio.model.SkillLevel;

import java.time.Instant;
import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        String imageUrl,
        String githubUrl,
        String demoUrl,
        boolean featured,
        Instant createdAt,
        List<SkillSummary> skills
) {
    public record SkillSummary(
            Long id,
            String name,
            SkillCategory category,
            SkillLevel level
    ) {
    }
}
