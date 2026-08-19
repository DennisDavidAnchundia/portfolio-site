package com.dennis.portfolio.controller;

import com.dennis.portfolio.dto.ProjectRequest;
import com.dennis.portfolio.dto.ProjectResponse;
import com.dennis.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Value("${app.admin.key:}")
    private String adminKey;

    private final ProjectService projectService;

    public AdminController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectResponse>> listProjects(@RequestHeader("X-Admin-Key") String key) {
        checkAuth(key);
        return ResponseEntity.ok(projectService.findAll());
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectResponse> createProject(
            @RequestHeader("X-Admin-Key") String key,
            @Valid @RequestBody ProjectRequest request) {
        checkAuth(key);
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.create(request));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectResponse> updateProject(
            @RequestHeader("X-Admin-Key") String key,
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {
        checkAuth(key);
        return ResponseEntity.ok(projectService.update(id, request));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(
            @RequestHeader("X-Admin-Key") String key,
            @PathVariable Long id) {
        checkAuth(key);
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private void checkAuth(String key) {
        if (adminKey.isEmpty()) {
            throw new SecurityException("Admin key not configured");
        }
        if (!adminKey.equals(key)) {
            throw new SecurityException("Invalid admin key");
        }
    }
}
