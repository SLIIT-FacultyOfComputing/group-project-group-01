package com.fungiflow.backend1.service;


import com.fungiflow.backend1.dto.EmployeeDTO;
import com.fungiflow.backend1.model.Employee;
import com.fungiflow.backend1.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    public EmployeeDTO addEmployee(EmployeeDTO dto) {
        validateNICAndPhone(dto);
        Employee employee = dtoToEntity(dto);
        return entityToDTO(employeeRepo.save(employee));
    }

    // Method to fetch all employees
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepo.findAll()
                .stream()
                .map(this::entityToDTO)
                .collect(Collectors.toList());
    }

    // Method to delete an employee by ID
    public void deleteEmployee(Long id) {
        employeeRepo.deleteById(id);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee existing = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        validateNICAndPhone(dto);
        existing.setName(dto.getName());
        existing.setNic(dto.getNic());
        existing.setPhone(dto.getPhone());
        existing.setAddress(dto.getAddress());
        existing.setSex(dto.getSex());
        existing.setRole(dto.getRole());

        return entityToDTO(employeeRepo.save(existing));
    }

    // Validate NIC and phone number formats
    private void validateNICAndPhone(EmployeeDTO dto) {
        // Check if phone is null or empty
        if (dto.getPhone() == null || dto.getPhone().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required");
        }

        // Validate the phone number format (must be 10 digits)
        if (!dto.getPhone().matches("^\\d{10}$")) {
            throw new IllegalArgumentException("Phone number must be 10 digits");
        }

        // Validate NIC number format
        if (!dto.getNic().matches("^(\\d{9}[vV]|\\d{12})$")) {
            throw new IllegalArgumentException("Invalid NIC number");
        }
    }

    private Employee dtoToEntity(EmployeeDTO dto) {
        return Employee.builder()
                .id(dto.getId())
                .name(dto.getName())
                .nic(dto.getNic())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .sex(dto.getSex())
                .role(dto.getRole())
                .build();
    }

    private EmployeeDTO entityToDTO(Employee emp) {
        return EmployeeDTO.builder()
                .id(emp.getId())
                .name(emp.getName())
                .nic(emp.getNic())
                .phone(emp.getPhone())
                .address(emp.getAddress())
                .sex(emp.getSex())
                .role(emp.getRole())
                .build();
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Optional<Employee> employee = employeeRepo.findById(id);
        if (employee.isPresent()) {
            return entityToDTO(employee.get());
        }
        throw new RuntimeException("Employee not found");
    }
}
