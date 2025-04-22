package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepo extends JpaRepository<Sale, Long> {

    @Query("SELECT s.name, FUNCTION('MONTH', s.date), SUM(s.amount) FROM Sale s GROUP BY s.name, FUNCTION('MONTH', s.date)")
    List<Object[]> getMonthlySalesSummary();
}
