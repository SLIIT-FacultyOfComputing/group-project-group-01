package com.firsttest.test.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "branch")

public class Branch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long branchId;

    @Column(nullable = false)
    private String location;
    private String branchName;}

//     @OneToOne
//     @JoinColumn(name = "manager_id", referencedColumnName = "employeeId")
//     private Employee manager;
// }


