// src/pages/booking-confirmation.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BookingConfirmation from '../components/BookingConfirmation';
import Button from '../components/Button';

/**
 * Booking Confirmation Page
 * Displays confirmation after booking a class
 */
const BookingConfirmationPage = () => {
  const router = useRouter();
  const { classId } = router.query;
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch booking details
  useEffect(() => {
    if (!classId) return;
    
    const fetchBooking = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockBooking = {
          id: `BK-${Math.floor(Math.random() * 10000)}`,
          classId,
          className: 'Morning Bootcamp',
          startTime: new Date(new Date().setHours(7, 0, 0, 0)).toISOString(),
          endTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
          location: 'Zurich',
          instructor: 'Sarah Johnson',
          status: 'confirmed',
          bookedAt: new Date().toISOString(),
          notes: 'Please arrive 10 minutes early to prepare.'
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBooking(mockBooking);
      } catch (error) {
        console.error('Failed to fetch booking:', error);
        setError('Failed to load booking details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooking();
  }, [classId]);
  
  // Handle reschedule
  const handleReschedule = (booking) => {
    // In a real implementation, this would navigate to a reschedule page
    console.log('Reschedule booking:', booking);
    
    router.push('/classes');
  };
  
  // Handle cancel
  const handleCancel = (booking) => {
    // In a real implementation, this would call the cancel API
    console.log('Cancel booking:', booking);
    
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      router.push('/bookings');
    }
  };
  
  return (
    <Layout title="Booking Confirmation">
      <div className="max-w-2xl mx-auto my-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking Confirmation</h1>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading booking details...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <>
            <BookingConfirmation
              booking={booking}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
            
            <div className="mt-8 flex justify-center">
              <Button
                variant="primary"
                onClick={() => router.push('/classes')}
              >
                Book Another Class
              </Button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingConfirmationPage;
