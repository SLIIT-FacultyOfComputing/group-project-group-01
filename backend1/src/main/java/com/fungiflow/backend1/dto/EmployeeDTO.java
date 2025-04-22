package com.fungiflow.backend1.dto;
import com.fungiflow.backend1.model.Employee;
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
    private String name;
    private String nic;
    private String phone;
    private String address;
    private Employee.Sex sex;
    private Employee.Role role;
}