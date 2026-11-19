package com.pandiji.elms.controller;

import com.pandiji.elms.dto.LeaveBalanceResponseDto;
import com.pandiji.elms.service.LeaveBalanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leave-balance")
@RequiredArgsConstructor
public class LeaveBalanceController {

    private final LeaveBalanceService leaveBalanceService;

    @GetMapping
    public LeaveBalanceResponseDto getMyBalance() {

        return leaveBalanceService.getMyBalance();
    }
}