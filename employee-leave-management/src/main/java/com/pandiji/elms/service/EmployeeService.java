package com.pandiji.elms.service;

import com.pandiji.elms.dto.EmployeeRequest;
import com.pandiji.elms.dto.EmployeeResponseDto;
import com.pandiji.elms.entity.Employee;

import java.util.List;

public interface EmployeeService {

    Employee createEmployee(EmployeeRequest request);

    List<EmployeeResponseDto> getAllEmployees();

    EmployeeResponseDto getEmployeeById(Long id);

    void deactivateEmployee(Long id);
}