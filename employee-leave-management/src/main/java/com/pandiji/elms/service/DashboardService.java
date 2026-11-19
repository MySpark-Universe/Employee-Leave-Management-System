package com.pandiji.elms.service;

import com.pandiji.elms.dto.DashboardStatsDto;
import com.pandiji.elms.dto.EmployeeDashboardDto;
import com.pandiji.elms.dto.ManagerDashboardDto;

public interface DashboardService {

    DashboardStatsDto getStats();
    EmployeeDashboardDto getEmployeeDashboard();
    ManagerDashboardDto getManagerDashboard();
}