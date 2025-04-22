package com.fungiflow.backend1.controller;

import com.fungiflow.backend1.model.Material;
import com.fungiflow.backend1.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @GetMapping("/sales-chart-grouped")
    public List<Map<String, Object>> getGroupedSalesChart() {
        return adminDashboardService.getSalesChartGroupedData();
    }

    @GetMapping("/low-stock-alerts")
    public List<Material> getLowStockAlerts(@RequestParam(defaultValue = "10") int threshold) {
        return adminDashboardService.getLowStockMaterials(threshold);
    }

    @GetMapping("/overall-sales")
    public List<Map<String, Object>> getOverallSalesPerformance() {
        return adminDashboardService.getSalesChartGroupedData(); // reuse the same logic
    }
}
