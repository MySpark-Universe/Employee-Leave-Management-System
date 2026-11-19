package com.pandiji.elms.service.impl;

import com.pandiji.elms.dto.LeaveRequestDto;
import com.pandiji.elms.dto.LeaveResponseDto;
import com.pandiji.elms.dto.ManagerLeaveDto;
import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.entity.LeaveBalance;
import com.pandiji.elms.entity.LeaveRequest;
import com.pandiji.elms.repository.EmployeeRepository;
import com.pandiji.elms.repository.LeaveBalanceRepository;
import com.pandiji.elms.repository.LeaveRequestRepository;
import com.pandiji.elms.service.LeaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaveServiceImpl implements LeaveService {

    private final LeaveRequestRepository leaveRequestRepository;
    private final EmployeeRepository employeeRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;

    @Override
    public LeaveRequest applyLeave(
            LeaveRequestDto request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Employee Not Found"));

        LeaveRequest leaveRequest =
                LeaveRequest.builder()
                        .leaveType(request.getLeaveType())
                        .startDate(request.getStartDate())
                        .endDate(request.getEndDate())
                        .reason(request.getReason())
                        .status("PENDING")
                        .employee(employee)
                        .build();

        return leaveRequestRepository.save(
                leaveRequest);
    }

    @Override
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }

    @Override
    public LeaveRequest approveLeave(Long leaveId,
                                     String comment) {

        LeaveRequest leaveRequest =
                leaveRequestRepository.findById(leaveId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Request Not Found"));

        if ("APPROVED".equalsIgnoreCase(
                leaveRequest.getStatus())) {

            throw new RuntimeException(
                    "Leave Already Approved");
        }

        LeaveBalance balance =
                leaveBalanceRepository
                        .findByEmployee(
                                leaveRequest.getEmployee())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Leave Balance Not Found"));

        long days =
                ChronoUnit.DAYS.between(
                        leaveRequest.getStartDate(),
                        leaveRequest.getEndDate()
                ) + 1;

        switch (leaveRequest
                .getLeaveType()
                .toUpperCase()) {

            case "CASUAL" -> {
                if (balance.getCasualLeave() <= 0) {
                    throw new RuntimeException(
                            "No Casual Leave Remaining");
                }

                balance.setCasualLeave(
                        balance.getCasualLeave() - (int)days);
            }

            case "SICK" -> {
                if (balance.getSickLeave() <= 0) {
                    throw new RuntimeException(
                            "No Sick Leave Remaining");
                }

                balance.setSickLeave(
                        balance.getSickLeave() - (int)days);
            }

            case "EARNED" -> {
                if (balance.getEarnedLeave() <= 0) {
                    throw new RuntimeException(
                            "No Earned Leave Remaining");
                }

                balance.setEarnedLeave(
                        balance.getEarnedLeave() - (int)days);
            }

            default ->
                    throw new RuntimeException(
                            "Invalid Leave Type");
        }

        leaveBalanceRepository.save(balance);

        leaveRequest.setStatus("APPROVED");
        leaveRequest.setManagerComment(comment);

        return leaveRequestRepository
                .save(leaveRequest);
    }

    @Override
    public LeaveRequest rejectLeave(Long leaveId, String comment) {

        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() ->
                        new RuntimeException("Leave Request Not Found"));

        leaveRequest.setStatus("REJECTED");
        leaveRequest.setManagerComment(comment);

        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getEmployeeLeaves(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee Not Found"));

        return leaveRequestRepository.findByEmployee(employee);
    }

    @Override
    public List<LeaveResponseDto> getMyLeaves() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        Employee employee =
                employeeRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("Employee Not Found"));

        return leaveRequestRepository
                .findByEmployee(employee)
                .stream()
                .map(leave -> LeaveResponseDto.builder()
                        .id(leave.getId())
                        .leaveType(leave.getLeaveType())
                        .startDate(leave.getStartDate())
                        .endDate(leave.getEndDate())
                        .reason(leave.getReason())
                        .status(leave.getStatus())
                        .managerComment(leave.getManagerComment())
                        .build())
                .toList();
    }

    @Override
    public List<ManagerLeaveDto> getAllLeaveRequests() {

        return leaveRequestRepository
                .findAll()
                .stream()
                .map(leave ->
                        ManagerLeaveDto.builder()
                                .id(leave.getId())
                                .employeeName(
                                        leave.getEmployee().getName())
                                .leaveType(
                                        leave.getLeaveType())
                                .status(
                                        leave.getStatus())
                                .startDate(
                                        leave.getStartDate().toString())
                                .endDate(
                                        leave.getEndDate().toString())
                                .reason(
                                        leave.getReason())
                                .build())
                .toList();
    }
}