// src/components/PaymentSummary.js
import React from 'react';

/**
 * Payment Summary component
 * Displays a summary of the payment details
 */
const PaymentSummary = ({
  items = [],
  subtotal,
  discount = 0,
  tax = 0,
  total,
  currency = 'CHF'
}) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency
    }).format(amount / 100);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h3>
      
      {/* Items */}
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.name}</span>
            <span className="text-gray-900 font-medium">{formatCurrency(item.price)}</span>
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>
      
      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
      </div>
      
      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 font-medium">-{formatCurrency(discount)}</span>
        </div>
      )}
      
      {/* Tax */}
      {tax > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900 font-medium">{formatCurrency(tax)}</span>
        </div>
      )}
      
      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>
      
      {/* Total */}
      <div className="flex justify-between">
        <span className="text-gray-900 font-medium">Total</span>
        <span className="text-gray-900 font-bold">{formatCurrency(total)}</span>
      </div>
    </div>
  );
};

export default PaymentSummary;
