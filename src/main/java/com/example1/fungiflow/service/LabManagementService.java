package com.example1.fungiflow.service;

import com.example1.fungiflow.dto.DailyUpdateDTO;
import com.example1.fungiflow.dto.AllocationDTO;
import com.example1.fungiflow.model.*;
import com.example1.fungiflow.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;


@Service
public class LabManagementService {

    @Autowired
    private SeedRepository seedRepository;

    @Autowired
    private DailyUpdateRepository dailyUpdateRepository;

    @Autowired
    private AllocationRepository allocationRepository;

    @Transactional
    public void recordDailyUpdate(DailyUpdateDTO dto) {
        Seed seed = seedRepository.findById(dto.getSeedId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        int remaining = seed.getInitialQuantity() -
                (seed.getSuccessfulGrowth() + seed.getContaminatedCount());

        if (dto.getSuccessfulToday() + dto.getContaminatedToday() > remaining) {
            throw new IllegalArgumentException("Exceeds remaining cultures: " + remaining);
        }

        DailyUpdate update = new DailyUpdate();
        update.setSeed(seed);
        update.setDate(LocalDate.now());
        update.setSuccessfulToday(dto.getSuccessfulToday());
        update.setContaminatedToday(dto.getContaminatedToday());
        update.setContaminationReason(dto.getContaminationReason());

        seed.setSuccessfulGrowth(seed.getSuccessfulGrowth() + dto.getSuccessfulToday());
        seed.setContaminatedCount(seed.getContaminatedCount() + dto.getContaminatedToday());

        dailyUpdateRepository.save(update);
        seedRepository.save(seed);
    }

    @Transactional
    public void allocateCultures(AllocationDTO dto) {
        Seed seed = seedRepository.findById(dto.getSeedId())
                .orElseThrow(() -> new RuntimeException("Batch not found"));

        if (dto.getSalesCenterQty() + dto.getBranchesQty() + dto.getProductionQty() > seed.getSuccessfulGrowth()) {
            throw new IllegalArgumentException("Allocation exceeds successful cultures");
        }

        Allocation allocation = allocationRepository.findBySeedId(seed.getId())
                .orElse(new Allocation());

        allocation.setSeed(seed);
        allocation.setSalesCenterQty(dto.getSalesCenterQty());
        allocation.setBranchesQty(dto.getBranchesQty());
        allocation.setProductionQty(dto.getProductionQty());

        allocationRepository.save(allocation);
    }
}
