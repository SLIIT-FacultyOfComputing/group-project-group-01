package com.firsttest.test.repository;

import com.firsttest.test.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllocationRepository extends JpaRepository<Allocation, Long> {
}
