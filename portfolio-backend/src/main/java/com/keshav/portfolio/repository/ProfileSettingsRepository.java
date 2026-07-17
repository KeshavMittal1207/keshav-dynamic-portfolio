package com.keshav.portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.keshav.portfolio.entity.ProfileSettings;

public interface ProfileSettingsRepository extends JpaRepository<ProfileSettings, Long> {
}
