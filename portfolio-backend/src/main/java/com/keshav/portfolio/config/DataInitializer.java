package com.keshav.portfolio.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.keshav.portfolio.entity.AdminUser;
import com.keshav.portfolio.repository.AdminUserRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.default.username}")
    private String defaultUsername;

    @Value("${admin.default.password}")
    private String defaultPassword;

    @Value("${admin.default.email}")
    private String defaultEmail;

    @Override
    public void run(String... args) {
        // Enforce Admin credentials
        var adminOpt = adminUserRepository.findByUsername(defaultUsername);
        if (adminOpt.isEmpty()) {
            AdminUser admin = AdminUser.builder()
                    .username(defaultUsername)
                    .password(passwordEncoder.encode(defaultPassword))
                    .email(defaultEmail)
                    .build();
            adminUserRepository.save(admin);
            System.out.println("✅ Admin user created: username=" + defaultUsername);
        } else {
            AdminUser admin = adminOpt.get();
            admin.setPassword(passwordEncoder.encode(defaultPassword));
            adminUserRepository.save(admin);
            System.out.println("✅ Admin user password synchronized successfully!");
        }
    }
}
