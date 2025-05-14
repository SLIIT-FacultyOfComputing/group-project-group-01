package com.firsttest.test.controller;

import com.firsttest.test.dto.PreordersDto;
import com.firsttest.test.service.PreordersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/preorders")
public class PreordersController {

    private PreordersService PreordersService;

    //Build add sale REST API
    @PostMapping
    public ResponseEntity<PreordersDto> createPreorders(@RequestBody PreordersDto PreordersDto) {
        PreordersDto savedPreorders = PreordersService.createPreorders(PreordersDto);
        return new ResponseEntity<>(savedPreorders, HttpStatus.CREATED);
    }

    //Build get sale REST API
    @GetMapping("{id}")
    public ResponseEntity<PreordersDto> getPreordersByID(@PathVariable("id") Long PreordersID) {
        PreordersDto PreordersDto = PreordersService.getPreordersById(PreordersID);
        return ResponseEntity.ok(PreordersDto);
    }

    //Build get all Preorders REST API
    @GetMapping
    public ResponseEntity<List<PreordersDto>> getAllPreorders() {
        List<PreordersDto> Preorders = PreordersService.getAllPreorders();
        return ResponseEntity.ok(Preorders);
    }

    //Build update Preorders REST API
    @PutMapping("{id}")
    public ResponseEntity<PreordersDto> updatePreorders(@PathVariable("id") Long PreordersID, @RequestBody PreordersDto updatedPreorders) {
        PreordersDto PreordersDto = PreordersService.updatePreorders(PreordersID, updatedPreorders);
        return ResponseEntity.ok(PreordersDto);
    }

    //Build delete Preorders REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePreorders(@PathVariable("id") Long PreordersID) {
        PreordersService.deletePreorders(PreordersID);
        return ResponseEntity.ok("Deleted successfully");
    }

    @GetMapping("/preorders/total")
    public ResponseEntity<List<Object[]>>TotalPreorderItems() {
        return ResponseEntity.ok(PreordersService.TotalPreorders());
    }
}




