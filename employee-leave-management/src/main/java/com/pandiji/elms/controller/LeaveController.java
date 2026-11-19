package com.pandiji.elms.controller;

import com.pandiji.elms.dto.CommentRequest;
import com.pandiji.elms.dto.LeaveRequestDto;
import com.pandiji.elms.dto.LeaveResponseDto;
import com.pandiji.elms.dto.ManagerLeaveDto;
import com.pandiji.elms.entity.LeaveRequest;
import com.pandiji.elms.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaves")
@RequiredArgsConstructor
public class LeaveController {

    private final LeaveService leaveService;

    @PostMapping("/apply")
    public LeaveRequest applyLeave(
            @RequestBody LeaveRequestDto request) {

        return leaveService.applyLeave(request);
    }

    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return leaveService.getAllLeaves();
    }

    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getEmployeeLeaves(
            @PathVariable Long employeeId) {

        return leaveService.getEmployeeLeaves(employeeId);
    }

    @PutMapping("/{leaveId}/approve")
    public LeaveRequest approveLeave(
            @PathVariable Long leaveId,
            @RequestBody CommentRequest request) {

        return leaveService.approveLeave(leaveId, request.getComment());
    }

    @PutMapping("/{leaveId}/reject")
    public LeaveRequest rejectLeave(@PathVariable Long leaveId,
            @RequestBody CommentRequest request) {

        return leaveService.rejectLeave(leaveId, request.getComment());
    }

    @GetMapping("/mine")
    public List<LeaveResponseDto> getMyLeaves() {

        return leaveService.getMyLeaves();
    }

    @GetMapping("/manager")
    public List<ManagerLeaveDto> getAllLeaveRequests() {

        return leaveService.getAllLeaveRequests();
    }
}