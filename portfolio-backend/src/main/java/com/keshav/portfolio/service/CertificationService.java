package com.keshav.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.keshav.portfolio.dto.CertificationDto;
import com.keshav.portfolio.entity.Certification;
import com.keshav.portfolio.exception.ResourceNotFoundException;
import com.keshav.portfolio.repository.CertificationRepository;
import com.keshav.portfolio.util.HtmlSanitizer;

@Service
@RequiredArgsConstructor
public class CertificationService {

    private final CertificationRepository certificationRepository;

    public Page<Certification> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "issueDate"));
        return certificationRepository.findAll(pageable);
    }

    public Certification getById(Long id) {
        return certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found: " + id));
    }

    public Certification create(CertificationDto dto) {
        Certification c = Certification.builder()
                .title(HtmlSanitizer.sanitize(dto.getTitle()))
                .organization(HtmlSanitizer.sanitize(dto.getOrganization()))
                .description(HtmlSanitizer.sanitize(dto.getDescription()))
                .issueDate(dto.getIssueDate())
                .imageUrl(dto.getImageUrl())
                .certificateLink(dto.getCertificateLink())
                .build();
        return certificationRepository.save(c);
    }

    public Certification update(Long id, CertificationDto dto) {
        Certification c = getById(id);
        c.setTitle(HtmlSanitizer.sanitize(dto.getTitle()));
        c.setOrganization(HtmlSanitizer.sanitize(dto.getOrganization()));
        c.setDescription(HtmlSanitizer.sanitize(dto.getDescription()));
        c.setIssueDate(dto.getIssueDate());
        if (dto.getImageUrl() != null) c.setImageUrl(dto.getImageUrl());
        c.setCertificateLink(dto.getCertificateLink());
        return certificationRepository.save(c);
    }

    public void delete(Long id) {
        certificationRepository.delete(getById(id));
    }
}

