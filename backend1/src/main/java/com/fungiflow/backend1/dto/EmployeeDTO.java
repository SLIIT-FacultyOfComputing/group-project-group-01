package com.fungiflow.backend1.dto;

import com.fungiflow.backend1.model.Employee;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {

    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String nic;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;

    private Employee.Sex sex;
    private Employee.Role role;
}
