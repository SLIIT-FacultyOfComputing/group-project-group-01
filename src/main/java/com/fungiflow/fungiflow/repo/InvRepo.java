package com.fungiflow.fungiflow.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fungiflow.fungiflow.model.Inv;

@Repository
public interface InvRepo extends JpaRepository<Inv, Long>{   
    @Query("SELECT COALESCE(SUM(i.Used_stock), 0) FROM Inv i WHERE i.material = :material")
    int getTotalUsageByName(@Param("material") String material);

    List<Inv> findByUsageType(String usageType);    
}
