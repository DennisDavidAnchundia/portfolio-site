package com.dennis.portfolio.data;

import com.dennis.portfolio.model.Project;
import com.dennis.portfolio.model.Skill;
import com.dennis.portfolio.model.SkillCategory;
import com.dennis.portfolio.model.SkillLevel;
import com.dennis.portfolio.repository.ProjectRepository;
import com.dennis.portfolio.repository.SkillRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataSeeder implements ApplicationRunner {

    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;

    public DataSeeder(SkillRepository skillRepository, ProjectRepository projectRepository) {
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (skillRepository.count() > 0) return;

        Skill java      = saveSkill("Java",       SkillCategory.LANGUAGE,  SkillLevel.EXPERT);
        Skill spring    = saveSkill("Spring Boot", SkillCategory.FRAMEWORK, SkillLevel.EXPERT);
        Skill postgres  = saveSkill("PostgreSQL",  SkillCategory.DATABASE,  SkillLevel.ADVANCED);
        Skill redis     = saveSkill("Redis",       SkillCategory.DATABASE,  SkillLevel.INTERMEDIATE);
        Skill docker    = saveSkill("Docker",      SkillCategory.TOOL,      SkillLevel.ADVANCED);
        Skill k8s       = saveSkill("Kubernetes",  SkillCategory.TOOL,      SkillLevel.INTERMEDIATE);
        Skill react     = saveSkill("React",       SkillCategory.FRAMEWORK, SkillLevel.INTERMEDIATE);
        Skill ts        = saveSkill("TypeScript",  SkillCategory.LANGUAGE,  SkillLevel.INTERMEDIATE);
        Skill git       = saveSkill("Git",         SkillCategory.TOOL,      SkillLevel.EXPERT);
        Skill maven     = saveSkill("Maven",       SkillCategory.TOOL,      SkillLevel.EXPERT);
        Skill flyway    = saveSkill("Flyway",      SkillCategory.TOOL,      SkillLevel.ADVANCED);
        Skill jpa       = saveSkill("JPA/Hibernate", SkillCategory.FRAMEWORK, SkillLevel.EXPERT);

        Project techstore = new Project();
        techstore.setTitle("TechStore API");
        techstore.setDescription(
                "API REST de e-commerce con carrito de compras, autenticación JWT y pagos. "
              + "Arquitectura limpia con capas controller → service → repository. "
              + "PostgreSQL, Redis para caché de sesiones, Flyway para migraciones.");
        techstore.setGithubUrl("https://github.com/DennisDavidAnchundia/techstore-api");
        techstore.setFeatured(true);
        techstore.setSkills(Set.of(java, spring, postgres, redis, docker, jpa, flyway));

        Project portfolioApi = new Project();
        portfolioApi.setTitle("Portfolio API");
        portfolioApi.setDescription(
                "Backend del portafolio personal: API REST con Spring Boot 4, PostgreSQL, "
              + "Redis, Flyway, Docker multi-stage y despliegue en Kubernetes. "
              + "CI/CD con GitHub Actions.");
        portfolioApi.setGithubUrl("https://github.com/DennisDavidAnchundia/portfolio-site");
        portfolioApi.setFeatured(true);
        portfolioApi.setSkills(Set.of(java, spring, postgres, redis, docker, k8s, jpa, maven));

        projectRepository.saveAll(Set.of(techstore, portfolioApi));
    }

    private Skill saveSkill(String name, SkillCategory category, SkillLevel level) {
        Skill skill = new Skill();
        skill.setName(name);
        skill.setCategory(category);
        skill.setLevel(level);
        return skillRepository.save(skill);
    }
}
