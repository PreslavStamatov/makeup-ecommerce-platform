package com.eComerce.eCom.entities.dtos;

public class UserDataDto {

    private String email;

    private String username;

    private ShoppingBagExportDto shoppingBag;

    public UserDataDto(String email, String username, ShoppingBagExportDto shoppingBag) {
        this.email = email;
        this.username = username;
        this.shoppingBag = shoppingBag;
    }

    public UserDataDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setShoppingBag(ShoppingBagExportDto shoppingBag) {
        this.shoppingBag = shoppingBag;
    }

    public String getUsername() {
        return username;
    }

    public ShoppingBagExportDto getShoppingBag() {
        return shoppingBag;
    }
}
