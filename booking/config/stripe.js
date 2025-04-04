// src/config/stripe.js
const stripeConfig = {
  // Public key would be replaced with actual key in production
  publicKey: process.env.STRIPE_PUBLIC_KEY || 'pk_test_sample',
  
  // Webhook secret would be replaced with actual secret in production
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_sample',
  
  // Payment methods available in Switzerland
  availablePaymentMethods: [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      currencies: ['CHF', 'EUR', 'USD'],
      enabled: true
    },
    {
      id: 'twint',
      name: 'TWINT',
      currencies: ['CHF'],
      enabled: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      currencies: ['CHF', 'EUR', 'USD'],
      enabled: true
    },
    {
      id: 'klarna',
      name: 'Klarna',
      currencies: ['CHF', 'EUR'],
      enabled: true
    }
  ],
  
  // Default currency
  defaultCurrency: 'CHF',
  
  // Payment processing options
  options: {
    automaticTax: false,
    billingAddressCollection: 'auto',
    allowPromotionCodes: true
  }
};

export default stripeConfig;
