// src/pages/payment-cancel.js
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';

/**
 * Payment Cancel Page
 * Displayed when payment is cancelled or fails
 */
const PaymentCancelPage = () => {
  const router = useRouter();
  
  return (
    <Layout title="Payment Cancelled">
      <div className="max-w-md mx-auto my-12">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Cancelled</h2>
            <p className="text-gray-600 mt-2">
              Your payment was cancelled. No charges were made to your account.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push('/memberships')}
            >
              Try Again
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/')}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancelPage;
