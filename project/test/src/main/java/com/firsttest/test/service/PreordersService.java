package com.firsttest.test.service;

import com.firsttest.test.dto.PreordersDto;

import java.util.List;

public interface PreordersService {
    PreordersDto createPreorders(PreordersDto PreordersDto);

    PreordersDto getPreordersById(Long PreordersID);

    List<PreordersDto> getAllPreorders();

    PreordersDto updatePreorders(Long PreordersID, PreordersDto updatedPreorders);

    void deletePreorders(Long PreordersID);

    List<Object[]> TotalPreorders();
}
