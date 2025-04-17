package com.example1.fungiflow.controller;


import com.example1.fungiflow.model.Seed;
import com.example1.fungiflow.repository.SeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/seeds")
public class SeedController {

    @Autowired
    private SeedRepository seedRepository;

    @GetMapping
    public List<Seed> getAllSeeds() {
        return seedRepository.findAll();
    }

    @PostMapping
    public Seed createSeed(@RequestBody Seed seed) {
        return seedRepository.save(seed);
    }

    @PutMapping("/{id}/update")
    public Seed updateSeedProgress(@PathVariable Long id, @RequestBody Seed update) {
        Seed seed = seedRepository.findById(id).orElseThrow();
        seed.setSuccessfulGrowth(update.getSuccessfulGrowth());
        seed.setContaminatedCount(update.getContaminatedCount());
        return seedRepository.save(seed);
    }
}

