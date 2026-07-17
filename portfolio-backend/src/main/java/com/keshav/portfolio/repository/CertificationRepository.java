package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.Certification;

public interface CertificationRepository extends JpaRepository<Certification, Long> {}