package com.eComerce.eCom.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "bought_makeup")
public class BoughtMakeup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "makeup_id")
    private Makeup makeup;

    @ManyToOne
    @JoinColumn(name = "shade_id", nullable = true)
    private Shade shade;

    @ManyToMany(mappedBy = "products")
    private List<ShoppingBag> shoppingBag;

    private int quantity;

    public BoughtMakeup(Makeup makeup, Shade shade) {
        this.makeup = makeup;
        this.shade = shade;
        this.quantity = 1;
    }

    public BoughtMakeup() {
        this.quantity = 1;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Makeup getMakeup() {
        return makeup;
    }

    public void setMakeup(Makeup makeup) {
        this.makeup = makeup;
    }

    public Shade getShade() {
        return shade;
    }

    public void setShade(Shade shade) {
        this.shade = shade;
    }

    public List<ShoppingBag> getShoppingBag() {
        return shoppingBag;
    }

    public void setShoppingBag(List<ShoppingBag> shoppingBag) {
        this.shoppingBag = shoppingBag;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof BoughtMakeup) {
            return equals((BoughtMakeup) obj);
        }
        return false;
    }

    public boolean equals(BoughtMakeup boughtMakeup) {
        if (boughtMakeup == null) return false;
        return this.makeup.getName().equals(boughtMakeup.makeup.getName()) && this.shade.getName().equals(boughtMakeup.getShade().getName());
    }
}
