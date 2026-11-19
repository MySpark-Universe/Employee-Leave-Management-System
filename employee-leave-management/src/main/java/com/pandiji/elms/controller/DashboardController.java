package com.pandiji.elms.controller;

import com.pandiji.elms.dto.DashboardStatsDto;
import com.pandiji.elms.dto.EmployeeDashboardDto;
import com.pandiji.elms.dto.ManagerDashboardDto;
import com.pandiji.elms.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {
        return dashboardService.getStats();
    }

    @GetMapping("/employee")
    public EmployeeDashboardDto getEmployeeDashboard() {

        return dashboardService.getEmployeeDashboard();
    }

    @GetMapping("/manager")
    public ManagerDashboardDto getManagerDashboard() {

        return dashboardService.getManagerDashboard();
    }
}