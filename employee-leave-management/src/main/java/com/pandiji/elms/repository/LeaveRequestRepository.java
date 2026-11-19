package com.pandiji.elms.repository;

import com.pandiji.elms.entity.Employee;
import com.pandiji.elms.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRequestRepository
        extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmployee(Employee employee);

    long countByStatus(String status);
    long countByEmployee(Employee employee);

    long countByEmployeeAndStatus(
            Employee employee,
            String status);
}