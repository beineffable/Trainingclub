// src/pages/register.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import AccessCodeRegistration from '../components/AccessCodeRegistration';
import Button from '../components/Button';

/**
 * Registration Page
 * Handles user registration with access code validation
 */
const RegisterPage = () => {
  const router = useRouter();
  const { referralCode } = router.query;
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  // Handle successful registration
  const handleRegister = async (userData) => {
    console.log('Registration data:', userData);
    
    // In a real implementation, this would submit to the API
    // For now, simulate successful registration
    setRegistrationComplete(true);
    
    // Redirect to login page after 3 seconds
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  };
  
  return (
    <Layout title="Register">
      <div className="max-w-2xl mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Training Club</h1>
        
        {registrationComplete ? (
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your account has been created successfully. You will be redirected to the login page shortly.
            </p>
            <Button
              variant="primary"
              onClick={() => router.push('/login')}
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-8">
              Training Club is an exclusive fitness community. To join, you need an access code from a current member or trainer.
            </p>
            
            <AccessCodeRegistration 
              onRegister={handleRegister}
              initialAccessCode={referralCode}
            />
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Log in
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default RegisterPage;
