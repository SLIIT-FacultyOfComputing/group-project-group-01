package com.example1.fungiflow.dto;

import lombok.Data;

@Data
public class DailyUpdateDTO {
    private Long seedId;
    private int successfulToday;
    private int contaminatedToday;
    private String contaminationReason;
}
