package com.example1.fungiflow.controller;

import com.example1.fungiflow.dto.SeedCreationDTO;
import com.example1.fungiflow.dto.ContaminationStatDTO;
import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.service.MushroomBatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/batches")
public class MushroomBatchController {

    @Autowired
    private MushroomBatchService batchService;

    // Create seed batch and deduct materials
    @PostMapping("/create")
    public Seed createBatch(@RequestBody SeedCreationDTO dto) {
        return batchService.createSeedBatch(dto);
    }

    // Get contamination statistics per type
    @GetMapping("/contamination-stats")
    public List<ContaminationStatDTO> getStats() {
        return batchService.getContaminationStatsPerType();
    }

    // Trigger auto-removal of stale batches (can be a scheduled task too)
    @PostMapping("/auto-remove-contaminated")
    public void autoRemoveContaminated() {
        batchService.autoRemoveContaminated();
    }
}
