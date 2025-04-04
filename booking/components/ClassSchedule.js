// src/components/ClassSchedule.js
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import Button from './Button';

/**
 * Class Schedule component
 * Displays weekly class schedule with filtering options
 */
const ClassSchedule = ({ classes = [], onBookClass }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [filteredClasses, setFilteredClasses] = useState([]);
  
  // Generate week days
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Get unique locations from classes
  const locations = ['all', ...new Set(classes.map(c => c.location))];
  
  // Filter classes based on selected date and location
  useEffect(() => {
    let filtered = classes;
    
    // Filter by date
    if (selectedDate) {
      filtered = filtered.filter(c => 
        isSameDay(new Date(c.startTime), selectedDate)
      );
    }
    
    // Filter by location
    if (selectedLocation && selectedLocation !== 'all') {
      filtered = filtered.filter(c => c.location === selectedLocation);
    }
    
    // Sort by time
    filtered = filtered.sort((a, b) => 
      new Date(a.startTime) - new Date(b.startTime)
    );
    
    setFilteredClasses(filtered);
  }, [classes, selectedDate, selectedLocation]);
  
  return (
    <div className="space-y-6">
      {/* Date selector */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
        {weekDays.map((day, index) => (
          <button
            key={index}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[4rem] ${
              isSameDay(day, selectedDate)
                ? 'bg-primary-100 text-primary-800'
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedDate(day)}
          >
            <span className="text-xs font-medium">
              {format(day, 'EEE')}
            </span>
            <span className={`text-lg font-bold ${
              isSameDay(day, selectedDate) ? 'text-primary-800' : 'text-gray-900'
            }`}>
              {format(day, 'd')}
            </span>
          </button>
        ))}
      </div>
      
      {/* Location filter */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 space-x-2">
        {locations.map((location, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              location === selectedLocation
                ? 'bg-primary-100 text-primary-800'
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => setSelectedLocation(location)}
          >
            {location === 'all' ? 'All Locations' : location}
          </button>
        ))}
      </div>
      
      {/* Classes list */}
      <div className="space-y-4">
        {filteredClasses.length === 0 ? (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-gray-500">No classes available for the selected filters.</p>
          </div>
        ) : (
          filteredClasses.map((classItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{classItem.name}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(classItem.startTime), 'h:mm a')} - 
                    {format(new Date(classItem.endTime), 'h:mm a')}
                  </p>
                  <p className="text-sm text-gray-600">{classItem.location}</p>
                  <div className="mt-1 flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      classItem.tier === 'elite' ? 'bg-purple-500' : 'bg-green-500'
                    }`}></span>
                    <span className="text-xs text-gray-500">
                      {classItem.tier === 'elite' ? 'Elite' : 'Standard'} Class
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-600 mb-2">
                    {classItem.spotsLeft} spots left
                  </div>
                  <Button
                    variant={classItem.spotsLeft > 0 ? "primary" : "disabled"}
                    size="sm"
                    disabled={classItem.spotsLeft === 0}
                    onClick={() => onBookClass(classItem)}
                  >
                    {classItem.spotsLeft > 0 ? 'Book Class' : 'Full'}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassSchedule;
