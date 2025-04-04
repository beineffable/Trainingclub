// src/components/BookingsList.js
import React from 'react';
import { format } from 'date-fns';
import Button from './Button';

/**
 * Bookings List component
 * Displays a list of user bookings with options to manage them
 */
const BookingsList = ({ bookings = [], onViewBooking, onReschedule, onCancel }) => {
  // Group bookings by status
  const upcomingBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pastBookings = bookings.filter(booking => booking.status === 'completed');
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');

  return (
    <div className="space-y-8">
      {/* Upcoming Bookings */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
        
        {upcomingBookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg text-center border border-gray-200">
            <p className="text-gray-500">You don't have any upcoming bookings.</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => window.location.href = '/classes'}
            >
              Book a Class
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{booking.className}</h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.startTime), 'EEEE, MMMM d')} • 
                        {format(new Date(booking.startTime), 'h:mm a')} - 
                        {format(new Date(booking.endTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-600">{booking.location}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewBooking(booking)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReschedule(booking)}
                      >
                        Reschedule
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onCancel(booking)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Bookings</h2>
          
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{booking.className}</h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.startTime), 'EEEE, MMMM d')} • 
                        {format(new Date(booking.startTime), 'h:mm a')} - 
                        {format(new Date(booking.endTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-600">{booking.location}</p>
                      <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewBooking(booking)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Cancelled Bookings */}
      {cancelledBookings.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancelled Bookings</h2>
          
          <div className="space-y-4">
            {cancelledBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{booking.className}</h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.startTime), 'EEEE, MMMM d')} • 
                        {format(new Date(booking.startTime), 'h:mm a')} - 
                        {format(new Date(booking.endTime), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-600">{booking.location}</p>
                      <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Cancelled
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsList;
