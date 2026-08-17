package com.dennis.portfolio.dto;

import java.time.Instant;

public record MessageResponse(
        Long id,
        String name,
        String email,
        String content,
        boolean read,
        Instant createdAt
) {
}
