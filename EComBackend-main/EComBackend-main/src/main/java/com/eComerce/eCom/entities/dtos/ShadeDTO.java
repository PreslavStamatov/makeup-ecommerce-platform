package com.eComerce.eCom.entities.dtos;

public class ShadeDTO {

    private String name;

    private String undertone;

    private String color;

    public ShadeDTO(String name, String undertone, String color) {
        this.name = name;
        this.undertone = undertone;
        this.color = color;
    }

    public ShadeDTO() {
        this.name = "empty";
        this.color = "empty";
        this.undertone = "empty";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUndertone() {
        return undertone;
    }

    public void setUndertone(String undertone) {
        this.undertone = undertone;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
