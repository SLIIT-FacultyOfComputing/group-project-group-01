package com.firsttest.test.service;

import com.firsttest.test.dto.ProductDto;

import java.util.List;

public interface ProductService {
    ProductDto createProduct(ProductDto productDto);

    ProductDto getProductById(Long productId);

    List<ProductDto> getAllProducts();

    ProductDto updateProduct(Long productId, ProductDto updatedDto);

    void deleteProduct(Long productId);

    void updateProductQuantity(Long productId, int quantityChange);
}
