package com.example1.fungiflow.dto;

import com.example1.fungiflow.model.Seed.MushroomType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BatchDTO {
    private MushroomType type;
    private int initialQuantity;
    private LocalDate cultivationStartDate;
}
