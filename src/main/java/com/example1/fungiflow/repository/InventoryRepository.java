package com.example1.fungiflow.repository;

import com.example1.fungiflow.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByQuantityLessThanEqual(int threshold);
    InventoryItem findByMaterialType(InventoryItem.MaterialType materialType);
}
