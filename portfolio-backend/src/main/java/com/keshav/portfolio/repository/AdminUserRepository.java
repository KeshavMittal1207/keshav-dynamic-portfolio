package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.AdminUser;

import java.util.Optional;

public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByUsername(String username);
}

