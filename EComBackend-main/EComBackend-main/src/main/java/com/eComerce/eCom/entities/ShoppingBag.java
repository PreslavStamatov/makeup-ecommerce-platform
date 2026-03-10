package com.eComerce.eCom.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Entity
@Table(name = "shopping_bag")
public class ShoppingBag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany
    @JoinTable(
            name = "shopping_bag_bought_makeup", // The name of the join table
            joinColumns = @JoinColumn(name = "shopping_bag_id", nullable = false), // Foreign key to ShoppingBag
            inverseJoinColumns = @JoinColumn(name = "bought_makeup_id", nullable = false) // Foreign key to BoughtMakeup
    )
    private List<BoughtMakeup> products;

    public ShoppingBag(List<BoughtMakeup> products) {
        this.products = products;
    }

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public ShoppingBag() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public BoughtMakeup getProductFromBag(BoughtMakeup searchedProduct) {
        List<BoughtMakeup> list = this.products.stream().filter(boughtMakeup -> boughtMakeup.equals(searchedProduct)).toList();
        return list.get(0);
    }

    public List<BoughtMakeup> getProducts() {
        return products;
    }

    public void setProducts(List<BoughtMakeup> products) {
        this.products = products;
    }

    public void addToShoppingBag(BoughtMakeup makeup) {this.products.add(makeup);}
}
