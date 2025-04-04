// src/pages/profile.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import UserProfile from '../components/UserProfile';
import Button from '../components/Button';

/**
 * Profile Page
 * Displays user profile, membership details, and credits
 */
const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockUser = {
          id: 'user-123',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '+41 76 123 45 67',
          createdAt: '2024-01-15T00:00:00.000Z',
          membership: {
            name: 'Elite Membership',
            description: 'Access to all classes including premium',
            plan: 'Elite',
            type: 'credits',
            status: 'active',
            billingCycle: 'Monthly',
            nextBillingDate: '2025-05-01T00:00:00.000Z',
            resetDate: '2025-05-01T00:00:00.000Z'
          },
          credits: {
            available: 8,
            total: 10,
            used: 2
          },
          referralCode: 'JOHNSMITH10',
          referrals: {
            count: 3,
            creditsEarned: 6
          }
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  // Handle edit profile
  const handleEditProfile = () => {
    // In a real implementation, this would navigate to an edit profile page
    console.log('Edit profile');
    
    alert('Edit profile functionality would open here');
  };
  
  // Handle manage membership
  const handleManageMembership = () => {
    // In a real implementation, this would navigate to a membership management page
    console.log('Manage membership');
    
    router.push('/memberships');
  };
  
  return (
    <Layout title="My Profile">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push('/bookings')}
            >
              My Bookings
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push('/classes')}
            >
              Book a Class
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading profile...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <UserProfile
            user={user}
            onEditProfile={handleEditProfile}
            onManageMembership={handleManageMembership}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
