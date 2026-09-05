package com.lectureconnect.backend.payment;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.UUID;

@Service
@Primary
public class MockPaymentService implements PaymentService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(MockPaymentService.class);

    @Override
    public PaymentOrderResult createOrder(BigDecimal amount, String currency, String bookingRef) {
        String orderId = "MOCK_ORDER_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        log.info("[MOCK PAYMENT] Created order {} for ₹{}", orderId, amount);
        return new PaymentOrderResult(orderId, amount, currency, true);
    }

    @Override
    public PaymentVerificationResult verifyPayment(String orderId, String paymentId, String signature) {
        String txnId = "MOCK_TXN_" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        log.info("[MOCK PAYMENT] Verified payment {} → txn: {}", paymentId, txnId);
        return new PaymentVerificationResult(true, txnId, "Mock payment successful");
    }
}
