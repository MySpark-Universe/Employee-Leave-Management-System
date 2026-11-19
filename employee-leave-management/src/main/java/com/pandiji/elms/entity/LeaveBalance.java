package com.pandiji.elms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "leave_balances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaveBalance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int casualLeave;

    private int sickLeave;

    private int earnedLeave;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}