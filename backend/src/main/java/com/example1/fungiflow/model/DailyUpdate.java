package com.example1.fungiflow.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor
public class DailyUpdate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Seed seed;

    private LocalDate date;
    private int successfulToday;
    private int contaminatedToday;
    private String contaminationReason;
}
