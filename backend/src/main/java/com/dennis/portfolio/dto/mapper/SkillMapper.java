package com.dennis.portfolio.dto.mapper;

import com.dennis.portfolio.dto.SkillResponse;
import com.dennis.portfolio.model.Skill;

public final class SkillMapper {

    private SkillMapper() {
    }

    public static SkillResponse toResponse(Skill skill) {
        return new SkillResponse(
                skill.getId(),
                skill.getName(),
                skill.getCategory(),
                skill.getLevel()
        );
    }
}
