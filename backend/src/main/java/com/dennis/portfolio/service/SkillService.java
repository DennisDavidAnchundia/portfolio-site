package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.SkillResponse;
import com.dennis.portfolio.dto.mapper.SkillMapper;
import com.dennis.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponse> findAll() {
        return skillRepository.findAllByOrderByNameAsc().stream()
                .map(SkillMapper::toResponse)
                .toList();
    }
}
