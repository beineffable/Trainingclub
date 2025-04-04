// src/components/PaymentProcessor.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import paymentService from '../api/paymentService';

/**
 * Payment Processor component
 * Handles the payment flow using Stripe
 */
const PaymentProcessor = ({
  amount,
  currency = 'CHF',
  onPaymentComplete,
  onCancel,
  metadata = {}
}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        // Initialize payment service
        await paymentService.initialize();
        
        // Load Stripe
        const stripe = await loadStripe(paymentService.config.publicKey);
        setStripePromise(stripe);
      } catch (error) {
        console.error('Failed to initialize Stripe:', error);
        setError('Failed to initialize payment system. Please try again later.');
      }
    };

    initializeStripe();
  }, []);

  // Create payment intent
  useEffect(() => {
    const createIntent = async () => {
      if (!stripePromise) return;
      
      setLoading(true);
      try {
        // Create payment intent
        const intent = await paymentService.createPaymentIntent({
          amount,
          currency,
          paymentMethod: 'card', // Default to card, will be updated by user selection
          metadata
        });
        
        setPaymentIntent(intent);
      } catch (error) {
        console.error('Failed to create payment intent:', error);
        setError('Failed to prepare payment. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [stripePromise, amount, currency, metadata]);

  // Handle payment completion
  const handlePaymentComplete = (result) => {
    if (onPaymentComplete) {
      onPaymentComplete(result);
    }
  };

  // Handle payment cancellation
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-600">Preparing payment...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p className="font-medium">Payment Error</p>
        <p>{error}</p>
        <button
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          onClick={handleCancel}
        >
          Go Back
        </button>
      </div>
    );
  }

  // Show payment form
  return (
    <div>
      {paymentIntent && stripePromise ? (
        <Elements stripe={stripePromise}>
          <PaymentForm
            paymentIntent={paymentIntent}
            amount={amount}
            currency={currency}
            onPaymentComplete={handlePaymentComplete}
            onCancel={handleCancel}
          />
        </Elements>
      ) : (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
          <p>Preparing payment system...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentProcessor;
