// src/components/HolidayPause.js
import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import Button from './Button';

/**
 * Holiday Pause component
 * Allows users to pause their membership during holidays
 */
const HolidayPause = ({ membership, onPause, onResume }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate minimum and maximum dates
  const today = new Date();
  const minDate = format(addDays(today, 7), 'yyyy-MM-dd'); // Must be at least 7 days in advance
  const maxStartDate = format(addDays(today, 90), 'yyyy-MM-dd'); // Can't book more than 90 days in advance
  
  // Handle pause submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    const newErrors = {};
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // In a real implementation, this would call the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onPause callback with the dates
      onPause({
        startDate,
        endDate,
        membershipId: membership.id
      });
    } catch (error) {
      setErrors({ submit: 'Failed to pause membership. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resume membership
  const handleResume = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call the API
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the onResume callback
      onResume(membership.id);
    } catch (error) {
      setErrors({ submit: 'Failed to resume membership. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Holiday Pause</h3>
      </div>
      
      <div className="p-6">
        {membership.status === 'paused' ? (
          <div>
            <div className="mb-6">
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Membership Paused</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Your membership is currently paused from {format(new Date(membership.pauseStartDate), 'MMMM d, yyyy')} to {format(new Date(membership.pauseEndDate), 'MMMM d, yyyy')}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="primary"
              className="w-full"
              onClick={handleResume}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Resuming...' : 'Resume Membership Now'}
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Going on holiday? You can pause your membership for up to 4 weeks per year. Membership must be paused at least 7 days in advance.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={minDate}
                    max={maxStartDate}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || minDate}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                <p>
                  Note: Your membership will automatically resume after the end date. You can pause your membership for a maximum of 28 days per year.
                </p>
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
                {isSubmitting ? 'Submitting...' : 'Pause Membership'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayPause;
