package com.keshav.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.keshav.portfolio.entity.Internship;
import com.keshav.portfolio.repository.InternshipRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipService {
    private final InternshipRepository internshipRepository;

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public Internship saveInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    public Internship updateInternship(Long id, Internship updated) {
        Internship existing = internshipRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Internship not found: " + id));
        existing.setTitle(updated.getTitle());
        existing.setCompany(updated.getCompany());
        existing.setDuration(updated.getDuration());
        existing.setDescription(updated.getDescription());
        existing.setLocation(updated.getLocation());
        existing.setType(updated.getType());
        existing.setCertificateUrl(updated.getCertificateUrl());
        existing.setDownloadUrl(updated.getDownloadUrl());
        return internshipRepository.save(existing);
    }

    public void deleteInternship(Long id) {
        internshipRepository.deleteById(id);
    }
}
