package com.fungiflow.backend1.service;

import com.fungiflow.backend1.dto.SalesChartDTO;
import com.fungiflow.backend1.model.Material;
import com.fungiflow.backend1.repo.MaterialRepo;
import com.fungiflow.backend1.repo.SaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminDashboardService {

    @Autowired
    private SaleRepo saleRepo;
    @Autowired
    private MaterialRepo materialRepo;

    public List<SalesChartDTO> getSalesChartGroupedData() {
        List<Object[]> rawData = saleRepo.getMonthlySalesSummary();

        String[] months = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        List<SalesChartDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            String productName = (String) row[0];
            int monthNumber = (int) row[1] - 1; // MONTH() in JPQL returns 1-12
            Long quantity = (Long) row[2]; // Cast to Long instead of Double

            SalesChartDTO dto = new SalesChartDTO();
            dto.setProductName(productName);
            dto.setQuantity(quantity.intValue()); // Convert Long to Integer for DTO
            dto.setMonth(months[monthNumber]);

            result.add(dto);
        }

        return result;
    }
    // New method to get low stock materials
    public List<Material> getLowStockMaterials(int threshold) {
        return materialRepo.findByQuantityLessThan(threshold); // Fetch materials with quantity below threshold
    }

}
