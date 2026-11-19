package com.pandiji.elms.service.impl;

import com.pandiji.elms.dto.EmployeeRequest;
import com.pandiji.elms.dto.EmployeeResponseDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.repository.EmployeeRepository;
import com.pandiji.elms.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Employee createEmployee(EmployeeRequest request) {

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
    public List<EmployeeResponseDto> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(employee -> EmployeeResponseDto
                        .builder()
                        .id(employee.getId())
                        .name(employee.getName())
                        .email(employee.getEmail())
                        .role(employee.getRole())
                        .department(employee.getDepartment())
                        .build())
                .toList();
    }

    @Override
    public EmployeeResponseDto getEmployeeById(Long id) {

        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));

        return EmployeeResponseDto.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .role(employee.getRole())
                .department(employee.getDepartment())
                .build();
    }

    public void deactivateEmployee(Long id) {

        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));

        employee.setActive(false);

        employeeRepository.save(employee);
    }
}