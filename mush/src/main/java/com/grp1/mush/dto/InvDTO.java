package com.grp1.mush.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvDTO {
    private Long nid;
    private String material;
    private Integer Used_stock;
}
