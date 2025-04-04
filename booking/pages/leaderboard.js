// src/pages/leaderboard.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import LeaderboardCard from '../components/LeaderboardCard';
import Button from '../components/Button';

/**
 * Leaderboard Page
 * Displays the member leaderboard showing who is training the most
 */
const LeaderboardPage = () => {
  const router = useRouter();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [optedIn, setOptedIn] = useState(true);
  const [isUpdatingPreference, setIsUpdatingPreference] = useState(false);
  
  // Current user ID (would come from auth context in real implementation)
  const currentUserId = 'user-123';
  
  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockMembers = [
          {
            id: 'user-456',
            name: 'Emma Davis',
            membershipType: 'Elite',
            sessionsCompleted: 24
          },
          {
            id: 'user-789',
            name: 'Michael Brown',
            membershipType: 'Standard',
            sessionsCompleted: 20
          },
          {
            id: 'user-123',
            name: 'John Smith',
            membershipType: 'Elite',
            sessionsCompleted: 18
          },
          {
            id: 'user-234',
            name: 'Sarah Johnson',
            membershipType: 'Standard',
            sessionsCompleted: 15
          },
          {
            id: 'user-345',
            name: 'David Wilson',
            membershipType: 'Elite',
            sessionsCompleted: 12
          },
          {
            id: 'user-567',
            name: 'Jessica Lee',
            membershipType: 'Standard',
            sessionsCompleted: 10
          },
          {
            id: 'user-678',
            name: 'Robert Taylor',
            membershipType: 'Elite',
            sessionsCompleted: 8
          }
        ];
        
        // Sort members by sessions completed (descending)
        const sortedMembers = mockMembers.sort((a, b) => 
          b.sessionsCompleted - a.sessionsCompleted
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMembers(sortedMembers);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Handle opt-in/opt-out toggle
  const handleToggleOptIn = async () => {
    setIsUpdatingPreference(true);
    
    try {
      // In a real implementation, this would update the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Toggle opt-in status
      setOptedIn(!optedIn);
    } catch (error) {
      console.error('Failed to update preference:', error);
      alert('Failed to update your preference. Please try again.');
    } finally {
      setIsUpdatingPreference(false);
    }
  };
  
  return (
    <Layout title="Member Leaderboard">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Leaderboard</h1>
          
          <Button
            variant="outline"
            onClick={() => router.push('/profile')}
          >
            Back to Profile
          </Button>
        </div>
        
        <div className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">About the Leaderboard</h3>
                <p className="mt-1 text-gray-600">
                  The Training Club leaderboard shows members who have completed the most training sessions. It's a fun way to stay motivated and see how you compare to other members.
                </p>
                <div className="mt-4 flex items-center">
                  <span className="mr-3 text-sm text-gray-600">
                    {optedIn ? 'You are currently visible on the leaderboard.' : 'You are currently hidden from the leaderboard.'}
                  </span>
                  <button
                    type="button"
                    className={`${
                      optedIn ? 'bg-primary-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                    role="switch"
                    aria-checked={optedIn}
                    onClick={handleToggleOptIn}
                    disabled={isUpdatingPreference}
                  >
                    <span className="sr-only">Toggle leaderboard visibility</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        optedIn ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading leaderboard data...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <LeaderboardCard members={members} currentUserId={currentUserId} />
        )}
        
        <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">How to Climb the Leaderboard</h3>
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
                  <h4 className="text-lg font-medium text-gray-900">Attend Classes Regularly</h4>
                  <p className="mt-1 text-gray-600">
                    Each class you attend counts as one session. The more classes you attend, the higher you'll climb.
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
                  <h4 className="text-lg font-medium text-gray-900">Check In at Classes</h4>
                  <p className="mt-1 text-gray-600">
                    Make sure to check in with your trainer at each class to ensure your attendance is recorded.
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
                  <h4 className="text-lg font-medium text-gray-900">Stay Consistent</h4>
                  <p className="mt-1 text-gray-600">
                    The leaderboard tracks sessions over the current month. Consistency is key to staying at the top.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;
