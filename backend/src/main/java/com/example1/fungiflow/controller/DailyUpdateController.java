package com.example1.fungiflow.controller;

import com.example1.fungiflow.dto.DailyUpdateDTO;
import com.example1.fungiflow.service.LabManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/daily-updates")
public class DailyUpdateController {

    @Autowired
    private LabManagementService labService;

    @PostMapping
    public void recordDailyUpdate(@RequestBody DailyUpdateDTO dto) {
        labService.recordDailyUpdate(dto);
    }
}
