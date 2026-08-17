package com.dennis.portfolio.repository;

import com.dennis.portfolio.model.Message;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.Instant;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("integration")
@SpringBootTest
@Testcontainers
class MessageRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("portfolio_test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
        registry.add("spring.flyway.enabled", () -> false);
    }

    @Autowired
    private MessageRepository messageRepository;

    @Test
    void findAllByOrderByCreatedAtDesc_returnsOrderedMessages() {
        messageRepository.save(createMessage("Alice", "alice@example.com", "First message"));
        messageRepository.save(createMessage("Bob", "bob@example.com", "Second message"));

        List<Message> result = messageRepository.findAllByOrderByCreatedAtDesc();

        assertEquals(2, result.size());
        assertEquals("Bob", result.get(0).getName());
        assertEquals("Alice", result.get(1).getName());
    }

    @Test
    void countByReadFalse_returnsUnreadCount() {
        messageRepository.save(createMessage("Alice", "alice@example.com", "Read message"));
        Message unread = createMessage("Bob", "bob@example.com", "Unread message");
        unread.setRead(false);
        messageRepository.save(unread);

        Message readMsg = createMessage("Charlie", "charlie@example.com", "Another read");
        readMsg.setRead(true);
        messageRepository.save(readMsg);

        long count = messageRepository.countByReadFalse();

        assertEquals(2, count);
    }

    @Test
    void message_persistsAllFields() {
        Message message = createMessage("Test User", "test@example.com", "Hello World!");
        message.setRead(false);
        Message saved = messageRepository.save(message);
        messageRepository.flush();

        Message found = messageRepository.findById(saved.getId()).orElseThrow();

        assertEquals("Test User", found.getName());
        assertEquals("test@example.com", found.getEmail());
        assertEquals("Hello World!", found.getContent());
        assertFalse(found.isRead());
        assertTrue(found.getCreatedAt().isBefore(Instant.now().plusSeconds(1)));
    }

    private Message createMessage(String name, String email, String content) {
        Message message = new Message();
        message.setName(name);
        message.setEmail(email);
        message.setContent(content);
        message.setRead(false);
        message.setCreatedAt(Instant.now());
        return message;
    }
}
