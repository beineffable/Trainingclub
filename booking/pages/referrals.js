// src/pages/referrals.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ReferralProgram from '../components/ReferralProgram';
import Button from '../components/Button';

/**
 * Referrals Page
 * Displays referral program information and allows sharing referral code
 */
const ReferralsPage = () => {
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
          referralCode: 'JOHNSMITH10',
          referrals: {
            count: 3,
            creditsEarned: 6,
            history: [
              {
                id: 'ref-1',
                name: 'Sarah Johnson',
                date: '2025-03-15T00:00:00.000Z',
                status: 'completed',
                creditsEarned: 2
              },
              {
                id: 'ref-2',
                name: 'Michael Brown',
                date: '2025-03-20T00:00:00.000Z',
                status: 'completed',
                creditsEarned: 2
              },
              {
                id: 'ref-3',
                name: 'Emma Davis',
                date: '2025-03-28T00:00:00.000Z',
                status: 'completed',
                creditsEarned: 2
              }
            ]
          }
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError('Failed to load referral information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  return (
    <Layout title="Referral Program">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Referral Program</h1>
          
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
            <p className="ml-3 text-gray-600">Loading referral information...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <ReferralProgram
              referralCode={user.referralCode}
              referralsCount={user.referrals.count}
              creditsEarned={user.referrals.creditsEarned}
            />
            
            {user.referrals.history.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Referral History</h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Credits Earned
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {user.referrals.history.map((referral) => (
                          <tr key={referral.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {referral.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(referral.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                referral.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {referral.status === 'completed' ? 'Completed' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {referral.creditsEarned}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">How It Works</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                        1
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Share Your Code</h4>
                      <p className="mt-1 text-gray-600">
                        Share your unique referral code with friends via email, WhatsApp, or any other method.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                        2
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Friend Signs Up</h4>
                      <p className="mt-1 text-gray-600">
                        Your friend creates an account using your referral code during registration.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                        3
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Both Get Rewarded</h4>
                      <p className="mt-1 text-gray-600">
                        Once your friend purchases a membership, you both receive 2 free class credits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReferralsPage;
