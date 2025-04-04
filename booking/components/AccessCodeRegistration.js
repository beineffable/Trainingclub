// src/components/AccessCodeRegistration.js
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

/**
 * Access Code Registration component
 * Handles the registration process with access code validation
 */
const AccessCodeRegistration = ({ onRegister }) => {
  const [step, setStep] = useState(1);
  const [accessCode, setAccessCode] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle access code validation
  const handleValidateCode = async (e) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      setErrors({ accessCode: 'Access code is required' });
      return;
    }
    
    setIsValidating(true);
    setErrors({});
    
    try {
      // In a real implementation, this would validate with the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any code that's at least 6 characters
      if (accessCode.trim().length < 6) {
        setErrors({ accessCode: 'Invalid access code' });
        return;
      }
      
      // Move to registration form
      setStep(2);
    } catch (error) {
      setErrors({ accessCode: 'Error validating code. Please try again.' });
    } finally {
      setIsValidating(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms and conditions';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // In a real implementation, this would submit to the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onRegister callback with form data and access code
      onRegister({ ...formData, accessCode });
    } catch (error) {
      setErrors({ submit: 'Error creating account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {step === 1 ? (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Access Code</h2>
          
          <form onSubmit={handleValidateCode}>
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                To register, please enter the access code you received from your referrer or trainer.
              </p>
              
              <Input
                label="Access Code"
                name="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                error={errors.accessCode}
                placeholder="Enter your access code"
                required
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isValidating}
              disabled={isValidating}
            >
              {isValidating ? 'Validating...' : 'Continue'}
            </Button>
          </form>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create Your Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>
            
            <div className="mb-4">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
            </div>
            
            <div className="mb-4">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div className="mb-6">
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a>
                  </label>
                  {errors.agreeTerms && (
                    <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
                  )}
                </div>
              </div>
            </div>
            
            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                Back
              </Button>
              
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccessCodeRegistration;
