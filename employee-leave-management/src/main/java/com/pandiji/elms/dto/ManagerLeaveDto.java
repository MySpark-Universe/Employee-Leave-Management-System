package com.pandiji.elms.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ManagerLeaveDto {

    private Long id;
    private String employeeName;
    private String leaveType;
    private String status;
    private String startDate;
    private String endDate;
    private String reason;
}