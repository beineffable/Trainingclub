import React from 'react';

// MembershipCard component for displaying membership plan information
const MembershipCard = ({
  plan,
  onSelect,
  isSelected = false,
  disabled = false
}) => {
  const { id, name, description, price, credits, durationDays, tier, isRecurring } = plan;
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF'
  }).format(price);
  
  // Determine card styling based on tier
  const tierStyles = {
    STANDARD: 'border-blue-200 hover:border-blue-300',
    ELITE: 'border-purple-200 hover:border-purple-300'
  };
  
  // Determine badge styling based on tier
  const badgeStyles = {
    STANDARD: 'bg-blue-100 text-blue-800',
    ELITE: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <div 
      className={`card border-2 ${isSelected ? 'border-primary-500 ring-2 ring-primary-200' : tierStyles[tier]} 
        transition-all duration-200 ${disabled ? 'opacity-60' : 'cursor-pointer'}`}
      onClick={() => !disabled && onSelect(id)}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeStyles[tier]}`}>
          {tier.charAt(0) + tier.slice(1).toLowerCase()}
        </span>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{formattedPrice}</p>
        {isRecurring && (
          <p className="text-sm text-gray-500">per month</p>
        )}
      </div>
      
      <div className="mt-4 space-y-2">
        {credits && (
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-700">{credits} credits</p>
          </div>
        )}
        
        {durationDays && (
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-700">
              {durationDays === 30 ? '1 month' : `${durationDays} days`} validity
            </p>
          </div>
        )}
        
        {tier === 'ELITE' && (
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-700">Access to all classes</p>
          </div>
        )}
        
        {isRecurring && (
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-gray-700">Auto-renewing subscription</p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <button
          className={`w-full py-2 rounded-md text-sm font-medium ${
            isSelected
              ? 'bg-primary-500 text-white'
              : disabled
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-primary-600 border border-primary-500 hover:bg-primary-50'
          }`}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            !disabled && onSelect(id);
          }}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;
