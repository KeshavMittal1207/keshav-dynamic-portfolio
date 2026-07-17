package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.Internship;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
}
