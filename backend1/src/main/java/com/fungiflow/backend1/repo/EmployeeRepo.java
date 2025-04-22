package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {
}
