package com.example1.fungiflow.controller;

import com.example1.fungiflow.dto.ContaminationStatDTO;
import com.example1.fungiflow.dto.SeedCreationDTO;
import com.example1.fungiflow.model.InventoryItem;
import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.repository.SeedRepository;
import com.example1.fungiflow.service.InventoryService;
import com.example1.fungiflow.service.MushroomBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/seeds")
public class SeedController {

    @Autowired
    private SeedRepository seedRepository;

    @Autowired
    private MushroomBatchService mushroomBatchService;
    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/stats")
    public Map<String, Object> getBatchesStats() {
        List<Seed> all = seedRepository.findAll();
        int total = all.size();
        int active = (int) all.stream().filter(seed -> !seed.isCultivationComplete()).count();
        int completed = total - active;
        int totalInitial = all.stream().mapToInt(Seed::getInitialQuantity).sum();
        int totalSuccess = all.stream().mapToInt(Seed::getSuccessfulGrowth).sum();
        int successRate = totalInitial > 0 ? (int) Math.round((totalSuccess * 100.0) / totalInitial) : 0;

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("active", active);
        stats.put("completed", completed);
        stats.put("successRate", successRate);
        return stats;
    }

    @GetMapping
    public List<Seed> getAllSeeds() {
        return seedRepository.findAll();
    }

    @PostMapping("/create")
    public Seed createSeed(@RequestBody SeedCreationDTO dto) {
        return mushroomBatchService.createSeedBatch(dto);
    }

    @PutMapping("/{id}/update")
    public Seed updateSeedProgress(@PathVariable Long id, @RequestBody Seed update) {
        Seed seed = seedRepository.findById(id).orElseThrow();
        seed.setSuccessfulGrowth(update.getSuccessfulGrowth());
        seed.setContaminatedCount(update.getContaminatedCount());
        return seedRepository.save(seed);
    }

    @GetMapping("/contamination-report")
    public List<ContaminationStatDTO> getContaminationReport() {
        return mushroomBatchService.getContaminationStatsPerType();
    }

}
