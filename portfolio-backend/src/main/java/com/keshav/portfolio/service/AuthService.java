package com.keshav.portfolio.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.keshav.portfolio.dto.LoginRequest;
import com.keshav.portfolio.dto.LoginResponse;
import com.keshav.portfolio.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword()));
        String token = jwtUtil.generateToken(request.getUsername());
        return new LoginResponse(token, request.getUsername(), "Login successful");
    }
}

