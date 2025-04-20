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
                sales.getDate()
                );
    }

    public static Sales mapToSales(SalesDto salesDto){
        return  new Sales(
                salesDto.getId(),
                salesDto.getCustomer_name(),
                salesDto.getProduct_name(),
                salesDto.getUnit_price(),
                salesDto.getQuantity(),
                salesDto.getPrice(),
                salesDto.getDate()
        );
    }

}
