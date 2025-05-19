// MaterialRequest.java
package com.example1.fungiflow.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor
public class MaterialRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MaterialType materialType;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private String requester;

    private LocalDate requestDate = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private RequestStatus status = RequestStatus.PENDING;

    public enum MaterialType {
        SEED, COTTON, NUTRIENT_MIX, POLYTHENE_BAG, STERILIZER
    }

    public enum RequestStatus {
        PENDING, APPROVED, REJECTED, FULFILLED
    }
}
