package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {}
