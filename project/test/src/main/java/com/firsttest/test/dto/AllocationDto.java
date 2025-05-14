package com.firsttest.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AllocationDto {
    private Long id;
    private Long branchId;
    private Long productId;
    private int totalQty;
    private int allocatedQty;
    private LocalDate date;
}

