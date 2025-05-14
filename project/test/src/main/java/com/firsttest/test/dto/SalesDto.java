package com.firsttest.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class SalesDto {
    private long id;
    private String customer_name;
    private String product_name;
    private double unit_price;
    private int quantity;
    private double price;
    private String date;
    private long productId;
}

