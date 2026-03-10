package com.eComerce.eCom.entities.dtos;

import java.util.List;

public class ShoppingBagExportDto {

    private List<BoughtMakeupExportDTO> products;

    public ShoppingBagExportDto(List<BoughtMakeupExportDTO> products) {
        this.products = products;
    }

    public ShoppingBagExportDto() {
    }

    public void setProducts(List<BoughtMakeupExportDTO> products) {
        this.products = products;
    }

    public List<BoughtMakeupExportDTO> getProducts() {
        return products;
    }
}
