// src/pages/bookings.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BookingsList from '../components/BookingsList';
import Button from '../components/Button';

/**
 * Bookings Page
 * Displays user's bookings and allows management
 */
const BookingsPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockBookings = [
          {
            id: 'BK-1234',
            classId: '1',
            className: 'Morning Bootcamp',
            startTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(7, 0, 0, 0),
            endTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(8, 0, 0, 0),
            location: 'Zurich',
            instructor: 'Sarah Johnson',
            status: 'confirmed',
            bookedAt: new Date().toISOString()
          },
          {
            id: 'BK-1235',
            classId: '3',
            className: 'Elite Performance',
            startTime: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(18, 0, 0, 0),
            endTime: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(19, 30, 0, 0),
            location: 'Zurich',
            instructor: 'Alex Trainer',
            status: 'confirmed',
            bookedAt: new Date().toISOString()
          },
          {
            id: 'BK-1230',
            classId: '5',
            className: 'Power Hour',
            startTime: new Date(new Date().setDate(new Date().getDate() - 2)).setHours(17, 0, 0, 0),
            endTime: new Date(new Date().setDate(new Date().getDate() - 2)).setHours(18, 0, 0, 0),
            location: 'Geneva',
            instructor: 'David Strong',
            status: 'completed',
            bookedAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString()
          },
          {
            id: 'BK-1228',
            classId: '4',
            className: 'Morning Stretch',
            startTime: new Date(new Date().setDate(new Date().getDate() - 3)).setHours(8, 0, 0, 0),
            endTime: new Date(new Date().setDate(new Date().getDate() - 3)).setHours(9, 0, 0, 0),
            location: 'Geneva',
            instructor: 'Emma White',
            status: 'cancelled',
            bookedAt: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
            cancelledAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString()
          }
        ];
        
        // Convert date strings to Date objects
        const processedBookings = mockBookings.map(booking => ({
          ...booking,
          startTime: new Date(booking.startTime).toISOString(),
          endTime: new Date(booking.endTime).toISOString()
        }));
        
        setBookings(processedBookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  // Handle view booking
  const handleViewBooking = (booking) => {
    router.push({
      pathname: '/booking-confirmation',
      query: { classId: booking.classId }
    });
  };
  
  // Handle reschedule booking
  const handleReschedule = (booking) => {
    // In a real implementation, this would navigate to a reschedule page
    console.log('Reschedule booking:', booking);
    
    router.push('/classes');
  };
  
  // Handle cancel booking
  const handleCancel = (booking) => {
    // In a real implementation, this would call the cancel API
    console.log('Cancel booking:', booking);
    
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Update booking status locally for demo
      const updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'cancelled', cancelledAt: new Date().toISOString() } : b
      );
      setBookings(updatedBookings);
    }
  };
  
  return (
    <Layout title="My Bookings">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          
          <Button
            variant="primary"
            onClick={() => router.push('/classes')}
          >
            Book a Class
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <BookingsList
            bookings={bookings}
            onViewBooking={handleViewBooking}
            onReschedule={handleReschedule}
            onCancel={handleCancel}
          />
        )}
      </div>
    </Layout>
  );
};

export default BookingsPage;
