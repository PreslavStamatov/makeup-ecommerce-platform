package com.eComerce.eCom.entities.dtos;

public class GetSpecificProductDTO {

    private String productName;

    public GetSpecificProductDTO(String productName) {
        this.productName = productName;
    }

    public GetSpecificProductDTO() {
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
