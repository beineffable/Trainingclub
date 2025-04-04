// src/api/classes.js
import prisma from '../lib/prisma';

/**
 * Get all available classes with filtering options
 * @param {Object} filters - Filter options (date, location, etc.)
 * @param {string} userId - User ID for membership tier filtering
 * @returns {Array} - List of classes
 */
export async function getClasses(filters = {}, userId = null) {
  // Build the where clause based on filters
  const where = {};
  
  // Filter by date range
  if (filters.startDate) {
    where.startTime = {
      gte: new Date(filters.startDate)
    };
  }
  
  if (filters.endDate) {
    where.startTime = {
      ...(where.startTime || {}),
      lte: new Date(filters.endDate)
    };
  }
  
  // Filter by location
  if (filters.locationId) {
    where.locationId = filters.locationId;
  }
  
  // Get user's membership tier for class filtering
  let userTier = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { membershipTier: true }
    });
    userTier = user?.membershipTier;
  }
  
  // Filter classes by tier if user is logged in
  if (userTier) {
    where.OR = [
      { tier: userTier },
      { tier: 'ALL' }
    ];
  }
  
  // Get classes with booking counts
  const classes = await prisma.class.findMany({
    where,
    include: {
      location: true,
      _count: {
        select: {
          bookings: {
            where: {
              status: { in: ['CONFIRMED', 'ATTENDED'] }
            }
          }
        }
      }
    },
    orderBy: {
      startTime: 'asc'
    }
  });
  
  // Calculate available spots
  return classes.map(cls => ({
    ...cls,
    availableSpots: cls.maxCapacity - cls._count.bookings,
    bookingCount: cls._count.bookings
  }));
}

/**
 * Get a specific class by ID
 * @param {string} classId - Class ID
 * @returns {Object} - Class details
 */
export async function getClass(classId) {
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: {
      location: true,
      _count: {
        select: {
          bookings: {
            where: {
              status: { in: ['CONFIRMED', 'ATTENDED'] }
            }
          }
        }
      }
    }
  });
  
  if (!cls) {
    throw new Error('Class not found');
  }
  
  return {
    ...cls,
    availableSpots: cls.maxCapacity - cls._count.bookings,
    bookingCount: cls._count.bookings
  };
}

/**
 * Create a new class (admin only)
 * @param {Object} classData - Class data
 * @returns {Object} - Newly created class
 */
export async function createClass(classData) {
  const newClass = await prisma.class.create({
    data: {
      name: classData.name,
      description: classData.description,
      locationId: classData.locationId,
      startTime: new Date(classData.startTime),
      endTime: new Date(classData.endTime),
      maxCapacity: classData.maxCapacity,
      creditsRequired: classData.creditsRequired || 1,
      tier: classData.tier || 'ALL'
    }
  });
  
  return newClass;
}

/**
 * Update a class (admin only)
 * @param {string} classId - Class ID
 * @param {Object} classData - Updated class data
 * @returns {Object} - Updated class
 */
export async function updateClass(classId, classData) {
  const updatedClass = await prisma.class.update({
    where: { id: classId },
    data: {
      name: classData.name,
      description: classData.description,
      locationId: classData.locationId,
      startTime: classData.startTime ? new Date(classData.startTime) : undefined,
      endTime: classData.endTime ? new Date(classData.endTime) : undefined,
      maxCapacity: classData.maxCapacity,
      creditsRequired: classData.creditsRequired,
      tier: classData.tier
    }
  });
  
  return updatedClass;
}

/**
 * Delete a class (admin only)
 * @param {string} classId - Class ID
 * @returns {Object} - Deleted class
 */
export async function deleteClass(classId) {
  // Check if there are any bookings for this class
  const bookingsCount = await prisma.booking.count({
    where: { classId }
  });
  
  if (bookingsCount > 0) {
    throw new Error('Cannot delete class with existing bookings');
  }
  
  const deletedClass = await prisma.class.delete({
    where: { id: classId }
  });
  
  return deletedClass;
}

/**
 * Get all locations
 * @returns {Array} - List of locations
 */
export async function getLocations() {
  const locations = await prisma.location.findMany({
    orderBy: {
      name: 'asc'
    }
  });
  
  return locations;
}

/**
 * Create a new location (admin only)
 * @param {Object} locationData - Location data
 * @returns {Object} - Newly created location
 */
export async function createLocation(locationData) {
  const newLocation = await prisma.location.create({
    data: {
      name: locationData.name,
      address: locationData.address,
      city: locationData.city,
      postalCode: locationData.postalCode,
      country: locationData.country || 'Switzerland'
    }
  });
  
  return newLocation;
}
