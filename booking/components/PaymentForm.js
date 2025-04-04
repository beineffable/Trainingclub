// src/components/PaymentForm.js
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from './Button';
import PaymentMethodSelector from './PaymentMethodSelector';
import paymentService from '../api/paymentService';

/**
 * Payment Form component
 * Handles payment form submission and processing
 */
const PaymentForm = ({
  paymentIntent,
  amount,
  currency = 'CHF',
  onPaymentComplete,
  onCancel,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      city: '',
      postal_code: '',
      country: 'CH',
    },
  });

  // Handle input changes for billing details
  const handleBillingInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingDetails({
        ...billingDetails,
        [parent]: {
          ...billingDetails[parent],
          [child]: value
        }
      });
    } else {
      setBillingDetails({
        ...billingDetails,
        [name]: value
      });
    }
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    try {
      let paymentResult;
      
      if (paymentMethod === 'card') {
        // Process card payment
        const cardElement = elements.getElement(CardElement);
        
        if (!cardElement) {
          throw new Error('Card element not found');
        }
        
        // Validate billing details
        if (!billingDetails.name) {
          throw new Error('Please provide your name');
        }
        
        // Create payment method
        const { error, paymentMethod: stripePaymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: billingDetails
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Confirm payment
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentIntent.clientSecret,
          {
            payment_method: stripePaymentMethod.id
          }
        );
        
        if (confirmError) {
          throw new Error(confirmError.message);
        }
        
        // Process payment
        paymentResult = await paymentService.processPayment({
          paymentIntentId: paymentIntent.paymentIntentId,
          paymentMethod: 'card',
          paymentMethodData: {
            id: stripePaymentMethod.id,
            amount,
            currency
          }
        });
      } else {
        // For other payment methods (TWINT, PayPal, Klarna)
        // In a real implementation, this would redirect to the payment provider
        
        // Simulate redirect and processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Process payment
        paymentResult = await paymentService.processPayment({
          paymentIntentId: paymentIntent.paymentIntentId,
          paymentMethod,
          paymentMethodData: {
            amount,
            currency
          }
        });
      }
      
      // Handle successful payment
      if (paymentResult.success) {
        onPaymentComplete(paymentResult);
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Format amount for display
  const formattedAmount = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency
  }).format(amount / 100);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Payment Error</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className="card">
        <PaymentMethodSelector
          selectedMethod={paymentMethod}
          onMethodChange={handlePaymentMethodChange}
          countryCode="CH"
        />
      </div>
      
      {paymentMethod === 'card' && (
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Card Details</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={billingDetails.name}
                onChange={handleBillingInputChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={billingDetails.email}
                onChange={handleBillingInputChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label>
              <div className="border border-gray-300 rounded-md shadow-sm p-3 focus-within:ring-1 focus-within:ring-primary-500 focus-within:border-primary-500">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === 'twint' && (
        <div className="card text-center p-6">
          <img 
            src="/assets/twint.svg" 
            alt="TWINT" 
            className="h-12 w-auto mx-auto mb-4" 
          />
          <p className="text-gray-600 mb-4">
            You will be redirected to TWINT to complete your payment of {formattedAmount}.
          </p>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className="card text-center p-6">
          <img 
            src="/assets/paypal.svg" 
            alt="PayPal" 
            className="h-12 w-auto mx-auto mb-4" 
          />
          <p className="text-gray-600 mb-4">
            You will be redirected to PayPal to complete your payment of {formattedAmount}.
          </p>
        </div>
      )}
      
      {paymentMethod === 'klarna' && (
        <div className="card text-center p-6">
          <img 
            src="/assets/klarna.svg" 
            alt="Klarna" 
            className="h-12 w-auto mx-auto mb-4" 
          />
          <p className="text-gray-600 mb-4">
            You will be redirected to Klarna to complete your payment of {formattedAmount}.
          </p>
        </div>
      )}
      
      <div className="flex space-x-3">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={isProcessing || !stripe}
        >
          {isProcessing ? 'Processing...' : `Pay ${formattedAmount}`}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          disabled={isProcessing}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 text-center">
        Your payment is secure and encrypted. By completing this payment, you agree to our Terms of Service.
      </p>
    </form>
  );
};

export default PaymentForm;
