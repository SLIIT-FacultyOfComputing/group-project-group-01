package com.fungiflow.backend1.repo;

import java.util.List;
import java.util.Optional;

import com.fungiflow.backend1.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> {
    Optional<Stock> findByMaterial(String material);
    // Added method to fetch all stock items with stock quantity less than threshold
    List<Stock> findByStockLessThan(int threshold);
}

