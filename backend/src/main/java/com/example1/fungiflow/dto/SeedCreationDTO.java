package com.example1.fungiflow.dto;
import com.example1.fungiflow.dto.MaterialRequestDTO;
import com.example1.fungiflow.model.Seed.MushroomType;
import lombok.Data;
import java.util.List;

@Data
public class SeedCreationDTO {
    private MushroomType type;
    private int initialQuantity;
    private List<MaterialRequestDTO> materialRequests;
}
