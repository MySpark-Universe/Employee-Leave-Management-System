package com.pandiji.elms.service;

import com.pandiji.elms.dto.LeaveRequestDto;
import com.pandiji.elms.dto.LeaveResponseDto;
import com.pandiji.elms.dto.ManagerLeaveDto;
import com.pandiji.elms.entity.LeaveRequest;

import java.util.List;

public interface LeaveService {

    LeaveRequest applyLeave(
            LeaveRequestDto request);
    List<LeaveRequest> getAllLeaves();

    List<LeaveRequest> getEmployeeLeaves(Long employeeId);

    List<LeaveResponseDto> getMyLeaves();

    List<ManagerLeaveDto> getAllLeaveRequests();

    LeaveRequest approveLeave(Long leaveId, String comment);

    LeaveRequest rejectLeave(Long leaveId, String comment);
}