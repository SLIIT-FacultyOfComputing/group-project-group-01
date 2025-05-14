package com.firsttest.test.service.impl;

import com.firsttest.test.ProductMapper.ProductMapper;
import com.firsttest.test.dto.ProductDto;
import com.firsttest.test.entity.Product;
import com.firsttest.test.exception.ResourceNotFoundException;
import com.firsttest.test.repository.ProductRepository;
import com.firsttest.test.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductDto createProduct(ProductDto productDto) {
        productDto.setProductId(null);
        // Convert ProductDto to Product entity
        Product product = ProductMapper.mapToProduct(productDto);

        // Save the product to the database
        Product savedProduct = productRepository.save(product);

        // Convert the saved entity back to ProductDto and return
        return ProductMapper.mapToProductDto(savedProduct);
    }

    @Override
    public ProductDto getProductById(Long productId) {
        // Fetch the product by ID
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Convert entity to ProductDto and return
        return ProductMapper.mapToProductDto(product);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::mapToProductDto)  // Fix incorrect reference to `Product`
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto updateProduct(Long productId, ProductDto updatedDto) {
        // Fetch the product by ID
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        // Update the product fields from the updatedDto
        product.setName(updatedDto.getName());
        product.setQuantity(updatedDto.getQuantity());
        product.setUnitPrice(updatedDto.getUnitPrice());

        // Save the updated product
        Product updatedProduct = productRepository.save(product);

        // Convert the updated product back to ProductDto and return
        return ProductMapper.mapToProductDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Long productId) {
        // Check if the product exists
        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException("Product not found with id: " + productId);
        }

        // Delete the product by ID
        productRepository.deleteById(productId);
    }

    @Override
    public void updateProductQuantity(Long productId, int quantityChange) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        int newQuantity = product.getQuantity() - quantityChange;
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Not enough stock available.");
        }

        product.setQuantity(newQuantity);
        productRepository.save(product);
    }
}