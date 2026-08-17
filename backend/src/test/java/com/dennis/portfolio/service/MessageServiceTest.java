package com.dennis.portfolio.service;

import com.dennis.portfolio.dto.MessageRequest;
import com.dennis.portfolio.dto.MessageResponse;
import com.dennis.portfolio.model.Message;
import com.dennis.portfolio.repository.MessageRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @InjectMocks
    private MessageService messageService;

    @Test
    void create_savesMessageAndReturnsResponse() {
        MessageRequest request = new MessageRequest("John", "john@example.com", "Hello!");
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> {
            Message msg = invocation.getArgument(0);
            msg.setId(1L);
            msg.setCreatedAt(Instant.now());
            return msg;
        });

        MessageResponse result = messageService.create(request);

        assertEquals("John", result.name());
        assertEquals("john@example.com", result.email());
        assertEquals("Hello!", result.content());
        assertFalse(result.read());
        verify(messageRepository).save(any(Message.class));
    }

    @Test
    void findAll_returnsListOfMessages() {
        Message message = createMessage(1L, "John", "john@example.com", "Hello!");
        when(messageRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(message));

        List<MessageResponse> result = messageService.findAll();

        assertEquals(1, result.size());
        assertEquals("John", result.get(0).name());
    }

    @Test
    void countUnread_returnsCount() {
        when(messageRepository.countByReadFalse()).thenReturn(5L);

        long result = messageService.countUnread();

        assertEquals(5L, result);
    }

    private Message createMessage(Long id, String name, String email, String content) {
        Message message = new Message();
        message.setId(id);
        message.setName(name);
        message.setEmail(email);
        message.setContent(content);
        message.setRead(false);
        message.setCreatedAt(Instant.now());
        return message;
    }
}
