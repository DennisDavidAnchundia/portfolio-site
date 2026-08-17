package com.dennis.portfolio.controller;

import com.dennis.portfolio.dto.MessageRequest;
import com.dennis.portfolio.dto.MessageResponse;
import com.dennis.portfolio.service.MessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/contact")
    public ResponseEntity<MessageResponse> create(@RequestBody MessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(messageService.create(request));
    }

    @GetMapping("/messages")
    public List<MessageResponse> findAll() {
        return messageService.findAll();
    }

    @GetMapping("/messages/unread-count")
    public Map<String, Long> countUnread() {
        return Map.of("count", messageService.countUnread());
    }
}
