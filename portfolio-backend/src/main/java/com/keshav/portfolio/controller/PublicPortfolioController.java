package com.keshav.portfolio.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.keshav.portfolio.dto.PortfolioDetailsDto;
import com.keshav.portfolio.service.PortfolioDetailsService;

@RestController
@RequestMapping("/api/public/portfolio")
@RequiredArgsConstructor
public class PublicPortfolioController {

    private final PortfolioDetailsService portfolioDetailsService;

    @GetMapping
    public ResponseEntity<PortfolioDetailsDto> getPortfolioDetails() {
        return ResponseEntity.ok(portfolioDetailsService.getPortfolioDetails());
    }
}
