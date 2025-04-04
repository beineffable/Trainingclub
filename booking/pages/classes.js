// src/pages/classes.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ClassSchedule from '../components/ClassSchedule';
import Button from '../components/Button';

/**
 * Classes Page
 * Displays class schedule and allows booking
 */
const ClassesPage = () => {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the API
        // For now, use mock data
        const mockClasses = [
          {
            id: '1',
            name: 'Morning Bootcamp',
            description: 'Start your day with an energizing full-body workout',
            startTime: new Date(new Date().setHours(7, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
            location: 'Zurich',
            instructor: 'Sarah Johnson',
            capacity: 15,
            spotsLeft: 5,
            tier: 'standard'
          },
          {
            id: '2',
            name: 'HIIT Circuit',
            description: 'High-intensity interval training to maximize calorie burn',
            startTime: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
            location: 'Zurich',
            instructor: 'Mike Peters',
            capacity: 12,
            spotsLeft: 0,
            tier: 'standard'
          },
          {
            id: '3',
            name: 'Elite Performance',
            description: 'Advanced training techniques for fitness enthusiasts',
            startTime: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(19, 30, 0, 0)).toISOString(),
            location: 'Zurich',
            instructor: 'Alex Trainer',
            capacity: 10,
            spotsLeft: 3,
            tier: 'elite'
          },
          {
            id: '4',
            name: 'Morning Stretch',
            description: 'Gentle stretching to improve flexibility and reduce stress',
            startTime: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
            location: 'Geneva',
            instructor: 'Emma White',
            capacity: 20,
            spotsLeft: 12,
            tier: 'standard'
          },
          {
            id: '5',
            name: 'Power Hour',
            description: 'Intense strength and conditioning workout',
            startTime: new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(),
            location: 'Geneva',
            instructor: 'David Strong',
            capacity: 15,
            spotsLeft: 7,
            tier: 'standard'
          },
          {
            id: '6',
            name: 'Elite Conditioning',
            description: 'Premium training session with personalized attention',
            startTime: new Date(new Date().setHours(19, 0, 0, 0)).toISOString(),
            endTime: new Date(new Date().setHours(20, 30, 0, 0)).toISOString(),
            location: 'Geneva',
            instructor: 'Sophie Elite',
            capacity: 8,
            spotsLeft: 2,
            tier: 'elite'
          }
        ];
        
        setClasses(mockClasses);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchClasses();
  }, []);
  
  // Handle booking a class
  const handleBookClass = (classItem) => {
    // In a real implementation, this would call the booking API
    console.log('Booking class:', classItem);
    
    // Navigate to booking confirmation
    router.push({
      pathname: '/booking-confirmation',
      query: { classId: classItem.id }
    });
  };
  
  return (
    <Layout title="Class Schedule">
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
          
          <Button
            variant="outline"
            onClick={() => router.push('/bookings')}
          >
            My Bookings
          </Button>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="ml-3 text-gray-600">Loading classes...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        ) : (
          <ClassSchedule
            classes={classes}
            onBookClass={handleBookClass}
          />
        )}
      </div>
    </Layout>
  );
};

export default ClassesPage;
