// src/api/bookings.js
import prisma from '../lib/prisma';

/**
 * Create a new booking
 * @param {string} userId - User ID
 * @param {string} classId - Class ID
 * @returns {Object} - Newly created booking
 */
export async function createBooking(userId, classId) {
  // Get the class details
  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: {
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
  
  // Check if class is full
  if (cls._count.bookings >= cls.maxCapacity) {
    throw new Error('Class is full');
  }
  
  // Check if user already has a booking for this class
  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId,
      classId,
      status: { in: ['CONFIRMED', 'ATTENDED'] }
    }
  });
  
  if (existingBooking) {
    throw new Error('You already have a booking for this class');
  }
  
  // Check if user has enough credits
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      credits: true,
      membershipTier: true
    }
  });
  
  // Check if user has access to this class tier
  if (cls.tier !== 'ALL' && cls.tier !== user.membershipTier) {
    throw new Error(`This class requires ${cls.tier} membership`);
  }
  
  // Check if user has enough credits
  if (user.credits < cls.creditsRequired) {
    throw new Error(`Not enough credits. Required: ${cls.creditsRequired}, Available: ${user.credits}`);
  }
  
  // Create booking and deduct credits in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create the booking
    const booking = await tx.booking.create({
      data: {
        userId,
        classId,
        status: 'CONFIRMED',
        creditsUsed: cls.creditsRequired
      }
    });
    
    // Deduct credits from user
    await tx.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: cls.creditsRequired
        }
      }
    });
    
    return booking;
  });
  
  return result;
}

/**
 * Get user's bookings
 * @param {string} userId - User ID
 * @param {Object} filters - Filter options (upcoming, past, etc.)
 * @returns {Array} - List of user's bookings
 */
export async function getUserBookings(userId, filters = {}) {
  const where = {
    userId
  };
  
  // Filter by status
  if (filters.status) {
    where.status = filters.status;
  }
  
  // Filter by date (upcoming or past)
  if (filters.type === 'upcoming') {
    where.class = {
      startTime: {
        gte: new Date()
      }
    };
  } else if (filters.type === 'past') {
    where.class = {
      startTime: {
        lt: new Date()
      }
    };
  }
  
  const bookings = await prisma.booking.findMany({
    where,
    include: {
      class: {
        include: {
          location: true
        }
      }
    },
    orderBy: {
      class: {
        startTime: filters.type === 'past' ? 'desc' : 'asc'
      }
    }
  });
  
  return bookings;
}

/**
 * Cancel a booking
 * @param {string} userId - User ID
 * @param {string} bookingId - Booking ID
 * @returns {Object} - Updated booking
 */
export async function cancelBooking(userId, bookingId) {
  // Get the booking
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
      status: 'CONFIRMED'
    },
    include: {
      class: true
    }
  });
  
  if (!booking) {
    throw new Error('Booking not found or already cancelled');
  }
  
  // Check cancellation policy (e.g., 24 hours before class)
  const now = new Date();
  const classTime = new Date(booking.class.startTime);
  const hoursDifference = (classTime - now) / (1000 * 60 * 60);
  
  let refundCredits = false;
  if (hoursDifference >= 24) {
    // Full refund if cancelled at least 24 hours before
    refundCredits = true;
  }
  
  // Cancel booking and refund credits if applicable
  const result = await prisma.$transaction(async (tx) => {
    // Update booking status
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED'
      }
    });
    
    // Refund credits if applicable
    if (refundCredits) {
      await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: booking.creditsUsed
          }
        }
      });
    }
    
    return {
      ...updatedBooking,
      creditsRefunded: refundCredits ? booking.creditsUsed : 0
    };
  });
  
  return result;
}

/**
 * Reschedule a booking
 * @param {string} userId - User ID
 * @param {string} bookingId - Booking ID
 * @param {string} newClassId - New class ID
 * @returns {Object} - Updated booking
 */
export async function rescheduleBooking(userId, bookingId, newClassId) {
  // Get the current booking
  const currentBooking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      userId,
      status: 'CONFIRMED'
    },
    include: {
      class: true
    }
  });
  
  if (!currentBooking) {
    throw new Error('Booking not found or already cancelled');
  }
  
  // Get the new class
  const newClass = await prisma.class.findUnique({
    where: { id: newClassId },
    include: {
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
  
  if (!newClass) {
    throw new Error('New class not found');
  }
  
  // Check if new class is full
  if (newClass._count.bookings >= newClass.maxCapacity) {
    throw new Error('New class is full');
  }
  
  // Check if user already has a booking for the new class
  const existingBooking = await prisma.booking.findFirst({
    where: {
      userId,
      classId: newClassId,
      status: { in: ['CONFIRMED', 'ATTENDED'] }
    }
  });
  
  if (existingBooking) {
    throw new Error('You already have a booking for the new class');
  }
  
  // Calculate credit difference
  const creditDifference = newClass.creditsRequired - currentBooking.creditsUsed;
  
  // Check if user has enough credits for any difference
  if (creditDifference > 0) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true }
    });
    
    if (user.credits < creditDifference) {
      throw new Error(`Not enough credits for rescheduling. Required: ${creditDifference}, Available: ${user.credits}`);
    }
  }
  
  // Reschedule booking in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Cancel the current booking
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED'
      }
    });
    
    // Create a new booking for the new class
    const newBooking = await tx.booking.create({
      data: {
        userId,
        classId: newClassId,
        status: 'CONFIRMED',
        creditsUsed: newClass.creditsRequired
      }
    });
    
    // Adjust credits if necessary
    if (creditDifference !== 0) {
      await tx.user.update({
        where: { id: userId },
        data: {
          credits: {
            increment: creditDifference < 0 ? Math.abs(creditDifference) : 0,
            decrement: creditDifference > 0 ? creditDifference : 0
          }
        }
      });
    }
    
    return newBooking;
  });
  
  return result;
}

/**
 * Mark a booking as attended (admin only)
 * @param {string} bookingId - Booking ID
 * @returns {Object} - Updated booking
 */
export async function markBookingAttended(bookingId) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId }
  });
  
  if (!booking) {
    throw new Error('Booking not found');
  }
  
  // Update booking status and increment user's sessions completed
  const result = await prisma.$transaction(async (tx) => {
    const updatedBooking = await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: 'ATTENDED'
      }
    });
    
    await tx.user.update({
      where: { id: booking.userId },
      data: {
        sessionsCompleted: {
          increment: 1
        }
      }
    });
    
    return updatedBooking;
  });
  
  return result;
}

/**
 * Mark a booking as no-show (admin only)
 * @param {string} bookingId - Booking ID
 * @returns {Object} - Updated booking
 */
export async function markBookingNoShow(bookingId) {
  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'NO_SHOW'
    }
  });
  
  return updatedBooking;
}
