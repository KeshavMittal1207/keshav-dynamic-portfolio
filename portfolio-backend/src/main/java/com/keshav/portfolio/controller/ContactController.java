package com.keshav.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keshav.portfolio.entity.ContactMessage;
import com.keshav.portfolio.repository.ContactRepository;
import com.keshav.portfolio.service.EmailService;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<ContactMessage> sendMessage(@jakarta.validation.Valid @RequestBody ContactMessage message) {
        ContactMessage saved = contactRepository.save(message);
        emailService.sendContactNotification(saved);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getMessages() {
        return ResponseEntity.ok(contactRepository.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
