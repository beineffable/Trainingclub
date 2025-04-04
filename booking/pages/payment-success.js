// src/pages/payment-success.js
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Button from '../components/Button';

/**
 * Payment Success Page
 * Displayed after successful payment processing
 */
const PaymentSuccessPage = () => {
  const router = useRouter();
  const { session_id } = router.query;
  
  useEffect(() => {
    // In a real implementation, this would verify the payment session
    console.log('Verifying payment session:', session_id);
  }, [session_id]);
  
  return (
    <Layout title="Payment Successful">
      <div className="max-w-md mx-auto my-12">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">
              Thank you for your payment. Your transaction has been completed successfully.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => router.push('/classes')}
            >
              Book a Class
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/profile')}
            >
              View My Profile
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccessPage;
