package com.dennis.portfolio.dto;

import com.dennis.portfolio.model.SkillCategory;
import com.dennis.portfolio.model.SkillLevel;

public record SkillResponse(
        Long id,
        String name,
        SkillCategory category,
        SkillLevel level
) {
}
