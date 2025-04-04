// src/api/payments.js
import prisma from '../lib/prisma';
import dotenv from 'dotenv';

dotenv.config();

// This would be replaced with actual Stripe implementation
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

/**
 * Create a payment intent for Stripe
 * @param {string} userId - User ID
 * @param {number} amount - Payment amount in cents
 * @param {string} currency - Currency code (default: CHF)
 * @param {string} paymentMethod - Payment method (card, twint, paypal, klarna)
 * @param {Object} metadata - Additional metadata for the payment
 * @returns {Object} - Payment intent details
 */
export async function createPaymentIntent(userId, amount, currency = 'CHF', paymentMethod, metadata = {}) {
  // In a real implementation, this would call the Stripe API
  // For now, we'll simulate the response
  
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // Create a payment record in pending state
  const payment = await prisma.payment.create({
    data: {
      userId,
      amount: amount / 100, // Convert cents to currency units
      currency,
      paymentMethod,
      paymentStatus: 'PENDING',
      // Include membership ID if provided in metadata
      membershipId: metadata.membershipId || null
    }
  });
  
  // In a real implementation, this would be the Stripe payment intent
  const paymentIntent = {
    id: `pi_${Math.random().toString(36).substring(2, 15)}`,
    amount,
    currency,
    status: 'requires_payment_method',
    client_secret: `seti_${Math.random().toString(36).substring(2, 15)}_secret_${Math.random().toString(36).substring(2, 15)}`,
    payment_method_types: getPaymentMethodTypes(paymentMethod)
  };
  
  // Update the payment record with the Stripe payment ID
  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      stripePaymentId: paymentIntent.id
    }
  });
  
  return {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    amount,
    currency,
    paymentMethodTypes: paymentIntent.payment_method_types,
    publicKey: stripePublicKey
  };
}

/**
 * Handle Stripe webhook events
 * @param {Object} event - Stripe webhook event
 * @returns {Object} - Processing result
 */
export async function handleStripeWebhook(event) {
  // In a real implementation, this would verify and process Stripe webhook events
  // For now, we'll simulate the processing
  
  const { type, data } = event;
  
  switch (type) {
    case 'payment_intent.succeeded':
      return await handlePaymentSuccess(data.object);
    
    case 'payment_intent.payment_failed':
      return await handlePaymentFailure(data.object);
    
    default:
      return { received: true, processed: false, message: `Unhandled event type: ${type}` };
  }
}

/**
 * Handle successful payment
 * @param {Object} paymentIntent - Stripe payment intent object
 * @returns {Object} - Processing result
 */
async function handlePaymentSuccess(paymentIntent) {
  // Find the payment record
  const payment = await prisma.payment.findFirst({
    where: {
      stripePaymentId: paymentIntent.id,
      paymentStatus: 'PENDING'
    }
  });
  
  if (!payment) {
    return { received: true, processed: false, message: 'Payment not found or already processed' };
  }
  
  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      paymentStatus: 'COMPLETED'
    }
  });
  
  // If this payment is for a membership, activate it
  if (payment.membershipId) {
    await prisma.userMembership.update({
      where: { id: payment.membershipId },
      data: {
        status: 'ACTIVE'
      }
    });
  }
  
  return { received: true, processed: true, message: 'Payment processed successfully' };
}

/**
 * Handle failed payment
 * @param {Object} paymentIntent - Stripe payment intent object
 * @returns {Object} - Processing result
 */
async function handlePaymentFailure(paymentIntent) {
  // Find the payment record
  const payment = await prisma.payment.findFirst({
    where: {
      stripePaymentId: paymentIntent.id,
      paymentStatus: 'PENDING'
    }
  });
  
  if (!payment) {
    return { received: true, processed: false, message: 'Payment not found or already processed' };
  }
  
  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      paymentStatus: 'FAILED'
    }
  });
  
  return { received: true, processed: true, message: 'Payment failure recorded' };
}

/**
 * Get user's payment history
 * @param {string} userId - User ID
 * @returns {Array} - List of payments
 */
export async function getUserPayments(userId) {
  const payments = await prisma.payment.findMany({
    where: {
      userId
    },
    include: {
      membership: {
        include: {
          plan: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return payments;
}

/**
 * Get payment method types based on selected method
 * @param {string} method - Selected payment method
 * @returns {Array} - List of payment method types for Stripe
 */
function getPaymentMethodTypes(method) {
  switch (method) {
    case 'card':
      return ['card'];
    case 'twint':
      return ['eps']; // Using EPS as a placeholder for TWINT
    case 'paypal':
      return ['paypal'];
    case 'klarna':
      return ['klarna'];
    default:
      return ['card', 'eps', 'paypal', 'klarna'];
  }
}
