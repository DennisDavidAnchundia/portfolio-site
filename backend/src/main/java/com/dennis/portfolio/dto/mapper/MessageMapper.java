package com.dennis.portfolio.dto.mapper;

import com.dennis.portfolio.dto.MessageRequest;
import com.dennis.portfolio.dto.MessageResponse;
import com.dennis.portfolio.model.Message;

public final class MessageMapper {

    private MessageMapper() {
    }

    public static Message toEntity(MessageRequest request) {
        Message message = new Message();
        message.setName(request.name());
        message.setEmail(request.email());
        message.setContent(request.content());
        return message;
    }

    public static MessageResponse toResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getName(),
                message.getEmail(),
                message.getContent(),
                message.isRead(),
                message.getCreatedAt()
        );
    }
}
