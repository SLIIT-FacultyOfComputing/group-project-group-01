package com.fungiflow.fungiflow.service;

import com.fungiflow.fungiflow.dto.PreAllocationDto;
import java.util.List;

public interface PreAllocationService {
    PreAllocationDto createPreAllocationFromAllocation(Long allocationId, Long branchId, int allocatedQty);
    
    PreAllocationDto getPreAllocationById(Long id);

    List<PreAllocationDto> getAllPreAllocations();

    PreAllocationDto updatePreAllocation(Long id, PreAllocationDto preallocationDto);

    void deletePreAllocation(Long id);
}

void allocateProductsToBranch(Long branchId, Long productId, int quantity);

void mapAllocationToPreAllocation(Long allocationId, Long branchId); 