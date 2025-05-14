package com.firsttest.test.ProductMapper;

import com.firsttest.test.dto.ProductDto;
import com.firsttest.test.entity.Product;

public class ProductMapper {

    // Convert Product entity to ProductDto
    public static ProductDto mapToProductDto(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductDto(
                product.getProduct_id(),
                product.getName(),
                product.getQuantity(),
                product.getUnitPrice()
        );
    }

    // Convert ProductDto to Product entity
    public static Product mapToProduct(ProductDto productDto) {
        Product product = new Product();
        product.setProduct_id(productDto.getProductId());
        product.setName(productDto.getName());
        product.setQuantity(productDto.getQuantity());
        product.setUnitPrice(productDto.getUnitPrice());
        return product;
    }

}
