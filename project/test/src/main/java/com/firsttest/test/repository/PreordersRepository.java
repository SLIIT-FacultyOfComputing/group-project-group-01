package com.firsttest.test.repository;

import com.firsttest.test.entity.Preorders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreordersRepository extends JpaRepository<Preorders, Long> {
    @Query("SELECT p.product_name, SUM(p.quantity) FROM Preorders p GROUP BY p.product_name")
    List<Object[]> TotalPreorders();
}



