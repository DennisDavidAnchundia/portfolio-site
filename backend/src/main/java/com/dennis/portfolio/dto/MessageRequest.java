package com.dennis.portfolio.dto;

public record MessageRequest(
        String name,
        String email,
        String content
) {
}
