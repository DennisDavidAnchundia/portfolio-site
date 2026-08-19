package com.dennis.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record ProjectRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank String description,
        String longDescription,
        @NotBlank String category,
        String imageUrl,
        String githubUrl,
        String demoUrl,
        @NotNull Boolean featured,
        Set<Long> skillIds
) {
}
