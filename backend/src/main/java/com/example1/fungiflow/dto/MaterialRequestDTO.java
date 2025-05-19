package com.example1.fungiflow.dto;
import com.example1.fungiflow.model.InventoryItem.MaterialType;
import lombok.Data;

@Data
public class MaterialRequestDTO {
    private MaterialType materialType;
    private int quantity;
    private String requester;
}

