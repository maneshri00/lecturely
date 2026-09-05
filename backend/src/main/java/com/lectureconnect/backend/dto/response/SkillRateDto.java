package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;

public class SkillRateDto {
    private String area;
    private BigDecimal fee;

    public SkillRateDto() {}

    public SkillRateDto(String area, BigDecimal fee) {
        this.area = area;
        this.fee = fee;
    }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public BigDecimal getFee() { return fee; }
    public void setFee(BigDecimal fee) { this.fee = fee; }
}
