package com.dennis.portfolio.repository;

import com.dennis.portfolio.model.Project;
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

import java.time.Instant;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("integration")
@SpringBootTest
@Testcontainers
class ProjectRepositoryIntegrationTest {

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
    private ProjectRepository projectRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Test
    void findAllByOrderByCreatedAtDesc_returnsOrderedProjects() {
        Skill skill = createAndSaveSkill("Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT);

        Project p1 = createProject("First Project");
        p1.setSkills(Set.of(skill));
        projectRepository.save(p1);

        Project p2 = createProject("Second Project");
        p2.setSkills(Set.of(skill));
        projectRepository.save(p2);

        List<Project> result = projectRepository.findAllByOrderByCreatedAtDesc();

        assertEquals(2, result.size());
        assertEquals("Second Project", result.get(0).getTitle());
        assertEquals("First Project", result.get(1).getTitle());
    }

    @Test
    void findByFeaturedTrueOrderByCreatedAtDesc_returnsOnlyFeatured() {
        Skill skill = createAndSaveSkill("React", SkillCategory.FRAMEWORK, SkillLevel.ADVANCED);

        Project featured = createProject("Featured Project");
        featured.setFeatured(true);
        featured.setSkills(Set.of(skill));
        projectRepository.save(featured);

        Project notFeatured = createProject("Normal Project");
        notFeatured.setSkills(Set.of(skill));
        projectRepository.save(notFeatured);

        List<Project> result = projectRepository.findByFeaturedTrueOrderByCreatedAtDesc();

        assertEquals(1, result.size());
        assertEquals("Featured Project", result.get(0).getTitle());
        assertTrue(result.get(0).isFeatured());
    }

    @Test
    void project_skills_association_works() {
        Skill java = createAndSaveSkill("Java", SkillCategory.LANGUAGE, SkillLevel.EXPERT);
        Skill spring = createAndSaveSkill("Spring Boot", SkillCategory.FRAMEWORK, SkillLevel.ADVANCED);

        Project project = createProject("Portfolio API");
        project.setSkills(Set.of(java, spring));
        projectRepository.save(project);

        Project found = projectRepository.findById(project.getId()).orElseThrow();

        assertEquals(2, found.getSkills().size());
        assertTrue(found.getSkills().stream().anyMatch(s -> s.getName().equals("Java")));
        assertTrue(found.getSkills().stream().anyMatch(s -> s.getName().equals("Spring Boot")));
    }

    private Skill createAndSaveSkill(String name, SkillCategory category, SkillLevel level) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setLevel(level);
        return skillRepository.save(skill);
    }

    private Project createProject(String title) {
        Project project = new Project();
        project.setTitle(title);
        project.setDescription("Description for " + title);
        project.setFeatured(false);
        project.setCreatedAt(Instant.now());
        project.setSkills(Set.of());
        return project;
    }
}
