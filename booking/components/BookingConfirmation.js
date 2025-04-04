// src/components/BookingConfirmation.js
import React from 'react';
import { format } from 'date-fns';
import Button from './Button';

/**
 * Booking Confirmation component
 * Displays details of a booked class
 */
const BookingConfirmation = ({ booking, onReschedule, onCancel }) => {
  if (!booking) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-primary-50 p-4 border-b border-primary-100">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">Booking Confirmed</h3>
            <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Class</h4>
            <p className="text-lg font-medium text-gray-900">{booking.className}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
              <p className="text-base text-gray-900">
                {format(new Date(booking.startTime), 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-base text-gray-900">
                {format(new Date(booking.startTime), 'h:mm a')} - 
                {format(new Date(booking.endTime), 'h:mm a')}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Location</h4>
              <p className="text-base text-gray-900">{booking.location}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">Instructor</h4>
            <p className="text-base text-gray-900">{booking.instructor}</p>
          </div>
          
          {booking.notes && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Notes</h4>
              <p className="text-base text-gray-900">{booking.notes}</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Cancellation Policy</h4>
            <p className="text-sm text-gray-600">
              You can reschedule or cancel this booking up to 12 hours before the class starts.
              Late cancellations or no-shows will result in the deduction of a class credit.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onReschedule(booking)}
        >
          Reschedule
        </Button>
        
        <Button
          variant="danger"
          className="flex-1"
          onClick={() => onCancel(booking)}
        >
          Cancel Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
