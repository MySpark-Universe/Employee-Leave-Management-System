package com.pandiji.elms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ManagerDashboardDto {

    private long pendingRequests;
    private long approvedRequests;
    private long rejectedRequests;
}