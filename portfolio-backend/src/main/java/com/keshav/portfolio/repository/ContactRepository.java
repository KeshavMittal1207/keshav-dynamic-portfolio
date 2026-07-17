package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.ContactMessage;

public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
}
