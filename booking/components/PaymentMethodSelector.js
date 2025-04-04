// src/components/PaymentMethodSelector.js
import React from 'react';
import paymentService from '../api/paymentService';

/**
 * Payment Method Selector component
 * Allows users to select from available payment methods in Switzerland
 */
const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
  countryCode = 'CH'
}) => {
  // Get available payment methods for the country
  const paymentMethods = paymentService.getAvailablePaymentMethods(countryCode);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label 
            key={method.id}
            className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
              selectedMethod === method.id 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onMethodChange(method.id)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-3 flex items-center justify-between w-full">
              <span className="font-medium text-gray-900">{method.name}</span>
              <PaymentMethodIcon method={method.id} />
            </span>
          </label>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>All payments are secure and encrypted. By proceeding, you agree to our Terms of Service.</p>
      </div>
    </div>
  );
};

// Payment method icon component
const PaymentMethodIcon = ({ method }) => {
  switch (method) {
    case 'card':
      return (
        <span className="flex space-x-2">
          <img src="/assets/visa.svg" alt="Visa" className="h-6 w-auto" />
          <img src="/assets/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
        </span>
      );
    case 'twint':
      return <img src="/assets/twint.svg" alt="TWINT" className="h-6 w-auto" />;
    case 'paypal':
      return <img src="/assets/paypal.svg" alt="PayPal" className="h-6 w-auto" />;
    case 'klarna':
      return <img src="/assets/klarna.svg" alt="Klarna" className="h-6 w-auto" />;
    default:
      return null;
  }
};

export default PaymentMethodSelector;
