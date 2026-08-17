package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.MessageRequest;
import com.dennis.portfolio.dto.MessageResponse;
import com.dennis.portfolio.dto.mapper.MessageMapper;
import com.dennis.portfolio.model.Message;
import com.dennis.portfolio.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public MessageResponse create(MessageRequest request) {
        Message message = MessageMapper.toEntity(request);
        messageRepository.save(message);
        return MessageMapper.toResponse(message);
    }

    public List<MessageResponse> findAll() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(MessageMapper::toResponse)
                .toList();
    }

    public long countUnread() {
        return messageRepository.countByReadFalse();
    }
}
