package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.SkillResponse;
import com.dennis.portfolio.model.Skill;
import com.dennis.portfolio.model.SkillCategory;
import com.dennis.portfolio.model.SkillLevel;
import com.dennis.portfolio.repository.SkillRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SkillServiceTest {

    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private SkillService skillService;

    @Test
    void findAll_returnsListOfSkills() {
        Skill skill = createSkill(1L, "Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT);
        when(skillRepository.findAllByOrderByNameAsc()).thenReturn(List.of(skill));

        List<SkillResponse> result = skillService.findAll();

        assertEquals(1, result.size());
        assertEquals("Java", result.get(0).name());
        assertEquals(SkillCategory.LANGUAGE, result.get(0).category());
        assertEquals(SkillLevel.EXPERT, result.get(0).level());
    }

    @Test
    void findAll_returnsEmptyList() {
        when(skillRepository.findAllByOrderByNameAsc()).thenReturn(List.of());

        List<SkillResponse> result = skillService.findAll();

        assertEquals(0, result.size());
    }

    private Skill createSkill(Long id, String name, SkillCategory category, SkillLevel level) {
        Skill skill = new Skill();
        skill.setId(id);
        skill.setName(name);
        skill.setCategory(category);
        skill.setLevel(level);
        return skill;
    }
}
