package com.example1.fungiflow.controller;

import com.example1.fungiflow.dto.AllocationDTO;
import com.example1.fungiflow.service.LabManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    @Autowired
    private LabManagementService labService;

    @PostMapping
    public void allocateCultures(@RequestBody AllocationDTO dto) {
        labService.allocateCultures(dto);
    }
}
