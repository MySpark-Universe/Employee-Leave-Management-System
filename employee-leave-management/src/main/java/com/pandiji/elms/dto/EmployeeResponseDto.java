package com.pandiji.elms.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponseDto {

    private Long id;
    private String name;
    private String email;
    private String role;
    private String department;
    private boolean active;
}