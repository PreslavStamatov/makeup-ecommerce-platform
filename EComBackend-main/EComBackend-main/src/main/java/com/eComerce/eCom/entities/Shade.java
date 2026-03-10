package com.eComerce.eCom.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "shades")
public class Shade {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;


    private String name;

    private String undertone;

    private String color;

    @ManyToMany(fetch = FetchType.LAZY ,cascade = CascadeType.REFRESH, mappedBy = "shades")
    private Set<Makeup> makeup;

    public Shade(String name, String undertone, String color, Set<Makeup> makeup) {
        this.name = name;
        this.undertone = undertone;
        this.color = color;
        this.makeup = makeup;
    }

    public Shade() {
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

    public String getUndertone() {
        return undertone;
    }

    public void setUndertone(String undertone) {
        this.undertone = undertone;
    }

    public Set<Makeup> getMakeup() {
        return makeup;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setMakeup(Set<Makeup> makeup) {
        this.makeup = makeup;
    }
}
