package com.firsttest.test.controller;

import com.firsttest.test.dto.AllocationDto;
import com.firsttest.test.service.AllocationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    private final AllocationService allocationService;

    // Create Allocation
    @PostMapping
    public ResponseEntity<AllocationDto> createAllocation(@RequestBody AllocationDto allocationDto) {
        AllocationDto savedAllocation = allocationService.createAllocation(allocationDto);
        return new ResponseEntity<>(savedAllocation, HttpStatus.CREATED);
    }

    // Get Allocation by ID
    @GetMapping("/{id}")
    public ResponseEntity<AllocationDto> getAllocationById(@PathVariable Long id) {
        AllocationDto allocationDto = allocationService.getAllocationById(id);
        return ResponseEntity.ok(allocationDto);
    }

    // Get all Allocations
    @GetMapping
    public ResponseEntity<List<AllocationDto>> getAllAllocations() {
        List<AllocationDto> allocations = allocationService.getAllAllocations();
        return ResponseEntity.ok(allocations);
    }

    // Update Allocation
    @PutMapping("/{id}")
    public ResponseEntity<AllocationDto> updateAllocation(@PathVariable Long id, @RequestBody AllocationDto allocationDto) {
        AllocationDto updatedAllocation = allocationService.updateAllocation(id, allocationDto);
        return ResponseEntity.ok(updatedAllocation);
    }

    // Delete Allocation
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // Allocate Products to Branch
    @PostMapping("/allocate")
    public ResponseEntity<Void> allocateProductsToBranch(@RequestParam Long branchId, @RequestParam Long productId, @RequestParam int quantity) {
        allocationService.allocateProductsToBranch(branchId, productId, quantity);
        return ResponseEntity.ok().build();
    }
}
