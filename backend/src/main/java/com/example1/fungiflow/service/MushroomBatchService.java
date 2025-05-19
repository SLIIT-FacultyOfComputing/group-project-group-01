package com.example1.fungiflow.service;

import com.example1.fungiflow.dto.BatchDTO;
import com.example1.fungiflow.dto.MaterialRequestDTO;
import com.example1.fungiflow.dto.SeedCreationDTO;
import com.example1.fungiflow.dto.ContaminationStatDTO;
import com.example1.fungiflow.model.InventoryItem;
import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.model.Seed.MushroomType;
import com.example1.fungiflow.repository.InventoryRepository;
import com.example1.fungiflow.repository.SeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
public class MushroomBatchService {

    @Autowired
    private SeedRepository seedRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    // Create a new seed batch and deduct raw materials
    @Transactional
    public Seed createSeedBatch(SeedCreationDTO dto) {
        List<MaterialRequestDTO> requests = dto.getMaterialRequests();

        if (requests == null || requests.isEmpty()) {
            throw new IllegalArgumentException("Material requests must not be null or empty.");
        }

        for (MaterialRequestDTO req : requests) {
            InventoryItem item = inventoryRepository.findByMaterialType(req.getMaterialType());
            if (item == null || item.getQuantity() < req.getQuantity()) {
                throw new RuntimeException("Not enough material: " + req.getMaterialType());
            }
            item.setQuantity(item.getQuantity() - req.getQuantity());
            inventoryRepository.save(item);
        }

        Seed seed = new Seed();
        seed.setCultivationStartDate(LocalDate.now());
        seed.setType(dto.getType());
        seed.setInitialQuantity(dto.getInitialQuantity());
        seed.setCultivationComplete(false);

        return seedRepository.save(seed);
    }

    // Auto contaminate stale batches (more than 3 days without update and incomplete)
    @Transactional
    public void autoRemoveContaminated() {
        List<Seed> incompleteBatches = seedRepository.findByCultivationCompleteFalse();
        for (int i = 0; i < incompleteBatches.size(); i++) {
            Seed seed = incompleteBatches.get(i);
            LocalDate lastUpdate = seed.getCultivationEndDate();
            if (lastUpdate == null && seed.getCultivationStartDate().isBefore(LocalDate.now().minusDays(3))) {
                int pending = seed.getInitialQuantity() - seed.getSuccessfulGrowth() - seed.getContaminatedCount();
                seed.setContaminatedCount(seed.getContaminatedCount() + pending);
                seed.setCultivationComplete(true);
                seed.setCultivationEndDate(LocalDate.now());
                seedRepository.save(seed);
            }
        }
    }

    // Check if a batch has over 50% contamination and flag it
    @Transactional
    public void checkContaminationThreshold(Seed seed) {
        int total = seed.getInitialQuantity();
        if (total == 0) return;

        int contaminated = seed.getContaminatedCount();
        double ratio = (double) contaminated / total;

        if (ratio > 0.5) {
            seed.setCultivationComplete(true);
            seed.setCultivationEndDate(LocalDate.now());
            seedRepository.save(seed);
        }
    }

    // Calculate contamination statistics per mushroom type
    public List<ContaminationStatDTO> getContaminationStatsPerType() {
        List<Seed> allSeeds = seedRepository.findAll();
        Map<MushroomType, List<Seed>> groupedByType = new HashMap<>();

        for (int i = 0; i < allSeeds.size(); i++) {
            Seed seed = allSeeds.get(i);
            MushroomType type = seed.getType();

            if (!groupedByType.containsKey(type)) {
                groupedByType.put(type, new ArrayList<>());
            }
            groupedByType.get(type).add(seed);
        }

        List<ContaminationStatDTO> stats = new ArrayList<>();
        for (Map.Entry<MushroomType, List<Seed>> entry : groupedByType.entrySet()) {
            MushroomType type = entry.getKey();
            List<Seed> seeds = entry.getValue();

            int totalBatches = seeds.size();
            int totalContaminated = 0;

            for (int i = 0; i < seeds.size(); i++) {
                Seed seed = seeds.get(i);
                int initialQty = seed.getInitialQuantity();
                if (initialQty > 0) {
                    totalContaminated += seed.getContaminatedCount();
                }
            }

            int totalInitial = 0;
            for (int i = 0; i < seeds.size(); i++) {
                totalInitial += seeds.get(i).getInitialQuantity();
            }

            double contaminationRate = (totalInitial == 0) ? 0 : ((double) totalContaminated / totalInitial) * 100.0;
            stats.add(new ContaminationStatDTO(type, totalBatches, totalContaminated, contaminationRate));
        }

        return stats;
    }
}
