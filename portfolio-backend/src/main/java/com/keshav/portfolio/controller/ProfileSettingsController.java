package com.keshav.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.keshav.portfolio.entity.ProfileSettings;
import com.keshav.portfolio.service.CloudinaryService;
import com.keshav.portfolio.service.ProfileSettingsService;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileSettingsController {
    private final ProfileSettingsService service;
    private final CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<ProfileSettings> getSettings() {
        return ResponseEntity.ok(service.getSettings());
    }

    @PostMapping("/update")
    public ResponseEntity<ProfileSettings> updateSettings(@RequestBody ProfileSettings settings) {
        return ResponseEntity.ok(service.updateSettings(settings));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        String url = cloudinaryService.uploadImage(file, "profile");
        return ResponseEntity.ok(url);
    }
}
