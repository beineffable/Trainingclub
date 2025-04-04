// src/components/MembershipComparison.js
import React from 'react';
import Button from './Button';

/**
 * Membership Comparison component
 * Displays a comparison of Standard and Elite membership tiers
 */
const MembershipComparison = ({ onSelectPlan }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-8 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-900">Membership Tiers</h2>
        <p className="mt-2 text-center text-gray-600">Choose the membership that works best for you</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {/* Standard Tier */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">Standard</h3>
            <p className="mt-2 text-gray-600">Perfect for casual training</p>
            <p className="mt-4">
              <span className="text-4xl font-extrabold text-gray-900">CHF 199</span>
              <span className="text-gray-600">/month</span>
            </p>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Access to all standard classes</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Up to 10 sessions per month</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Basic fitness assessment</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Access to online resources</span>
            </li>
          </ul>
          
          <div className="pt-6">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => onSelectPlan('standard')}
            >
              Select Standard
            </Button>
          </div>
        </div>
        
        {/* Elite Tier */}
        <div className="p-6 space-y-6 bg-gray-50">
          <div className="text-center">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-800">
              Most Popular
            </div>
            <h3 className="mt-2 text-xl font-bold text-gray-900">Elite</h3>
            <p className="mt-2 text-gray-600">For dedicated fitness enthusiasts</p>
            <p className="mt-4">
              <span className="text-4xl font-extrabold text-gray-900">CHF 299</span>
              <span className="text-gray-600">/month</span>
            </p>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Access to all classes including premium</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Unlimited sessions</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Advanced fitness assessment & tracking</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Priority booking</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="ml-3 text-gray-700">Personalized training plan</span>
            </li>
          </ul>
          
          <div className="pt-6">
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => onSelectPlan('elite')}
            >
              Select Elite
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-8 bg-gray-50 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Session Packages</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 10 Sessions Package */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900">10 Sessions</h4>
              <span className="font-bold text-gray-900">CHF 1,499</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Perfect for occasional training</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectPlan('sessions10')}
            >
              Select Package
            </Button>
          </div>
          
          {/* 20 Sessions Package */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-900">20 Sessions</h4>
              <span className="font-bold text-gray-900">CHF 2,799</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Best value for regular training</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectPlan('sessions20')}
            >
              Select Package
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipComparison;
