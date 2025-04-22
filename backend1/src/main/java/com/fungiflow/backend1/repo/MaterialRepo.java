package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepo extends JpaRepository<Material, Long> {
    List<Material> findByQuantityLessThan(int threshold);
}
