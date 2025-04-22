package com.fungiflow.backend1.service;

import com.fungiflow.backend1.model.Material;
import com.fungiflow.backend1.repo.MaterialRepo;
import com.fungiflow.backend1.repo.SaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminDashboardService {

    @Autowired
    private SaleRepo saleRepo;

    @Autowired
    private MaterialRepo materialRepo;

    public List<Map<String, Object>> getSalesChartGroupedData() {
        List<Object[]> rawData = saleRepo.getMonthlySalesSummary();
        String[] months = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        Map<String, Map<String, Object>> monthToDataMap = new LinkedHashMap<>();

        for (Object[] row : rawData) {
            String name = (String) row[0];
            int monthNumber = (int) row[1] - 1;
            Double totalAmount = (Double) row[2];

            String monthLabel = months[monthNumber];

            Map<String, Object> monthData = monthToDataMap.getOrDefault(monthLabel, new LinkedHashMap<>());
            monthData.put("month", monthLabel);
            monthData.put(name, totalAmount);

            monthToDataMap.put(monthLabel, monthData);
        }

        return new ArrayList<>(monthToDataMap.values());
    }

    public List<Material> getLowStockMaterials(int threshold) {
        return materialRepo.findByQuantityLessThan(threshold);
    }
}
