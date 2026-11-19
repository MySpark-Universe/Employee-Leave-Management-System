package com.pandiji.elms.controller;

import com.pandiji.elms.dto.EmployeeRequest;
import com.pandiji.elms.dto.EmployeeResponseDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public Employee createEmployee(@Valid @RequestBody EmployeeRequest request) {

        return employeeService.createEmployee(request);
    }

    @GetMapping
    public List<EmployeeResponseDto> getAllEmployees() {

        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeResponseDto getEmployeeById(
            @PathVariable Long id) {

        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}/deactivate")
    public String deleteEmployee(
            @PathVariable Long id) {

        employeeService.deactivateEmployee(id);

        return "Employee Deactivated Successfully";
    }
}
