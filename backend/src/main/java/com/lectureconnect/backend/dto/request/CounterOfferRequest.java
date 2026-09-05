package com.lectureconnect.backend.dto.request;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CounterOfferRequest {

    @NotNull(message = "Proposed fee is required")
    @DecimalMin(value = "0", message = "Fee cannot be negative")
    private BigDecimal proposedFee;

    private String note;
    private LocalDateTime proposedDateTime;

    public CounterOfferRequest() {}

    public BigDecimal getProposedFee() { return proposedFee; }
    public void setProposedFee(BigDecimal proposedFee) { this.proposedFee = proposedFee; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }

    public LocalDateTime getProposedDateTime() { return proposedDateTime; }
    public void setProposedDateTime(LocalDateTime proposedDateTime) { this.proposedDateTime = proposedDateTime; }
}
