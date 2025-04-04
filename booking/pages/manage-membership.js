// src/pages/manage-membership.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import HolidayPause from '../components/HolidayPause';
import Button from '../components/Button';

/**
 * Manage Membership Page
 * Allows users to manage their membership, including holiday pauses
 */
const ManageMembershipPage = () => {
  const router = useRouter();
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch membership details
  useEffect(() => {
    const fetchMembership = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockMembership = {
          id: 'mem-123',
          name: 'Elite Membership',
          description: 'Access to all classes including premium',
          plan: 'Elite',
          type: 'credits',
          status: 'active',
          billingCycle: 'Monthly',
          nextBillingDate: '2025-05-01T00:00:00.000Z',
          resetDate: '2025-05-01T00:00:00.000Z',
          pauseDaysRemaining: 28,
          pauseDaysUsed: 0
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMembership(mockMembership);
      } catch (error) {
        console.error('Failed to fetch membership:', error);
        setError('Failed to load membership details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembership();
  }, []);
  
  // Handle pause membership
  const handlePauseMembership = (pauseData) => {
    console.log('Pause membership:', pauseData);
    
    // Update membership status locally for demo
    setMembership({
      ...membership,
      status: 'paused',
      pauseStartDate: pauseData.startDate,
      pauseEndDate: pauseData.endDate
    });
  };
  
  // Handle resume membership
  const handleResumeMembership = (membershipId) => {
    console.log('Resume membership:', membershipId);
    
    // Update membership status locally for demo
    setMembership({
      ...membership,
      status: 'active',
      pauseStartDate: null,
      pauseEndDate: null
    });
  };
  
  // Handle cancel membership
  const handleCancelMembership = () => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to cancel your membership? This action cannot be undone.')) {
      console.log('Cancel membership');
      
      // In a real implementation, this would call the API
      // For now, show alert
      alert('Your membership has been cancelled. You will receive a confirmation email shortly.');
      
      // Redirect to home page
      router.push('/');
    }
  };
  
  return (
    <Layout title="Manage Membership">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Membership</h1>
          
          <Button
            variant="outline"
            onClick={() => router.push('/profile')}
          >
            Back to Profile
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading membership details...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Membership Details */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Membership Details</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{membership.name}</h4>
                    <p className="text-sm text-gray-600">{membership.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    membership.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {membership.status === 'active' ? 'Active' : 'Paused'}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium text-gray-900">{membership.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Cycle</span>
                    <span className="font-medium text-gray-900">{membership.billingCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Billing Date</span>
                    <span className="font-medium text-gray-900">{new Date(membership.nextBillingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Holiday Pause Days Remaining</span>
                    <span className="font-medium text-gray-900">{membership.pauseDaysRemaining} days</span>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/memberships')}
                  >
                    Change Plan
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Holiday Pause */}
            <HolidayPause
              membership={membership}
              onPause={handlePauseMembership}
              onResume={handleResumeMembership}
            />
            
            {/* Cancel Membership */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-red-50 border-b border-red-100">
                <h3 className="text-lg font-medium text-gray-900">Cancel Membership</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  We're sorry to see you go. If you cancel your membership, you will lose access to all member benefits at the end of your current billing period.
                </p>
                
                <Button
                  variant="danger"
                  onClick={handleCancelMembership}
                >
                  Cancel Membership
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManageMembershipPage;
