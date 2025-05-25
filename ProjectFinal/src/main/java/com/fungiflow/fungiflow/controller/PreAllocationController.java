package com.fungiflow.fungiflow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fungiflow.fungiflow.dto.PreAllocationDto;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/preorderAllocation")
public class PreAllocationController {

    private final PreAllocationService preallocationService;

    public PreAllocationController(PreAllocationService preallocationService) {
        this.preallocationService = preallocationService;
    }

    // Create PreAllocation from Allocation
    @PostMapping("/from-allocation/{allocationId}")
    public ResponseEntity<PreAllocationDto> createPreAllocationFromAllocation(
            @PathVariable Long allocationId,
            @RequestParam Long branchId,
            @RequestParam int allocatedQty) {
        PreAllocationDto savedPreAllocation = preallocationService.createPreAllocationFromAllocation(
            allocationId, branchId, allocatedQty);
        return new ResponseEntity<>(savedPreAllocation, HttpStatus.CREATED);
    }

    // Update PreAllocation
    @PutMapping("/{id}")
    public ResponseEntity<PreAllocationDto> updatePreAllocation(
            @PathVariable Long id,
            @RequestBody PreAllocationDto preallocationDto) {
        PreAllocationDto updatedPreAllocation = preallocationService.updatePreAllocation(id, preallocationDto);
        return ResponseEntity.ok(updatedPreAllocation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePreAllocation(@PathVariable Long id) {
        preallocationService.deletePreAllocation(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @PostMapping("/map-allocation")
    public ResponseEntity<String> mapAllocationToPreAllocation(
            @RequestParam Long allocationId,
            @RequestParam Long branchId) {
        preallocationService.mapAllocationToPreAllocation(allocationId, branchId);
        return ResponseEntity.ok("Allocation mapped to PreAllocation successfully");
    }

    @PostMapping("/allocate")
    public ResponseEntity<String> allocateProductsToBranch(
            @RequestParam Long branchId,
            @RequestParam Long productId,
            @RequestParam int quantity) {
        preallocationService.allocateProductsToBranch(branchId, productId, quantity);
        return ResponseEntity.ok("Products allocated to branch successfully");
    }
} 