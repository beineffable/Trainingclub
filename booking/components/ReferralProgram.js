// src/components/ReferralProgram.js
import React, { useState } from 'react';
import Button from './Button';

/**
 * Referral Program component
 * Allows users to share their referral code and track referrals
 */
const ReferralProgram = ({ referralCode, referralsCount, creditsEarned }) => {
  const [copied, setCopied] = useState(false);
  
  // Handle copy referral code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };
  
  // Handle share via email
  const handleShareEmail = () => {
    const subject = 'Join me at Training Club!';
    const body = `I thought you might be interested in joining Training Club! Use my referral code ${referralCode} when you sign up and we'll both get free credits. Check it out at trainingclub.vercel.app`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  // Handle share via WhatsApp
  const handleShareWhatsApp = () => {
    const text = `Join me at Training Club! Use my referral code ${referralCode} when you sign up and we'll both get free credits. Check it out at trainingclub.vercel.app`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-primary-50 border-b border-primary-100">
        <h3 className="text-lg font-medium text-gray-900">Refer Friends, Earn Credits</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Share your unique referral code with friends. When they sign up, you'll both receive 2 free class credits!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="w-full sm:flex-1 bg-gray-100 p-3 rounded-lg font-medium text-gray-800 text-center">
              {referralCode}
            </div>
            <Button
              variant={copied ? "success" : "primary"}
              onClick={handleCopyCode}
            >
              {copied ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Share via</h4>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShareEmail}
            >
              Email
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleShareWhatsApp}
            >
              WhatsApp
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Your Referral Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{referralsCount}</div>
              <p className="text-sm text-gray-600">Friends Referred</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{creditsEarned}</div>
              <p className="text-sm text-gray-600">Credits Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;
