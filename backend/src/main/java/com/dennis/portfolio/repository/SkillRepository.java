package com.dennis.portfolio.repository;

import com.dennis.portfolio.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findAllByOrderByNameAsc();

    boolean existsByName(String name);
}
