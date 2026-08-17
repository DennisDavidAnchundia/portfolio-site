package com.dennis.portfolio.repository;

import com.dennis.portfolio.model.Skill;
import com.dennis.portfolio.model.SkillCategory;
import com.dennis.portfolio.model.SkillLevel;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("integration")
@SpringBootTest
@Testcontainers
class SkillRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("portfolio_test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.flyway.enabled", () -> false);
    }

    @Autowired
    private SkillRepository skillRepository;

    @Test
    void findAllByOrderByNameAsc_returnsSortedByName() {
        skillRepository.save(createSkill("React", SkillCategory.FRAMEWORK, SkillLevel.ADVANCED));
        skillRepository.save(createSkill("Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT));
        skillRepository.save(createSkill("Docker", SkillCategory.TOOL, SkillLevel.INTERMEDIATE));

        List<Skill> result = skillRepository.findAllByOrderByNameAsc();

        assertEquals(3, result.size());
        assertEquals("Docker", result.get(0).getName());
        assertEquals("Java", result.get(1).getName());
        assertEquals("React", result.get(2).getName());
    }

    @Test
    void existsByName_returnsTrueWhenExists() {
        skillRepository.save(createSkill("Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT));

        assertTrue(skillRepository.existsByName("Java"));
        assertFalse(skillRepository.existsByName("Python"));
    }

    @Test
    void uniqueName_constraint_preventsDuplicates() {
        skillRepository.save(createSkill("Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT));

        try {
            skillRepository.save(createSkill("Java", SkillCategory.FRAMEWORK, SkillLevel.BASIC));
            skillRepository.flush();
        } catch (Exception e) {
            // Expected: unique constraint violation
        }

        assertEquals(1, skillRepository.count());
    }

    private Skill createSkill(String name, SkillCategory category, SkillLevel level) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setLevel(level);
        return skill;
    }
}
