package com.lectureconnect.backend.payment;
import java.math.BigDecimal;

public interface PaymentService {
    PaymentOrderResult createOrder(BigDecimal amount, String currency, String bookingRef);
    PaymentVerificationResult verifyPayment(String orderId, String paymentId, String signature);

    record PaymentOrderResult(String orderId, BigDecimal amount, String currency, boolean success) {}
    record PaymentVerificationResult(boolean success, String transactionId, String message) {}
}
