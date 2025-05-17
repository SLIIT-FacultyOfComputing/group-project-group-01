package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleRepo extends JpaRepository<Sale, Long> {

    // Change the query to return Long for quantity
    @Query("SELECT s.productName, FUNCTION('MONTH', s.date), SUM(s.quantity) FROM Sale s GROUP BY s.productName, FUNCTION('MONTH', s.date)")
    List<Object[]> getMonthlySalesSummary();
}
