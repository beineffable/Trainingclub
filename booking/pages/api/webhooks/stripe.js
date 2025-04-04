// src/pages/api/webhooks/stripe.js
import { buffer } from 'micro';
import paymentService from '../../../api/paymentService';

// Disable body parsing, need raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Stripe webhook handler
 * Processes webhook events from Stripe for payment notifications
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Get the raw body as a buffer
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'];
    
    // In a real implementation, this would verify the signature
    // const event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    
    // For now, just parse the JSON
    const event = JSON.parse(buf.toString());
    
    // Process the webhook event
    const result = await paymentService.handleWebhook(event);
    
    // Return success response
    res.status(200).json({ received: true, ...result });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
}
