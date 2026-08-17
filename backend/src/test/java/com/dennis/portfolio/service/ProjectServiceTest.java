package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.exception.ResourceNotFoundException;
import com.dennis.portfolio.model.Project;
import com.dennis.portfolio.model.Skill;
import com.dennis.portfolio.repository.ProjectRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void findAll_returnsListOfProjects() {
        Project project = createProject(1L, "Portfolio API");
        when(projectRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(project));

        List<ProjectResponse> result = projectService.findAll();

        assertEquals(1, result.size());
        assertEquals("Portfolio API", result.get(0).title());
    }

    @Test
    void findById_returnsProject() {
        Project project = createProject(1L, "Portfolio API");
        when(projectRepository.findById(1L)).thenReturn(Optional.of(project));

        ProjectResponse result = projectService.findById(1L);

        assertEquals("Portfolio API", result.title());
    }

    @Test
    void findById_throwsWhenNotFound() {
        when(projectRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> projectService.findById(99L));
    }

    @Test
    void findFeatured_returnsFeaturedProjects() {
        Project project = createProject(1L, "Featured Project");
        project.setFeatured(true);
        when(projectRepository.findByFeaturedTrueOrderByCreatedAtDesc()).thenReturn(List.of(project));

        List<ProjectResponse> result = projectService.findFeatured();

        assertEquals(1, result.size());
        assertTrue(result.get(0).featured());
    }

    private Project createProject(Long id, String title) {
        Project project = new Project();
        project.setId(id);
        project.setTitle(title);
        project.setDescription("Description");
        project.setFeatured(false);
        project.setCreatedAt(Instant.now());
        project.setSkills(Set.of());
        return project;
    }
}
