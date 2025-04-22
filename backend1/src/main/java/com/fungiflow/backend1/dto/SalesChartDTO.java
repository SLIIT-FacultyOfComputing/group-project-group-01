package com.fungiflow.backend1.dto;

import java.util.List;

public class SalesChartDTO {
    private List<String> labels;
    private List<Double> values;

    public SalesChartDTO() {}

    public SalesChartDTO(List<String> labels, List<Double> values) {
        this.labels = labels;
        this.values = values;
    }

    public List<String> getLabels() { return labels; }
    public void setLabels(List<String> labels) { this.labels = labels; }

    public List<Double> getValues() { return values; }
    public void setValues(List<Double> values) { this.values = values; }
}
