package com.pandiji.elms.auth;

import com.pandiji.elms.dto.UserInfoDto;
import com.pandiji.elms.entity.Employee;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public Employee register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/me")
    public UserInfoDto getCurrentUser() {

        return authService.getCurrentUser();
    }
}