// MaterialRequestRepository.java
package com.example1.fungiflow.repository;

import com.example1.fungiflow.model.MaterialRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRequestRepository extends JpaRepository<MaterialRequest, Long> {
}
