// src/pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

/**
 * Login Page
 * Handles user authentication
 */
const LoginPage = () => {
  const router = useRouter();
  const { redirect } = router.query;
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // In a real implementation, this would authenticate with the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
      console.log('Login successful:', formData);
      
      // Redirect to appropriate page
      router.push(redirect || '/profile');
    } catch (error) {
      setErrors({ submit: 'Invalid email or password. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Login">
      <div className="max-w-md mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Log In</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit}>
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
              
              <div className="mb-6">
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
                  {errors.submit}
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
