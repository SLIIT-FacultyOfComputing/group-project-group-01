package com.fungiflow.fungiflow.service.impl;

import com.fungiflow.fungiflow.dto.PreAllocationDto;
import com.fungiflow.fungiflow.entity.Allocation;
import com.fungiflow.fungiflow.entity.Branch;
import com.fungiflow.fungiflow.entity.PreAllocation;
import com.fungiflow.fungiflow.entity.Product;
import com.fungiflow.fungiflow.entity.Seed;
import com.fungiflow.fungiflow.exception.ResourceNotFoundException;
import com.fungiflow.fungiflow.repository.AllocationRepository;
import com.fungiflow.fungiflow.repository.BranchRepository;
import com.fungiflow.fungiflow.repository.PreAllocationRepository;
import com.fungiflow.fungiflow.repository.ProductRepository;
import com.fungiflow.fungiflow.service.PreAllocationService;
import com.fungiflow.fungiflow.PreAllocationMapper.PreAllocationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PreAllocationServiceImpl implements PreAllocationService {

    private final PreAllocationRepository preallocationRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;
    private final AllocationRepository allocationRepository;

    @Autowired
    public PreAllocationServiceImpl(PreAllocationRepository preallocationRepository, BranchRepository branchRepository, ProductRepository productRepository, AllocationRepository allocationRepository) {
        this.preallocationRepository = preallocationRepository;
        this.branchRepository = branchRepository;
        this.productRepository = productRepository;
        this.allocationRepository = allocationRepository;
    }

    @Override
    public PreAllocationDto createPreAllocation(Long branchId, PreAllocationDto preallocationDto) {
        // Implementation of createPreAllocation method
        return null; // Placeholder return, actual implementation needed
    }

    @Override
    public void mapAllocationToPreAllocation(Long allocationId, Long branchId) {
        // Get the allocation
        Allocation allocation = allocationRepository.findById(allocationId)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + allocationId));

        // Get the branch
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id: " + branchId));

        // Get the seed's ID which will be used as product ID
        Seed seed = allocation.getSeed();
        if (seed == null) {
            throw new ResourceNotFoundException("Seed not found in allocation");
        }

        // Create new PreAllocation
        PreAllocation preallocation = new PreAllocation();
        preallocation.setBranch(branch);
        
        // Find the product with the seed's ID
        Product product = productRepository.findById(seed.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + seed.getId()));
        
        preallocation.setProduct(product);
        preallocation.setTotalQty(allocation.getSalesCenterQty());
        preallocation.setAllocatedQty(0);
        preallocation.setDate(LocalDate.now());

        preallocationRepository.save(preallocation);
    }

    @Override
    public PreAllocationDto createPreAllocationFromAllocation(Long allocationId, Long branchId, int allocatedQty) {
        // Get the allocation
        Allocation allocation = allocationRepository.findById(allocationId)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + allocationId));

        // Get the branch
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id: " + branchId));

        // Get the seed's ID which will be used as product ID
        Seed seed = allocation.getSeed();
        if (seed == null) {
            throw new ResourceNotFoundException("Seed not found in allocation");
        }

        // Find the product with the seed's ID
        Product product = productRepository.findById(seed.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + seed.getId()));

        // Create new PreAllocation
        PreAllocation preallocation = new PreAllocation();
        preallocation.setBranch(branch);
        preallocation.setProduct(product);
        preallocation.setTotalQty(allocation.getSalesCenterQty()); // Use salesCenterQty as totalQty
        preallocation.setAllocatedQty(allocatedQty); // Use user-provided allocatedQty
        preallocation.setDate(LocalDate.now());

        preallocation = preallocationRepository.save(preallocation);
        return PreAllocationMapper.mapToPreAllocationDto(preallocation);
    }
} 