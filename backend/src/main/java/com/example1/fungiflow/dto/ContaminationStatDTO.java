package com.example1.fungiflow.dto;

import com.example1.fungiflow.model.Seed.MushroomType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContaminationStatDTO {
    private MushroomType type;
    private int totalBatches;
    private int contaminatedBatches;
    private double contaminationRate;
}
