// src/pages/checkout.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PaymentProcessor from '../components/PaymentProcessor';
import PaymentSummary from '../components/PaymentSummary';
import usePayment from '../hooks/usePayment';

/**
 * Checkout Page
 * Handles the checkout process with payment integration
 */
const CheckoutPage = () => {
  const router = useRouter();
  const { plan, term } = router.query;
  
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { loading, error } = usePayment();

  // Set up payment details based on selected plan
  useEffect(() => {
    if (!plan) return;
    
    // In a real implementation, this would fetch plan details from the API
    const planDetails = {
      standard: {
        name: 'Standard Membership',
        price: 19900, // 199.00 CHF
        term: {
          monthly: { multiplier: 1, name: 'Monthly' },
          term: { multiplier: 3, name: 'Term (3 months)', discount: 10 },
          annual: { multiplier: 12, name: 'Annual', discount: 20 }
        }
      },
      elite: {
        name: 'Elite Membership',
        price: 29900, // 299.00 CHF
        term: {
          monthly: { multiplier: 1, name: 'Monthly' },
          term: { multiplier: 3, name: 'Term (3 months)', discount: 10 },
          annual: { multiplier: 12, name: 'Annual', discount: 20 }
        }
      },
      sessions10: {
        name: '10 Sessions Package',
        price: 149900, // 1499.00 CHF
        term: {
          once: { multiplier: 1, name: 'One-time payment' }
        }
      },
      sessions20: {
        name: '20 Sessions Package',
        price: 279900, // 2799.00 CHF
        term: {
          once: { multiplier: 1, name: 'One-time payment' }
        }
      }
    };
    
    const selectedPlan = planDetails[plan];
    const selectedTerm = term || Object.keys(selectedPlan.term)[0];
    const termDetails = selectedPlan.term[selectedTerm];
    
    // Calculate payment details
    const basePrice = selectedPlan.price;
    const multiplier = termDetails.multiplier;
    const subtotal = basePrice * multiplier;
    const discountPercent = termDetails.discount || 0;
    const discount = Math.round(subtotal * (discountPercent / 100));
    const total = subtotal - discount;
    
    setPaymentDetails({
      items: [
        {
          name: `${selectedPlan.name} - ${termDetails.name}`,
          price: basePrice * multiplier
        }
      ],
      subtotal,
      discount,
      total,
      currency: 'CHF',
      metadata: {
        plan,
        term: selectedTerm,
        planName: selectedPlan.name,
        termName: termDetails.name
      }
    });
  }, [plan, term]);

  // Handle payment completion
  const handlePaymentComplete = (result) => {
    console.log('Payment completed:', result);
    setPaymentComplete(true);
    
    // Redirect to success page
    router.push({
      pathname: '/payment-success',
      query: { session_id: result.paymentId }
    });
  };

  // Handle payment cancellation
  const handleCancel = () => {
    router.push('/memberships');
  };

  // Show loading state
  if (!paymentDetails) {
    return (
      <Layout title="Checkout">
        <div className="max-w-4xl mx-auto my-12 px-4">
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Checkout">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Details</h2>
                
                <PaymentProcessor
                  amount={paymentDetails.total}
                  currency={paymentDetails.currency}
                  onPaymentComplete={handlePaymentComplete}
                  onCancel={handleCancel}
                  metadata={paymentDetails.metadata}
                />
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <PaymentSummary
                  items={paymentDetails.items}
                  subtotal={paymentDetails.subtotal}
                  discount={paymentDetails.discount}
                  total={paymentDetails.total}
                  currency={paymentDetails.currency}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
