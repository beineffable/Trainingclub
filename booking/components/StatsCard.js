// src/components/StatsCard.js
import React from 'react';

/**
 * Stats Card component
 * Displays user statistics such as sessions attended, calories burned, etc.
 */
const StatsCard = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Your Training Stats</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.sessionsAttended}</div>
            <p className="text-sm text-gray-600">Sessions Attended</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.streak}</div>
            <p className="text-sm text-gray-600">Current Streak</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.caloriesBurned}</div>
            <p className="text-sm text-gray-600">Calories Burned</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.hoursCompleted}</div>
            <p className="text-sm text-gray-600">Hours Completed</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Monthly Progress</h4>
          <div className="h-10 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 rounded-full flex items-center justify-end pr-3"
              style={{ width: `${stats.monthlyProgress}%` }}
            >
              <span className="text-xs font-medium text-white">{stats.monthlyProgress}%</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">
            {stats.sessionsAttended} of {stats.monthlyGoal} sessions completed this month
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
