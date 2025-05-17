package com.fungiflow.backend1.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Month;

@Entity
@Table(name = "Sold")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @Setter
    @Column(name = "product_name", nullable = false)
    private String productName;

    @NotNull
    private Double unitPrice;

    @NotNull
    private Integer quantity;

    private Double price;

    @Setter
    @NotNull
    private LocalDate date;

    // Default constructor
    public Sale() {}

    // Constructor with parameters
    public Sale(String customerName, String productName, Double unitPrice, Integer quantity, LocalDate date) {
        this.customerName = customerName;
        this.productName = productName;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.date = date;
        this.price = calculatePrice();  // Automatically calculate price
    }

    // Getter and Setter methods
    public Long getId() {
        return id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getProductName() {
        return productName;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        this.price = calculatePrice();  // Recalculate price when unit price changes
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.price = calculatePrice();  // Recalculate price when quantity changes
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDate getDate() {
        return date;
    }

    // Method to calculate total price
    public Double calculatePrice() {
        return this.unitPrice * this.quantity;
    }

    // Optional: For grouping purposes, you could add a getter to get the month from the date
    public Month getMonth() {
        return this.date.getMonth();
    }

}
