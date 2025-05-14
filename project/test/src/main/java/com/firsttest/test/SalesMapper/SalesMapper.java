package com.firsttest.test.SalesMapper;

import com.firsttest.test.dto.SalesDto;
import com.firsttest.test.entity.Sales;

public class SalesMapper {
    public static SalesDto mapToSalesDto(Sales sales){
        return  new SalesDto(
                sales.getId(),
                sales.getCustomer_name(),
                sales.getProduct_name(),
                sales.getUnit_price(),
                sales.getQuantity(),
                sales.getPrice(),
                sales.getDate(),
                sales.getProduct() != null ? sales.getProduct().getProduct_id() : null
        );
    }

    public static Sales mapToSales(SalesDto salesDto) {
        Sales sales = new Sales();
        sales.setId(salesDto.getId());
        sales.setCustomer_name(salesDto.getCustomer_name());
        sales.setProduct_name(salesDto.getProduct_name());
        sales.setUnit_price(salesDto.getUnit_price());
        sales.setQuantity(salesDto.getQuantity());
        sales.setPrice(salesDto.getPrice());
        sales.setDate(salesDto.getDate());

        return sales;

    }
}