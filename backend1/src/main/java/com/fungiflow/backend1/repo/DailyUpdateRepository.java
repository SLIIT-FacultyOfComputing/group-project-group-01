package com.fungiflow.backend1.repo;

import com.fungiflow.backend1.model.DailyUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DailyUpdateRepository extends JpaRepository<DailyUpdate, Long> {
    List<DailyUpdate> findBySeedId(Long seedId);
}

