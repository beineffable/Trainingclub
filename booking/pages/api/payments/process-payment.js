// src/pages/api/payments/process-payment.js
import paymentService from '../../../api/paymentService';

/**
 * API endpoint to process a payment
 * Handles payment processing for all Swiss payment methods
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { paymentIntentId, paymentMethod, paymentMethodData } = req.body;
    
    // Validate required fields
    if (!paymentIntentId || !paymentMethod || !paymentMethodData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Process payment
    const paymentResult = await paymentService.processPayment({
      paymentIntentId,
      paymentMethod,
      paymentMethodData
    });
    
    // Return payment result
    res.status(200).json(paymentResult);
  } catch (err) {
    console.error('Payment processing error:', err.message);
    res.status(500).json({ error: `Payment Error: ${err.message}` });
  }
}
