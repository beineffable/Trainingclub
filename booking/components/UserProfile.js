// src/components/UserProfile.js
import React from 'react';
import Button from './Button';

/**
 * User Profile component
 * Displays user information, membership details, and credits
 */
const UserProfile = ({ user, onEditProfile, onManageMembership }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary-700">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onEditProfile}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      
      {/* Membership Details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Membership Details</h3>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-medium text-gray-900">{user.membership.name}</h4>
              <p className="text-sm text-gray-600">{user.membership.description}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              user.membership.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {user.membership.status === 'active' ? 'Active' : 'Paused'}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan</span>
              <span className="font-medium text-gray-900">{user.membership.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Billing Cycle</span>
              <span className="font-medium text-gray-900">{user.membership.billingCycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Billing Date</span>
              <span className="font-medium text-gray-900">{new Date(user.membership.nextBillingDate).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={onManageMembership}
            >
              Manage Membership
            </Button>
          </div>
        </div>
      </div>
      
      {/* Credits */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Credits</h3>
        </div>
        <div className="p-6">
          {user.membership.type === 'unlimited' ? (
            <div className="text-center py-4">
              <div className="text-3xl font-bold text-primary-600">Unlimited</div>
              <p className="text-gray-600 mt-2">Your membership includes unlimited classes</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">Available Credits</h4>
                  <p className="text-sm text-gray-600">Credits reset on {new Date(user.membership.resetDate).toLocaleDateString()}</p>
                </div>
                <div className="text-3xl font-bold text-primary-600">{user.credits.available}</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{ width: `${(user.credits.available / user.credits.total) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600 text-right">
                {user.credits.available} of {user.credits.total} credits remaining
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Referral Code */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Referral Program</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Share your referral code with friends and earn free credits when they sign up!
          </p>
          
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-100 p-3 rounded-lg font-medium text-gray-800 text-center">
              {user.referralCode}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(user.referralCode);
                alert('Referral code copied to clipboard!');
              }}
            >
              Copy
            </Button>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            You've referred {user.referrals.count} friends and earned {user.referrals.creditsEarned} credits so far.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
