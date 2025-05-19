package com.example1.fungiflow.dto;

import lombok.Data;
import java.util.Map;

@Data
public class AnalyticsDTO {
    private Map<String, Double> successRatesByType;
    private Map<String, Integer> contaminationByReason;
    private int totalSuccessful;
    private int totalContaminated;
}
