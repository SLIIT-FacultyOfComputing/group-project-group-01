package com.firsttest.test.repository;

import com.firsttest.test.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalesRepository extends JpaRepository<Sales, Long> {

}

