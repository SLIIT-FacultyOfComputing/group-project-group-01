package com.grp1.mush.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.grp1.mush.model.Raw;

@Repository
public interface RawRepo extends JpaRepository<Raw, Long> {
     @Query("SELECT COALESCE(SUM(r.stock), 0) FROM Raw r WHERE r.material = :material")
    int getTotalRawStockByName(@Param("material") String material);
}

