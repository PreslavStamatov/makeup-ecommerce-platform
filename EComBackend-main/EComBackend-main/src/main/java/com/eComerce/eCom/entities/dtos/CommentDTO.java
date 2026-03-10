package com.eComerce.eCom.entities.dtos;

public class CommentDTO {

    private String text;

    private UserDTO user;

    private double rating;

    public CommentDTO(String text, UserDTO user, double rating) {
        this.text = text;
        this.user = user;
        this.rating = rating;
    }

    public CommentDTO() {
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
