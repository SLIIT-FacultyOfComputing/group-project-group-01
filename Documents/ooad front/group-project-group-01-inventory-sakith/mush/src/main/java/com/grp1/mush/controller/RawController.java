package com.grp1.mush.controller;

import com.grp1.mush.dto.RawDTO;
import com.grp1.mush.service.RawService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "api/v1/")
public class RawController {
    @Autowired
    private RawService RawService;

    @GetMapping("/getRaws")
    public List<RawDTO> getRaws() {
        return RawService.getAllRaws();
    }
    @PostMapping("/saveRaw")
    public RawDTO saveRaw(@RequestBody RawDTO RawDTO) {
        return RawService.saveRaw(RawDTO);
    }
    @PutMapping("/updateRaw")
    public RawDTO updateRaw(@RequestBody RawDTO RawDTO){
        return RawService.updateRaw(RawDTO);
    }
    @DeleteMapping("/deleteRaw/{id}")
    public String deleteRaw(@PathVariable Long id){
        return RawService.deleteRaw(id);
    }
    @GetMapping("/getRaw/{id}")
    public RawDTO getRawById(@PathVariable Long id) {
        return RawService.getRawById(id);
    }
}
