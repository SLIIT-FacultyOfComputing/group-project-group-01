package com.grp1.mush.service;

import com.grp1.mush.dto.StockDTO;
import com.grp1.mush.model.Stock;
import com.grp1.mush.repo.StockRepo;
import com.grp1.mush.repo.RawRepo;
import com.grp1.mush.repo.InvRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepo StockRepo;

    @Autowired 
    private RawRepo RawRepo;

    @Autowired 
    private InvRepo InvRepo;

    public void updateStock(String material) {
        int totalAdded = RawRepo.getTotalRawStockByName(material);
        int totalUsed = InvRepo.getTotalUsageByName(material);
        int currentStock = totalAdded - totalUsed;

        Stock stock = StockRepo.findByMaterial(material)
                .orElseGet(() -> {
                    Stock s = new Stock();
                    s.setMaterial(material);
                    return s;
                });

        stock.setStock(currentStock);
        StockRepo.save(stock);
    }

    @Autowired
    private ModelMapper modelMapper;

    public List<StockDTO> getAllStocks() {
        List<Stock> StockList = StockRepo.findAll();
        return modelMapper.map(StockList,new TypeToken<List<StockDTO>>(){}.getType());
    }  
}