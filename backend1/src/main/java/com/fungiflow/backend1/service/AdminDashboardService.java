package com.fungiflow.backend1.service;

import com.fungiflow.backend1.dto.LabChartDTO;
import com.fungiflow.backend1.dto.SalesChartDTO;
import com.fungiflow.backend1.model.Material;
import com.fungiflow.backend1.model.Seed;
import com.fungiflow.backend1.repo.DailyUpdateRepository;
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

    @Autowired
    private DailyUpdateRepository dailyUpdateRepository;

    // --- SALES METHODS (untouched) ---
    public List<SalesChartDTO> getSalesChartGroupedData() {
        List<Object[]> rawData = saleRepo.getMonthlySalesSummary();

        String[] months = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        List<SalesChartDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            String productName = (String) row[0];
            int monthNumber = (int) row[1] - 1;
            Long quantity = (Long) row[2];

            SalesChartDTO dto = new SalesChartDTO();
            dto.setProductName(productName);
            dto.setQuantity(quantity.intValue());
            dto.setMonth(months[monthNumber]);

            result.add(dto);
        }

        return result;
    }

    // --- MATERIALS LOW STOCK ---
    public List<Material> getLowStockMaterials(int threshold) {
        return materialRepo.findByQuantityLessThan(threshold);
    }

    // --- LAB PERFORMANCE ---
    public List<LabChartDTO> getLabChartData(int year, Seed.MushroomType type) {
        List<Object[]> rawData = dailyUpdateRepository.getMonthlyLabStats(year, type);

        String[] monthLabels = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        List<LabChartDTO> result = new ArrayList<>();

        for (Object[] row : rawData) {
            int month = (int) row[0];
            long success = row[1] != null ? (long) row[1] : 0;
            long contaminated = row[2] != null ? (long) row[2] : 0;

            String label = monthLabels[month - 1]; // Convert to string label

            result.add(new LabChartDTO(label, success, contaminated));
        }

        return result;
    }
}
