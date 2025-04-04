// src/pages/stats.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import Button from '../components/Button';

/**
 * Stats Page
 * Displays user training statistics and progress
 */
const StatsPage = () => {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'
  
  // Fetch stats data
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockStats = {
          sessionsAttended: 12,
          streak: 3,
          caloriesBurned: 4800,
          hoursCompleted: 9,
          monthlyGoal: 16,
          monthlyProgress: 75,
          classBreakdown: [
            { name: 'Bootcamp', count: 6, percentage: 50 },
            { name: 'HIIT', count: 3, percentage: 25 },
            { name: 'Strength', count: 2, percentage: 17 },
            { name: 'Mobility', count: 1, percentage: 8 }
          ],
          weeklyActivity: [
            { day: 'Mon', count: 1 },
            { day: 'Tue', count: 2 },
            { day: 'Wed', count: 0 },
            { day: 'Thu', count: 1 },
            { day: 'Fri', count: 1 },
            { day: 'Sat', count: 0 },
            { day: 'Sun', count: 0 }
          ]
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [timeRange]);
  
  return (
    <Layout title="My Stats">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Stats</h1>
          
          <Button
            variant="outline"
            onClick={() => router.push('/profile')}
          >
            Back to Profile
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  timeRange === 'week'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setTimeRange('week')}
              >
                Week
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === 'month'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setTimeRange('month')}
              >
                Month
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  timeRange === 'year'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setTimeRange('year')}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading statistics...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Summary */}
            <StatsCard stats={stats} />
            
            {/* Class Breakdown */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Class Breakdown</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {stats.classBreakdown.map((classType) => (
                    <div key={classType.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{classType.name}</span>
                        <span className="text-sm text-gray-600">{classType.count} sessions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary-600 h-2.5 rounded-full" 
                          style={{ width: `${classType.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Weekly Activity */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Weekly Activity</h3>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between h-40">
                  {stats.weeklyActivity.map((day) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-primary-100 rounded-t-md" 
                        style={{ 
                          height: day.count > 0 ? `${day.count * 40}px` : '4px',
                          backgroundColor: day.count > 0 ? '#4F46E5' : '#E0E7FF'
                        }}
                      ></div>
                      <div className="mt-2 text-xs font-medium text-gray-600">{day.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Achievement Tips */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Tips to Improve</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Maintain Your Streak</h4>
                      <p className="mt-1 text-gray-600">
                        You're on a {stats.streak}-day streak! Keep it going by booking your next class now.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Try Different Classes</h4>
                      <p className="mt-1 text-gray-600">
                        Mix up your routine by trying different class types. This helps with overall fitness and prevents plateaus.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-gray-900">Join the Leaderboard</h4>
                      <p className="mt-1 text-gray-600">
                        Opt in to the member leaderboard to see how you compare to other members and stay motivated.
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

export default StatsPage;
