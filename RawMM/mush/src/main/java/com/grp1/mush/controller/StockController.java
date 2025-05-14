package com.grp1.mush.controller;

import com.grp1.mush.dto.StockDTO;
import com.grp1.mush.service.StockService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping(value = "api/v4/")
public class StockController {
    @Autowired
    private StockService StockService;

    @GetMapping("/getStocks")
    public List<StockDTO> getStocks() {
        return StockService.getAllStocks();
    }
}
