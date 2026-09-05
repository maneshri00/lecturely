package com.lectureconnect.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "expert_expertise")
public class ExpertExpertise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "expert_id", nullable = false)
    private Long expertId;

    @Column(nullable = false)
    private String area;

    @Column
    private BigDecimal fee;

    public ExpertExpertise() {}

    public ExpertExpertise(Long id, Long expertId, String area, BigDecimal fee) {
        this.id = id;
        this.expertId = expertId;
        this.area = area;
        this.fee = fee;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public BigDecimal getFee() { return fee; }
    public void setFee(BigDecimal fee) { this.fee = fee; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long expertId;
        private String area;
        private BigDecimal fee;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder expertId(Long expertId) { this.expertId = expertId; return this; }
        public Builder area(String area) { this.area = area; return this; }
        public Builder fee(BigDecimal fee) { this.fee = fee; return this; }

        public ExpertExpertise build() {
            return new ExpertExpertise(id, expertId, area, fee);
        }
    }
}
