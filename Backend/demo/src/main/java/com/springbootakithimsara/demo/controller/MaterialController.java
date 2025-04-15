package com.springbootakithimsara.demo.controller;

import com.springbootakithimsara.demo.dto.MaterialDTO;
import com.springbootakithimsara.demo.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v3/material")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/get")
    public List<MaterialDTO> getAllMaterials() {
        return materialService.getAllMaterials();
    }



    @PostMapping("/add")
    public void saveMaterial(@RequestBody MaterialDTO materialDTO) {
        materialService.saveMaterial(materialDTO);
    }

    @PutMapping("/update")
    public void updateMaterial(@RequestBody MaterialDTO materialDTO) {
        materialService.updateMaterial(materialDTO);
    }

   @DeleteMapping("/delete")
    public void deleteMaterial(@RequestBody MaterialDTO materialDTO) {
        materialService.deleteMaterial(materialDTO);
    }

    @GetMapping("/view")
    public MaterialDTO getMaterialById(@RequestParam Long id) {
        System.out.println("Received id: " + id);
        return materialService.getMaterialById(id);
    }




}
