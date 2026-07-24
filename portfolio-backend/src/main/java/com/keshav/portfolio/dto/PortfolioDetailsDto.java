package com.keshav.portfolio.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

import com.keshav.portfolio.entity.*;

@Data
@Builder
public class PortfolioDetailsDto {
    private ProfileSettings profile;
    private List<Skill> skills;
    private List<Project> projects;
    private List<Certification> certifications;
    private List<Internship> internships;
}
