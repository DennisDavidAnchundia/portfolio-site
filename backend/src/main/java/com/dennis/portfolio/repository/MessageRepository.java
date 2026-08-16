package com.dennis.portfolio.repository;

import com.dennis.portfolio.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllByOrderByCreatedAtDesc();

    long countByReadFalse();
}
