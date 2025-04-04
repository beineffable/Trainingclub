// src/hooks/usePayment.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for handling payment operations
 * Provides methods for creating and processing payments
 */
const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  /**
   * Create a payment intent
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} - Payment intent
   */
  const createPaymentIntent = useCallback(async (paymentDetails) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }
      
      const data = await response.json();
      setPaymentIntent(data);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Process a payment
   * @param {Object} paymentDetails - Payment details
   * @returns {Promise<Object>} - Payment result
   */
  const processPayment = useCallback(async (paymentDetails) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payments/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process payment');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    paymentIntent,
    createPaymentIntent,
    processPayment,
  };
};

export default usePayment;
