package com.example1.fungiflow.service;


import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.repository.SeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class CultivationService {

    @Autowired
    private SeedRepository seedRepository;

    // This method runs every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void checkCultivationProgress() {
        List<Seed> activeBatches = seedRepository.findByCultivationCompleteFalse();
        for (Seed batch : activeBatches) {
            int daysElapsed = (int) ChronoUnit.DAYS.between(
                    batch.getCultivationStartDate(),
                    LocalDate.now()
            );
            if (daysElapsed >= batch.getType().growthDays) {
                calculateFinalYield(batch);
            }
        }
    }

    private void calculateFinalYield(Seed batch) {
        int total = batch.getSuccessfulGrowth() + batch.getContaminatedCount();
        int unaccounted = batch.getInitialQuantity() - total;
        batch.setContaminatedCount(batch.getContaminatedCount() + unaccounted);
        batch.setCultivationComplete(true);
        seedRepository.save(batch);
        // You can add report generation here if needed
    }
}

