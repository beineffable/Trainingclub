// src/components/LeaderboardCard.js
import React from 'react';

/**
 * Leaderboard Card component
 * Displays the member leaderboard showing who is training the most
 */
const LeaderboardCard = ({ members = [], currentUserId }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Member Leaderboard</h3>
      </div>
      
      <div className="p-6">
        {members.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No leaderboard data available.</p>
        ) : (
          <div className="space-y-4">
            {members.map((member, index) => (
              <div 
                key={member.id} 
                className={`flex items-center p-3 rounded-lg ${
                  member.id === currentUserId 
                    ? 'bg-primary-50 border border-primary-100' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                    index < 3 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member.name} {member.id === currentUserId && '(You)'}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {member.membershipType} Member
                  </p>
                </div>
                
                <div className="flex-shrink-0 text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {member.sessionsCompleted}
                  </p>
                  <p className="text-xs text-gray-500">
                    sessions
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Leaderboard updates weekly. Only members who have opted in are displayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
