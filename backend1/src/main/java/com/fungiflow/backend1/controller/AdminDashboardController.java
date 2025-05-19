package com.fungiflow.backend1.controller;

import com.fungiflow.backend1.dto.LabChartDTO;
import com.fungiflow.backend1.dto.SalesChartDTO;
import com.fungiflow.backend1.model.Material;
import com.fungiflow.backend1.model.Seed;
import com.fungiflow.backend1.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    // Returns sales chart grouped by customer and month
    @GetMapping("/sales-chart-grouped")
    public List<SalesChartDTO> getGroupedSalesChart() {
        return adminDashboardService.getSalesChartGroupedData();
    }

    @GetMapping("/low-stock-alerts")
    public List<Material> getLowStockAlerts(@RequestParam(defaultValue = "10") int threshold) {
        return adminDashboardService.getLowStockMaterials(threshold);
    }

    // Returns overall sales grouped by customer and month
    @GetMapping("/overall-sales")
    public List<SalesChartDTO> getOverallSalesPerformance() {
        return adminDashboardService.getSalesChartGroupedData(); // reuse same logic
    }
    @GetMapping("/lab-chart")
    public ResponseEntity<List<LabChartDTO>> getLabChart(
            @RequestParam int year,
            @RequestParam(required = false) String type) {

        Seed.MushroomType mushroomType = null;
        if (type != null && !type.isEmpty()) {
            try {
                mushroomType = Seed.MushroomType.valueOf(type.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build(); // invalid enum value
            }
        }

        List<LabChartDTO> data = adminDashboardService.getLabChartData(year, mushroomType);
        return ResponseEntity.ok(data);
    }

}
