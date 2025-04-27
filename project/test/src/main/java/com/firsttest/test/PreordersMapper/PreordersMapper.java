package com.firsttest.test.PreordersMapper;

import com.firsttest.test.dto.PreordersDto;
import com.firsttest.test.entity.Preorders;

public class PreordersMapper {
    public static PreordersDto mapToPreordersDto(Preorders Preorders){
        return  new PreordersDto(
                Preorders.getId(),
                Preorders.getCustomer_name(),
                Preorders.getProduct_name(),
                Preorders.getUnit_price(),
                Preorders.getQuantity(),
                Preorders.getPrice(),
                Preorders.getDate()
                );
    }

    public static Preorders mapToPreorders(PreordersDto PreordersDto){
        return  new Preorders(
                PreordersDto.getId(),
                PreordersDto.getCustomer_name(),
                PreordersDto.getProduct_name(),
                PreordersDto.getUnit_price(),
                PreordersDto.getQuantity(),
                PreordersDto.getPrice(),
                PreordersDto.getDate()
        );
    }

}
