package com.example1.fungiflow.repository;

import com.example1.fungiflow.model.DailyUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyUpdateRepository extends JpaRepository<DailyUpdate, Long> {
    List<DailyUpdate> findBySeedId(Long seedId);
}
