package com.example1.fungiflow.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Getter @Setter @NoArgsConstructor
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaterialType materialType;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int thresholdLevel;

    public enum MaterialType {
        SEED, COTTON, NUTRIENT_MIX, POLYTHENE_BAG, STERILIZER
    }
}

