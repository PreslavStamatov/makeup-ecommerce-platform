package com.eComerce.eCom.entities.dtos;

public class AddCommentDTO {

    private String makeupName;

    private String commentText;

    private int rating;

    public AddCommentDTO(String makeupName, String commentText, int rating) {
        this.makeupName = makeupName;
        this.commentText = commentText;
        this.rating = rating;
    }

    public AddCommentDTO() {
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getMakeupName() {
        return makeupName;
    }

    public void setMakeupName(String makeupName) {
        this.makeupName = makeupName;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }
}
