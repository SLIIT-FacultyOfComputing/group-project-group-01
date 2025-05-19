package com.example1.fungiflow.repository;

import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.model.Seed.MushroomType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeedRepository extends JpaRepository<Seed, Long> {
    List<Seed> findByCultivationCompleteFalse();
    List<Seed> findByType(MushroomType type);
}
