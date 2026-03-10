package com.eComerce.eCom.entities.dtos;

import com.eComerce.eCom.entities.Comment;
import com.eComerce.eCom.entities.ProductType;
import com.eComerce.eCom.entities.SellType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.List;
import java.util.Set;

public class MakeupExportDTO {

    private String name;

    private double rating;

    private String price;

    private String image;

    private Set<ShadeDTO> shades;

    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Enumerated(EnumType.STRING)
    private SellType sellType;

    private List<CommentDTO> comments;

    public MakeupExportDTO() {
    }

    public MakeupExportDTO(String name, double rating, String price, String image, Set<ShadeDTO> shades, ProductType productType, SellType sellType, List<CommentDTO> comments) {
        this.name = name;
        this.rating = rating;
        this.price = price;
        this.image = image;
        this.shades = shades;
        this.productType = productType;
        this.sellType = sellType;
        this.comments = comments;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public SellType getSellType() {
        return sellType;
    }

    public void setSellType(SellType sellType) {
        this.sellType = sellType;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Set<ShadeDTO> getShades() {
        return shades;
    }

    public void setShades(Set<ShadeDTO> shades) {
        this.shades = shades;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
