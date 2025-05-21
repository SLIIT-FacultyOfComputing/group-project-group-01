package com.grp1.mush.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.grp1.mush.model.Stock;

@Repository
public interface StockRepo extends JpaRepository<Stock, Long> {
    Optional<Stock> findByMaterial(String material);
}
