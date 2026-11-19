package com.pandiji.elms.service.impl;

import com.pandiji.elms.dto.DashboardStatsDto;
import com.pandiji.elms.dto.EmployeeDashboardDto;
import com.pandiji.elms.dto.ManagerDashboardDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.entity.LeaveBalance;
import com.pandiji.elms.repository.EmployeeRepository;
import com.pandiji.elms.repository.LeaveBalanceRepository;
import com.pandiji.elms.repository.LeaveRequestRepository;
import com.pandiji.elms.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final LeaveRequestRepository repository;
    private final EmployeeRepository employeeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    @Override
    public DashboardStatsDto getStats() {

        long pending =
                repository.countByStatus("PENDING");

        long approved =
                repository.countByStatus("APPROVED");

        long rejected =
                repository.countByStatus("REJECTED");

        long total =
                pending + approved + rejected;

        return new DashboardStatsDto(
                total,
                pending,
                approved,
                rejected
        );
    }
    @Override
    public EmployeeDashboardDto getEmployeeDashboard() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Employee not found"));

        LeaveBalance balance =
                leaveBalanceRepository
                        .findByEmployee(employee)
                        .orElseThrow(() ->
                                new RuntimeException("Leave balance not found"));

        return new EmployeeDashboardDto(

                repository.countByEmployee(employee),

                repository.countByEmployeeAndStatus(
                        employee,
                        "APPROVED"),

                repository.countByEmployeeAndStatus(
                        employee,
                        "PENDING"),

                repository.countByEmployeeAndStatus(
                        employee,
                        "REJECTED"),

                balance.getCasualLeave(),

                balance.getSickLeave(),

                balance.getEarnedLeave()
        );
    }

    @Override
    public ManagerDashboardDto getManagerDashboard() {

        return new ManagerDashboardDto(

                repository.countByStatus("PENDING"),

                repository.countByStatus("APPROVED"),

                repository.countByStatus("REJECTED")
        );
    }
}