package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepo extends JpaRepository<Report, Long> {
}
