package com.firsttest.test.service.impl;

import com.firsttest.test.PreordersMapper.PreordersMapper;
import com.firsttest.test.dto.PreordersDto;
import com.firsttest.test.entity.Preorders;
import com.firsttest.test.exception.ResourceNotFoundException;
import com.firsttest.test.repository.PreordersRepository;
import com.firsttest.test.service.PreordersService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class PreordersServiceImpl implements PreordersService {
    private PreordersRepository PreordersRepository;
    @Override
    public PreordersDto createPreorders(PreordersDto PreordersDto) {
        Preorders Preorders = PreordersMapper.mapToPreorders(PreordersDto);
        Preorders savedPreorders = PreordersRepository.save(Preorders);

        return com.firsttest.test.PreordersMapper.PreordersMapper.mapToPreordersDto(savedPreorders);
    }

    @Override
    public PreordersDto getPreordersById(Long PreordersID) {
        Preorders Preorders = PreordersRepository.findById(PreordersID)
                .orElseThrow(() -> new ResourceNotFoundException("Sale is not found with given id"));
        return com.firsttest.test.PreordersMapper.PreordersMapper.mapToPreordersDto(Preorders);
    }

    @Override
    public List<PreordersDto> getAllPreorders() {
        List<Preorders> sale = PreordersRepository.findAll();

        return sale.stream().map((Preorders) -> com.firsttest.test.PreordersMapper.PreordersMapper.mapToPreordersDto(Preorders))
                .collect(Collectors.toList());
    }

    @Override
    public PreordersDto updatePreorders(Long PreordersID, PreordersDto updatedPreorders) {
        Preorders Preorders =PreordersRepository.findById(PreordersID).orElseThrow(
                () -> new ResourceNotFoundException("Sale is not found with given id"+ PreordersID));
        Preorders.setCustomer_name(updatedPreorders.getCustomer_name());
        Preorders.setProduct_name(updatedPreorders.getProduct_name());
        Preorders.setUnit_price(updatedPreorders.getUnit_price());
        Preorders.setQuantity(updatedPreorders.getQuantity());
        Preorders.setPrice(updatedPreorders.getPrice());
        Preorders.setDate(updatedPreorders.getDate());

        Preorders updatedPreordersObj = PreordersRepository.save(Preorders);
        return com.firsttest.test.PreordersMapper.PreordersMapper.mapToPreordersDto(updatedPreordersObj);
    }

    @Override
    public void deletePreorders(Long PreordersID) {
        Preorders Preorders =PreordersRepository.findById(PreordersID).orElseThrow(
                () -> new ResourceNotFoundException("Sale is not found with given id"+ PreordersID));
        PreordersRepository.deleteById(PreordersID);
    }
}
