package com.eComerce.eCom.entities;

import jakarta.persistence.*;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "makeup")
public class Makeup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private double rating;

    private String price;

    private String image;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name = "makeup_shades",
            joinColumns = @JoinColumn(name = "makeup_id"),
            inverseJoinColumns = @JoinColumn(name = "shade_id"))

    private Set<Shade> shades;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type")
    private ProductType productType;

    @Enumerated(EnumType.STRING)
    private SellType sellType;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "makeup_id")
    private List<Comment> comments;

    public Makeup(String name, double rating, double price, String image, Set<Shade> shades, ProductType productType, SellType sellType) {
        this.name = name;
        this.rating = rating;
        this.price = setPrice(price);
        this.image = image;
        this.shades = shades;
        this.productType = productType;
        this.sellType = sellType;
        this.comments = new ArrayList<>();
    }

    public Makeup() {
    }

    public void addComment (Comment comment) {
        this.comments.add(comment);
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public SellType getSellType() {
        return sellType;
    }

    public void setSellType(SellType sellType) {
        this.sellType = sellType;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String setPrice(double price) {
        DecimalFormat df = new DecimalFormat("#.00");
        return this.price = df.format(price);
    }

    public Set<Shade> getShades() {
        return shades;
    }

    public void setShades(Set<Shade> shades) {
        this.shades = shades;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
