package com.pandiji.elms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaveBalanceResponseDto {

    private int casualLeave;
    private int sickLeave;
    private int earnedLeave;
}