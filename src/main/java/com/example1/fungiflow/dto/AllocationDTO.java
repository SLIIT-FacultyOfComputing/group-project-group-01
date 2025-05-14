package com.example1.fungiflow.dto;

import lombok.Data;

@Data
public class AllocationDTO {
    private Long seedId;
    private int salesCenterQty;
    private int branchesQty;
    private int productionQty;
}
