import React from 'react';
import { format } from 'date-fns';

// ClassCard component for displaying class information
const ClassCard = ({
  classData,
  onBook,
  isBooked = false,
  showBookButton = true,
  disabled = false
}) => {
  const { id, name, description, location, startTime, endTime, availableSpots, maxCapacity, tier } = classData;
  
  // Format date and time
  const formattedDate = format(new Date(startTime), 'EEEE, MMMM d, yyyy');
  const formattedStartTime = format(new Date(startTime), 'h:mm a');
  const formattedEndTime = format(new Date(endTime), 'h:mm a');
  
  // Calculate availability status
  const isFull = availableSpots <= 0;
  const availabilityColor = isFull ? 'text-red-600' : availableSpots <= 3 ? 'text-yellow-600' : 'text-green-600';
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{location.name}</p>
        </div>
        {tier !== 'ALL' && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            tier === 'ELITE' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {tier.charAt(0) + tier.slice(1).toLowerCase()}
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">{description}</p>
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
      
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${availabilityColor}`}>
            {isFull ? 'Class Full' : `${availableSpots} spots left`}
          </p>
          <p className="text-xs text-gray-500">{maxCapacity} max capacity</p>
        </div>
        
        {showBookButton && (
          <button
            onClick={() => onBook(id)}
            disabled={isFull || isBooked || disabled}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isBooked
                ? 'bg-gray-100 text-gray-800 cursor-default'
                : isFull || disabled
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {isBooked ? 'Booked' : 'Book Class'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
