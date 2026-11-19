package com.pandiji.elms.auth.impl;

import com.pandiji.elms.auth.AuthResponse;
import com.pandiji.elms.auth.AuthService;
import com.pandiji.elms.auth.LoginRequest;
import com.pandiji.elms.auth.RegisterRequest;
import com.pandiji.elms.dto.UserInfoDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.repository.EmployeeRepository;
import com.pandiji.elms.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public Employee register(RegisterRequest request) {

        if (employeeRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .department(request.getDepartment())
                .role("EMPLOYEE")
                .build();

        return employeeRepository.save(employee);
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                employee.getPassword())) {

            throw new RuntimeException("Invalid Credentials");
        }
        String token = jwtService.generateToken(employee.getEmail());
        return new AuthResponse(token);
    }

    @Override
    public UserInfoDto getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();
        System.out.println("EMAIL FROM TOKEN = " + email);


        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User Not Found"));

        return new UserInfoDto(
                employee.getName(),
                employee.getEmail(),
                employee.getRole()
        );
    }
}