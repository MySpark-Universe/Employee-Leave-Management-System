package com.pandiji.elms.service.impl;

import com.pandiji.elms.dto.LeaveBalanceResponseDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.entity.LeaveBalance;
import com.pandiji.elms.repository.EmployeeRepository;
import com.pandiji.elms.repository.LeaveBalanceRepository;
import com.pandiji.elms.service.LeaveBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeaveBalanceServiceImpl
        implements LeaveBalanceService {

    private final EmployeeRepository employeeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    @Override
    public LeaveBalanceResponseDto getMyBalance() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        Employee employee = employeeRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));

        LeaveBalance leaveBalance =
                leaveBalanceRepository
                        .findByEmployee(employee)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Balance Not Found"));

        return new LeaveBalanceResponseDto(
                leaveBalance.getCasualLeave(),
                leaveBalance.getSickLeave(),
                leaveBalance.getEarnedLeave()
        );
    }
}