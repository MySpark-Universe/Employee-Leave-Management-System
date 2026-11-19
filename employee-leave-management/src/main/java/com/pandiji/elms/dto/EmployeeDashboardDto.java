package com.pandiji.elms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeDashboardDto {

    private long totalLeaves;
    private long approvedLeaves;
    private long pendingLeaves;
    private long rejectedLeaves;

    private int casualLeave;
    private int sickLeave;
    private int earnedLeave;
}