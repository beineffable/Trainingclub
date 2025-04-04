// src/pages/api/payments/create-intent.js
import paymentService from '../../../api/paymentService';

/**
 * API endpoint to create a payment intent
 * Supports all Swiss payment methods: TWINT, PayPal, Klarna, and credit/debit cards
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { userId, amount, currency, paymentMethod, metadata } = req.body;
    
    // Validate required fields
    if (!userId || !amount || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create payment intent
    const paymentIntent = await paymentService.createPaymentIntent({
      amount,
      currency: currency || 'CHF',
      paymentMethod,
      metadata: metadata || {}
    });
    
    // Return payment intent details
    res.status(200).json(paymentIntent);
  } catch (err) {
    console.error('Payment intent creation error:', err.message);
    res.status(500).json({ error: `Payment Error: ${err.message}` });
  }
}
