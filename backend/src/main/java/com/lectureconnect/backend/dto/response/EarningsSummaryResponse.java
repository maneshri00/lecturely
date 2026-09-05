package com.lectureconnect.backend.dto.response;

import java.math.BigDecimal;
import java.util.List;

public class EarningsSummaryResponse {
    private BigDecimal totalEarned;
    private BigDecimal platformFeesDeducted;
    private BigDecimal netEarnings;
    private List<MonthlyEarning> monthlyBreakdown;

    public EarningsSummaryResponse() {}

    public EarningsSummaryResponse(BigDecimal totalEarned, BigDecimal platformFeesDeducted, BigDecimal netEarnings, List<MonthlyEarning> monthlyBreakdown) {
        this.totalEarned = totalEarned;
        this.platformFeesDeducted = platformFeesDeducted;
        this.netEarnings = netEarnings;
        this.monthlyBreakdown = monthlyBreakdown;
    }

    public BigDecimal getTotalEarned() { return totalEarned; }
    public void setTotalEarned(BigDecimal totalEarned) { this.totalEarned = totalEarned; }

    public BigDecimal getPlatformFeesDeducted() { return platformFeesDeducted; }
    public void setPlatformFeesDeducted(BigDecimal platformFeesDeducted) { this.platformFeesDeducted = platformFeesDeducted; }

    public BigDecimal getNetEarnings() { return netEarnings; }
    public void setNetEarnings(BigDecimal netEarnings) { this.netEarnings = netEarnings; }

    public List<MonthlyEarning> getMonthlyBreakdown() { return monthlyBreakdown; }
    public void setMonthlyBreakdown(List<MonthlyEarning> monthlyBreakdown) { this.monthlyBreakdown = monthlyBreakdown; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private BigDecimal totalEarned;
        private BigDecimal platformFeesDeducted;
        private BigDecimal netEarnings;
        private List<MonthlyEarning> monthlyBreakdown;

        public Builder totalEarned(BigDecimal totalEarned) { this.totalEarned = totalEarned; return this; }
        public Builder platformFeesDeducted(BigDecimal platformFeesDeducted) { this.platformFeesDeducted = platformFeesDeducted; return this; }
        public Builder netEarnings(BigDecimal netEarnings) { this.netEarnings = netEarnings; return this; }
        public Builder monthlyBreakdown(List<MonthlyEarning> monthlyBreakdown) { this.monthlyBreakdown = monthlyBreakdown; return this; }

        public EarningsSummaryResponse build() {
            return new EarningsSummaryResponse(totalEarned, platformFeesDeducted, netEarnings, monthlyBreakdown);
        }
    }

    public static class MonthlyEarning {
        private String month;
        private BigDecimal amount;

        public MonthlyEarning() {}
        public MonthlyEarning(String month, BigDecimal amount) {
            this.month = month;
            this.amount = amount;
        }

        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }

        public BigDecimal getAmount() { return amount; }
        public void setAmount(BigDecimal amount) { this.amount = amount; }
    }
}
