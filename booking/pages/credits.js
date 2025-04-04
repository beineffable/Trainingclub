// src/pages/credits.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import CreditHistory from '../components/CreditHistory';
import Button from '../components/Button';

/**
 * Credits Page
 * Displays credit balance and transaction history
 */
const CreditsPage = () => {
  const router = useRouter();
  const [credits, setCredits] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch credit information
  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockCredits = {
          available: 8,
          total: 10,
          used: 2,
          resetDate: '2025-05-01T00:00:00.000Z'
        };
        
        const mockTransactions = [
          {
            id: 'tx-1',
            date: '2025-03-25T00:00:00.000Z',
            description: 'Monthly credit allocation',
            amount: 10,
            balance: 10
          },
          {
            id: 'tx-2',
            date: '2025-03-26T00:00:00.000Z',
            description: 'Booking: Morning Bootcamp',
            amount: -1,
            balance: 9
          },
          {
            id: 'tx-3',
            date: '2025-03-28T00:00:00.000Z',
            description: 'Booking: Elite Performance',
            amount: -1,
            balance: 8
          },
          {
            id: 'tx-4',
            date: '2025-03-15T00:00:00.000Z',
            description: 'Referral bonus: Sarah Johnson',
            amount: 2,
            balance: 10
          }
        ];
        
        // Sort transactions by date (newest first)
        const sortedTransactions = mockTransactions.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCredits(mockCredits);
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Failed to fetch credits:', error);
        setError('Failed to load credit information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCredits();
  }, []);
  
  return (
    <Layout title="My Credits">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Credits</h1>
          
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
            <p className="ml-3 text-gray-600">Loading credit information...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Credit Summary */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Credit Summary</h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-medium text-gray-900">Available Credits</h4>
                    <p className="text-sm text-gray-600">Credits reset on {new Date(credits.resetDate).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-4xl font-bold text-primary-600">{credits.available}</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${(credits.available / credits.total) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0</span>
                  <span>{credits.available} of {credits.total} credits remaining</span>
                  <span>{credits.total}</span>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Used This Month</div>
                    <div className="text-2xl font-bold text-gray-900">{credits.used}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Total Credits</div>
                    <div className="text-2xl font-bold text-gray-900">{credits.total}</div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={() => router.push('/classes')}
                  >
                    Book a Class
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Credit History */}
            <CreditHistory transactions={transactions} />
            
            {/* How Credits Work */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">How Credits Work</h3>
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
                      <h4 className="text-lg font-medium text-gray-900">Credit Allocation</h4>
                      <p className="mt-1 text-gray-600">
                        Credits are allocated based on your membership plan. Standard members receive 10 credits per month, while Elite members have unlimited access.
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
                      <h4 className="text-lg font-medium text-gray-900">Using Credits</h4>
                      <p className="mt-1 text-gray-600">
                        Each class booking requires 1 credit. Credits are deducted when you book a class and are not refunded for no-shows.
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
                      <h4 className="text-lg font-medium text-gray-900">Credit Expiration</h4>
                      <p className="mt-1 text-gray-600">
                        Credits reset at the beginning of each billing cycle. Unused credits do not roll over to the next month.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                        4
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Earning Extra Credits</h4>
                      <p className="mt-1 text-gray-600">
                        You can earn additional credits by referring friends. Each successful referral earns you 2 bonus credits.
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

export default CreditsPage;
