package com.pandiji.elms.auth;

import com.pandiji.elms.dto.UserInfoDto;
import com.pandiji.elms.entity.Employee;
import org.springframework.security.core.context.SecurityContextHolder;

public interface AuthService {

    Employee register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserInfoDto getCurrentUser();
}