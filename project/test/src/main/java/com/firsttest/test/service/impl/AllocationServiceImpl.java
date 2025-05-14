package com.firsttest.test.service.impl;

import com.firsttest.test.dto.AllocationDto;
import com.firsttest.test.entity.Allocation;
import com.firsttest.test.entity.Branch;
import com.firsttest.test.entity.Product;
import com.firsttest.test.exception.ResourceNotFoundException;
import com.firsttest.test.mapper.AllocationMapper;
import com.firsttest.test.repository.AllocationRepository;
import com.firsttest.test.repository.BranchRepository;
import com.firsttest.test.repository.ProductRepository;
import com.firsttest.test.service.AllocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AllocationServiceImpl implements AllocationService {
    private final AllocationRepository allocationRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;

    @Override
    public AllocationDto createAllocation(AllocationDto allocationDto) {
        Allocation allocation = AllocationMapper.mapToAllocation(allocationDto);
        allocation = allocationRepository.save(allocation);
        return AllocationMapper.mapToAllocationDto(allocation);
    }

    @Override
    public AllocationDto getAllocationById(Long id) {
        Allocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + id));
        return AllocationMapper.mapToAllocationDto(allocation);
    }

    @Override
    public List<AllocationDto> getAllAllocations() {
        return allocationRepository.findAll().stream()
                .map(AllocationMapper::mapToAllocationDto)
                .collect(Collectors.toList());
    }

    @Override
    public AllocationDto updateAllocation(Long id, AllocationDto allocationDto) {
        Allocation allocation = allocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found with id: " + id));

        allocation.setTotalQty(allocationDto.getTotalQty());
        allocation.setAllocatedQty(allocationDto.getAllocatedQty());


        allocation = allocationRepository.save(allocation);
        return AllocationMapper.mapToAllocationDto(allocation);
    }

    @Override
    public void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }

    @Override
    public void allocateProductsToBranch(Long branchId, Long productId, int quantity) {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id: " + branchId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        Allocation allocation = new Allocation();
        allocation.setBranch(branch);
        allocation.setProduct(product);
        allocation.setTotalQty(quantity);
        allocation.setAllocatedQty(0);

        allocationRepository.save(allocation);
    }
}
