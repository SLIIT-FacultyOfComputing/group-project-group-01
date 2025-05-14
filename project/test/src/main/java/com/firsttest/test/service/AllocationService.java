package com.firsttest.test.service;

import com.firsttest.test.dto.AllocationDto;

import java.util.List;

public interface AllocationService {
    AllocationDto createAllocation(AllocationDto allocationDto);

    AllocationDto getAllocationById(Long id);

    List<AllocationDto> getAllAllocations();

    AllocationDto updateAllocation(Long id, AllocationDto allocationDto);

    void deleteAllocation(Long id);

    void allocateProductsToBranch(Long branchId, Long productId, int quantity);
}
