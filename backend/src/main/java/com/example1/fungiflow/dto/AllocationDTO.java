package com.example1.fungiflow.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
public class AllocationDTO {
    private Long seedId;
    private int salesCenterQty;
    private int productionQty;
}
