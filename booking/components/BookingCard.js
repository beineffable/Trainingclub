import React from 'react';
import { format } from 'date-fns';

// BookingCard component for displaying booking information
const BookingCard = ({
  booking,
  onCancel,
  onReschedule,
  showActions = true
}) => {
  const { id, status, class: classData, creditsUsed } = booking;
  const { name, location, startTime, endTime } = classData;
  
  // Format date and time
  const formattedDate = format(new Date(startTime), 'EEEE, MMMM d, yyyy');
  const formattedStartTime = format(new Date(startTime), 'h:mm a');
  const formattedEndTime = format(new Date(endTime), 'h:mm a');
  
  // Determine status badge color
  const statusColors = {
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    ATTENDED: 'bg-blue-100 text-blue-800',
    NO_SHOW: 'bg-yellow-100 text-yellow-800'
  };
  
  // Format status text
  const statusText = status.charAt(0) + status.slice(1).toLowerCase();
  
  // Check if booking can be cancelled (only confirmed bookings)
  const canCancel = status === 'CONFIRMED';
  
  // Check if booking is in the past
  const isPast = new Date(startTime) < new Date();
  
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{location.name}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {statusText}
        </span>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Date</p>
          <p className="text-sm font-medium">{formattedDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Time</p>
          <p className="text-sm font-medium">{formattedStartTime} - {formattedEndTime}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-xs text-gray-500">Credits Used</p>
        <p className="text-sm font-medium">{creditsUsed}</p>
      </div>
      
      {showActions && canCancel && !isPast && (
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => onCancel(id)}
            className="flex-1 py-2 border border-red-500 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onReschedule(id)}
            className="flex-1 py-2 border border-primary-500 text-primary-600 rounded-md text-sm font-medium hover:bg-primary-50"
          >
            Reschedule
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
