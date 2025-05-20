package com.firsttest.test.service.impl;

import com.firsttest.test.SalesMapper.SalesMapper;
import com.firsttest.test.dto.SalesDto;
import com.firsttest.test.entity.Product;
import com.firsttest.test.entity.Sales;
import com.firsttest.test.exception.ResourceNotFoundException;
import com.firsttest.test.repository.SalesRepository;
import com.firsttest.test.service.ProductService;
import com.firsttest.test.service.SalesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class SalesServiceImpl implements SalesService {
    private SalesRepository salesRepository;
    private ProductService productService;

    @Override
    public SalesDto createSales(SalesDto salesDto) {
        Sales sales = SalesMapper.mapToSales(salesDto);

        Product product = productService.getProductEntityById(salesDto.getProduct_id()); // Use the entity, not DTO
        sales.setProduct(product);

        Sales savedSales = salesRepository.save(sales);
        productService.updateProductQuantity(product.getProduct_id(), salesDto.getQuantity());

        return SalesMapper.mapToSalesDto(savedSales);
    }


    @Override
    public SalesDto getSalesById(Long salesID) {
        Sales sales = salesRepository.findById(salesID)
                .orElseThrow(() -> new ResourceNotFoundException("Sale is not found with given id"));
        return SalesMapper.mapToSalesDto(sales);
    }

    @Override
    public List<SalesDto> getAllSales() {
        List<Sales> sale = salesRepository.findAll();

        return sale.stream().map((sales) -> SalesMapper.mapToSalesDto(sales))
                .collect(Collectors.toList());
    }

    @Override
    public SalesDto updateSales(Long salesID, SalesDto updatedSales) {
        Sales sales =salesRepository.findById(salesID).orElseThrow(
                () -> new ResourceNotFoundException("Sale is not found with given id"+ salesID));
        sales.setCustomer_name(updatedSales.getCustomer_name());
        sales.setProduct_name(updatedSales.getProduct_name());
        sales.setUnit_price(updatedSales.getUnit_price());
        sales.setQuantity(updatedSales.getQuantity());
        sales.setPrice(updatedSales.getPrice());
        sales.setDate(updatedSales.getDate());

        Sales updatedSalesObj = salesRepository.save(sales);
        return SalesMapper.mapToSalesDto(updatedSalesObj);
    }

    @Override
    public void deleteSales(Long salesID) {
        Sales sales =salesRepository.findById(salesID).orElseThrow(
                () -> new ResourceNotFoundException("Sale is not found with given id"+ salesID));
        salesRepository.deleteById(salesID);
    }
}
