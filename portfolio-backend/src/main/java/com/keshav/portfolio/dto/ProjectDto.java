package com.keshav.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;
import lombok.Data;

@Data
public class ProjectDto {
    @NotBlank(message = "Title is required")
    private String title;
    private String shortDescription;
    private String detailedDescription;
    private String techStack;

    @URL(message = "GitHub Link must be a valid URL")
    private String githubLink;

    private String liveLink;

    @URL(message = "Image URL must be a valid URL")
    private String imageUrl;
    
    private String createdDate;
}
