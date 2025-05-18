package com.fungiflow.backend1.repo;


import com.fungiflow.backend1.model.Seed;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeedRepository extends JpaRepository<Seed, Long> {
    List<Seed> findByCultivationCompleteFalse();
}
