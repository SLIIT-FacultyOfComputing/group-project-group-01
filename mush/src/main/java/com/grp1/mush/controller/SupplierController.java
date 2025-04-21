package com.grp1.mush.controller;

import com.grp1.mush.dto.SupplierDTO;

import com.grp1.mush.service.SupplierService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "api/v3/")
public class SupplierController {
    @Autowired
    private SupplierService SupplierService;

    @GetMapping("/getSuppliers")
    public List<SupplierDTO> getSuppliers() {
        return SupplierService.getAllSuppliers();
    }
    @PostMapping("/saveSupplier")
    public SupplierDTO saveSupplier(@RequestBody SupplierDTO SupplierDTO) {
        return SupplierService.saveSupplier(SupplierDTO);
    }
    @PutMapping("/updateSupplier")
    public SupplierDTO updateSupplier(@RequestBody SupplierDTO SupplierDTO){
        return SupplierService.updateSupplier(SupplierDTO);
    }
    @DeleteMapping("/deleteSupplier/{sid}")
    public String deleteSupplier(@PathVariable Long sid){
        return SupplierService.deleteSupplier(sid);
    }
    @GetMapping("/getSupplier/{sid}")
    public SupplierDTO getSupplierById(@PathVariable Long sid) {
        return SupplierService.getSupplierById(sid);
    }
}
