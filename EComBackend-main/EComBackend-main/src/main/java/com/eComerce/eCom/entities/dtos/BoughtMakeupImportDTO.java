package com.eComerce.eCom.entities.dtos;

public class BoughtMakeupImportDTO {

    String makeupName;

    String shadeName;


    public BoughtMakeupImportDTO(String makeupName, String shadeName) {
        this.makeupName = makeupName;
        this.shadeName = shadeName;
    }

    public BoughtMakeupImportDTO() {
    }

    public String getMakeupName() {
        return makeupName;
    }

    public void setMakeupName(String makeupName) {
        this.makeupName = makeupName;
    }

    public String getShadeName() {
        return shadeName;
    }

    public void setShadeName(String shadeName) {
        this.shadeName = shadeName;
    }
}
