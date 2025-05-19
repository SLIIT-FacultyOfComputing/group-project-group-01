package com.example1.fungiflow.service;

import com.example1.fungiflow.dto.DailyUpdateDTO;
import com.example1.fungiflow.dto.AllocationDTO;
import com.example1.fungiflow.model.*;
import com.example1.fungiflow.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class LabManagementService {

    @Autowired
    private SeedRepository seedRepository;

    @Autowired
    private DailyUpdateRepository dailyUpdateRepository;

    @Autowired
    private AllocationRepository allocationRepository;

    @Transactional
    //recording daily update from a mushroom batch
    public void recordDailyUpdate(DailyUpdateDTO dto) {
        //throwing exception when the seed batch id is not found
        Optional<Seed> optionalSeed = seedRepository.findById(dto.getSeedId());
        if (!optionalSeed.isPresent()) {
            throw new RuntimeException("Batch not found");
        }

        Seed seed = optionalSeed.get();

        //calculating the amount of cultures that are yet to be observed.
        int remaining = seed.getInitialQuantity()
                - (seed.getSuccessfulGrowth() + seed.getContaminatedCount());

        //exception to make sure today's input doesn't exceed teh remaing cultures
        if (dto.getSuccessfulToday() + dto.getContaminatedToday() > remaining) {
            throw new IllegalArgumentException("Exceeds remaining cultures: " + remaining);
        }

        //creating and saving today's daily update
        DailyUpdate update = new DailyUpdate();
        update.setSeed(seed);
        update.setDate(LocalDate.now());
        update.setSuccessfulToday(dto.getSuccessfulToday());
        update.setContaminatedToday(dto.getContaminatedToday());
        update.setContaminationReason(dto.getContaminationReason());

        //updating the total successful and contaminated rates
        seed.setSuccessfulGrowth(seed.getSuccessfulGrowth() + dto.getSuccessfulToday());
        seed.setContaminatedCount(seed.getContaminatedCount() + dto.getContaminatedToday());

        dailyUpdateRepository.save(update);
        seedRepository.save(seed);
    }

    @Transactional
    //handles the allocation of succesful cultures to sales and production
    public void allocateCultures(AllocationDTO dto) {

        // //throwing exception when the seed batch id is not found
        Optional<Seed> optionalSeed = seedRepository.findById(dto.getSeedId());
        if (!optionalSeed.isPresent()) {
            throw new RuntimeException("Batch not found");
        }

        Seed seed = optionalSeed.get();

        //get the total allocation amount make sure it doesn't exceed the grown batches
        int totalAllocation = dto.getSalesCenterQty() + dto.getProductionQty();
        if (totalAllocation > seed.getSuccessfulGrowth()) {
            throw new IllegalArgumentException("Allocation exceeds successful cultures");
        }

        //f allocation already exists for this batch, update it If not, we make a new one.
        Optional<Allocation> optionalAllocation = allocationRepository.findBySeedId(seed.getId());
        Allocation allocation;

        if (optionalAllocation.isPresent()) {
            allocation = optionalAllocation.get();
        } else {
            allocation = new Allocation();
        }

        //store allocation data in dbs
        allocation.setSeed(seed);
        allocation.setSalesCenterQty(dto.getSalesCenterQty());
        allocation.setProductionQty(dto.getProductionQty());

        allocationRepository.save(allocation);
    }
}
