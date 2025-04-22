package com.grp1.mush.controller;

import com.grp1.mush.dto.InvDTO;

import com.grp1.mush.service.InvService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "api/v2/")
public class InvController {
    @Autowired
    private InvService InvService;

    @GetMapping("/getInvs")
    public List<InvDTO> getInvs() {
        return InvService.getAllInvs();
    }
    @PostMapping("/saveInv")
    public InvDTO saveInv(@RequestBody InvDTO InvDTO) {
        return InvService.saveInv(InvDTO);
    }
    @PutMapping("/updateInv")
    public InvDTO updateInv(@RequestBody InvDTO InvDTO){
        return InvService.updateInv(InvDTO);
    }
    @DeleteMapping("/deleteInv/{nid}")
    public String deleteInv(@PathVariable Long nid){
        return InvService.deleteInv(nid);
    }
    @GetMapping("/getInv/{nid}")
    public InvDTO getInvById(@PathVariable Long nid) {
        return InvService.getInvById(nid);
    }
    @GetMapping("/getInvByUsage/{usageType}")
    public List<InvDTO> getInvByUsageType(@PathVariable String usageType) {
        return InvService.getInvByUsageType(usageType);
    }
}
