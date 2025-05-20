package com.firsttest.test.BranchMapper;

import com.firsttest.test.dto.BranchDto;
import com.firsttest.test.entity.Branch;

public class BranchMapper {
    public static BranchDto mapToBranchDto(Branch branch) {
        return new BranchDto(
                branch.getBranchId(),
                branch.getBranchName(),
                branch.getLocation()
        );
    }

    public static Branch mapToBranch(BranchDto branchDto) {
        Branch branch = new Branch();
        branch.setId(branchDto.getId());
        branch.setBranchName(branchDto.getBranchName());
        branch.setLocation(branchDto.getLocation());
        return branch;
    }
}

