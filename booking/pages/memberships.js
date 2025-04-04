// src/pages/memberships.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MembershipComparison from '../components/MembershipComparison';

/**
 * Memberships Page
 * Displays membership options and allows users to select a plan
 */
const MembershipsPage = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('monthly');

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    
    // For session packages, go directly to checkout
    if (plan === 'sessions10' || plan === 'sessions20') {
      router.push({
        pathname: '/checkout',
        query: { plan, term: 'once' }
      });
      return;
    }
    
    // Scroll to term selection
    document.getElementById('term-selection')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle term selection and proceed to checkout
  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    
    router.push({
      pathname: '/checkout',
      query: { plan: selectedPlan, term }
    });
  };

  return (
    <Layout title="Memberships">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Membership Options</h1>
        
        <div className="mb-12">
          <MembershipComparison onSelectPlan={handleSelectPlan} />
        </div>
        
        {selectedPlan && selectedPlan !== 'sessions10' && selectedPlan !== 'sessions20' && (
          <div id="term-selection" className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 bg-gray-50 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Select Your {selectedPlan === 'standard' ? 'Standard' : 'Elite'} Membership Term
              </h2>
              <p className="mt-2 text-center text-gray-600">
                Choose a longer term for better value
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Monthly Option */}
                <div 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTerm === 'monthly' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectTerm('monthly')}
                >
                  <h3 className="font-medium text-gray-900 mb-2">Monthly</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    CHF {selectedPlan === 'standard' ? '199' : '299'}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </p>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                  <p className="text-sm text-gray-600 mt-2">No commitment, cancel anytime</p>
                </div>
                
                {/* Term Option */}
                <div 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTerm === 'term' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectTerm('term')}
                >
                  <h3 className="font-medium text-gray-900 mb-2">Term (3 months)</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    CHF {selectedPlan === 'standard' ? '179' : '269'}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </p>
                  <p className="text-sm text-gray-600">Billed every 3 months</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="text-green-600 font-medium">Save 10%</span> compared to monthly
                  </p>
                </div>
                
                {/* Annual Option */}
                <div 
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedTerm === 'annual' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelectTerm('annual')}
                >
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                    Best Value
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Annual</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    CHF {selectedPlan === 'standard' ? '159' : '239'}
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </p>
                  <p className="text-sm text-gray-600">Billed annually</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="text-green-600 font-medium">Save 20%</span> compared to monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MembershipsPage;
