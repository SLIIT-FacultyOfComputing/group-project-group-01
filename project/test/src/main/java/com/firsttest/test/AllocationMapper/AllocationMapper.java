package com.firsttest.test.AllocationMapper;

import com.firsttest.test.dto.AllocationDto;
import com.firsttest.test.entity.Allocation;

public class AllocationMapper {
    public static AllocationDto mapToAllocationDto(Allocation allocation) {
        return new AllocationDto(
                allocation.getId(),
                allocation.getBranch().getBranchId(),
                allocation.getProduct().getProduct_id(),
                allocation.getTotalQty(),
                allocation.getAllocatedQty(),
                allocation.getDate()
        );
    }

    public static Allocation mapToAllocation(AllocationDto dto) {
        Allocation allocation = new Allocation();
        allocation.setTotalQty(dto.getTotalQty());
        allocation.setAllocatedQty(dto.getAllocatedQty());
        allocation.setDate(dto.getDate());
        return allocation;
    }
}
