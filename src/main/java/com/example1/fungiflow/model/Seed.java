package com.example1.fungiflow.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Seed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MushroomType type; // OYSTER, SHIITAKE, etc.

    @Column(nullable = false)
    private int initialQuantity;

    private int successfulGrowth;
    private int contaminatedCount;

    @Column(nullable = false)
    private LocalDate cultivationStartDate;

    private boolean cultivationComplete;

    public enum MushroomType {
        OYSTER(14), SHIITAKE(21), PORTABELLA(18), MAITAKE(25), LIONS_MANE(17);
        public final int growthDays;
        MushroomType(int growthDays) { this.growthDays = growthDays; }
    }

    // Getters and setters
    public Long getId() { return id; }
    public MushroomType getType() { return type; }
    public void setType(MushroomType type) { this.type = type; }
    public int getInitialQuantity() { return initialQuantity; }
    public void setInitialQuantity(int initialQuantity) { this.initialQuantity = initialQuantity; }
    public int getSuccessfulGrowth() { return successfulGrowth; }
    public void setSuccessfulGrowth(int successfulGrowth) { this.successfulGrowth = successfulGrowth; }
    public int getContaminatedCount() { return contaminatedCount; }
    public void setContaminatedCount(int contaminatedCount) { this.contaminatedCount = contaminatedCount; }
    public LocalDate getCultivationStartDate() { return cultivationStartDate; }
    public void setCultivationStartDate(LocalDate cultivationStartDate) { this.cultivationStartDate = cultivationStartDate; }
    public boolean isCultivationComplete() { return cultivationComplete; }
    public void setCultivationComplete(boolean cultivationComplete) { this.cultivationComplete = cultivationComplete; }
}
