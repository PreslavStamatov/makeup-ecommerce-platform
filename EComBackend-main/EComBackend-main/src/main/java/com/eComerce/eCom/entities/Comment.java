package com.eComerce.eCom.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private int rating;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    public Comment(Long id, String text, int rating, UserEntity user) {
        this.id = id;
        this.text = text;
        this.rating = rating;
        this.user = user;
    }

    public Comment(String text, int rating) {
        this.text = text;
        this.rating = rating;
    }

    public Comment() {
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
