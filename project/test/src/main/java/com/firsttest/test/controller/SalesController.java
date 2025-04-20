package com.firsttest.test.controller;

import com.firsttest.test.dto.SalesDto;
import com.firsttest.test.service.SalesService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/sold")
public class SalesController {

    private SalesService salesService;

    //Build add sale REST API
    @PostMapping
    public ResponseEntity<SalesDto> createSales(@RequestBody SalesDto salesDto) {
        SalesDto savedSales = salesService.createSales(salesDto);
        return new ResponseEntity<>(savedSales, HttpStatus.CREATED);
    }

    //Build get sale REST API
    @GetMapping("{id}")
    public ResponseEntity<SalesDto> getSalesByID(@PathVariable("id") Long salesID) {
        SalesDto salesDto = salesService.getSalesById(salesID);
        return ResponseEntity.ok(salesDto);
    }

    //Build get all sales REST API
    @GetMapping
    public ResponseEntity<List<SalesDto>> getAllSales() {
        List<SalesDto> sales = salesService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    //Build update sales REST API
    @PutMapping("{id}")
    public ResponseEntity<SalesDto> updateSales(@PathVariable("id") Long salesID, @RequestBody SalesDto updatedSales) {
        SalesDto salesDto = salesService.updateSales(salesID, updatedSales);
        return ResponseEntity.ok(salesDto);
    }

    //Build delete sales REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSales(@PathVariable("id") Long salesID) {
        salesService.deleteSales(salesID);
        return ResponseEntity.ok("Deleted succesfully");
    }
}




