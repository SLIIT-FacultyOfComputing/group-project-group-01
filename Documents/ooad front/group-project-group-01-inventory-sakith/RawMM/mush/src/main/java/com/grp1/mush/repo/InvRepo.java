package com.grp1.mush.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.grp1.mush.model.Inv;

@Repository
public interface InvRepo extends JpaRepository<Inv, Long>{   
    @Query("SELECT COALESCE(SUM(i.Used_stock), 0) FROM Inv i WHERE i.material = :material")
    int getTotalUsageByName(@Param("material") String material);
}
