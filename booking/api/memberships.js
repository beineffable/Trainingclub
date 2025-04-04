// src/api/memberships.js
import prisma from '../lib/prisma';

/**
 * Get all available membership plans
 * @returns {Array} - List of membership plans
 */
export async function getMembershipPlans() {
  const plans = await prisma.membershipPlan.findMany({
    orderBy: {
      price: 'asc'
    }
  });
  
  return plans;
}

/**
 * Get a specific membership plan by ID
 * @param {string} planId - Membership plan ID
 * @returns {Object} - Membership plan details
 */
export async function getMembershipPlan(planId) {
  const plan = await prisma.membershipPlan.findUnique({
    where: { id: planId }
  });
  
  if (!plan) {
    throw new Error('Membership plan not found');
  }
  
  return plan;
}

/**
 * Purchase a membership plan for a user
 * @param {string} userId - User ID
 * @param {string} planId - Membership plan ID
 * @param {string} paymentId - Payment ID from payment processor
 * @returns {Object} - New user membership
 */
export async function purchaseMembership(userId, planId, paymentId) {
  // Get the plan details
  const plan = await prisma.membershipPlan.findUnique({
    where: { id: planId }
  });
  
  if (!plan) {
    throw new Error('Membership plan not found');
  }
  
  // Calculate end date if plan has duration
  let endDate = null;
  if (plan.durationDays) {
    endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationDays);
  }
  
  // Create the membership in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create the membership
    const membership = await tx.userMembership.create({
      data: {
        userId,
        planId,
        endDate,
        status: 'ACTIVE'
      }
    });
    
    // Update user's membership tier and credits if applicable
    const updateData = {
      membershipTier: plan.tier
    };
    
    if (plan.credits) {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true }
      });
      
      updateData.credits = user.credits + plan.credits;
    }
    
    await tx.user.update({
      where: { id: userId },
      data: updateData
    });
    
    // Record the payment
    await tx.payment.create({
      data: {
        userId,
        amount: plan.price,
        currency: plan.currency,
        paymentMethod: 'stripe', // This would come from the actual payment method used
        paymentStatus: 'COMPLETED',
        stripePaymentId: paymentId,
        membershipId: membership.id
      }
    });
    
    return membership;
  });
  
  return result;
}

/**
 * Get user's active memberships
 * @param {string} userId - User ID
 * @returns {Array} - List of user's active memberships
 */
export async function getUserMemberships(userId) {
  const memberships = await prisma.userMembership.findMany({
    where: {
      userId,
      status: 'ACTIVE'
    },
    include: {
      plan: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  return memberships;
}

/**
 * Pause a user's membership (holiday mode)
 * @param {string} userId - User ID
 * @param {string} membershipId - Membership ID
 * @param {Date} resumeDate - Date to automatically resume membership
 * @returns {Object} - Updated membership
 */
export async function pauseMembership(userId, membershipId, resumeDate) {
  const membership = await prisma.userMembership.findFirst({
    where: {
      id: membershipId,
      userId,
      status: 'ACTIVE'
    }
  });
  
  if (!membership) {
    throw new Error('Active membership not found');
  }
  
  // Update membership status to paused
  const updatedMembership = await prisma.userMembership.update({
    where: { id: membershipId },
    data: {
      status: 'PAUSED',
      // Store the resume date in metadata or another field
      // This is simplified for the example
      endDate: resumeDate
    }
  });
  
  return updatedMembership;
}

/**
 * Resume a paused membership
 * @param {string} userId - User ID
 * @param {string} membershipId - Membership ID
 * @returns {Object} - Updated membership
 */
export async function resumeMembership(userId, membershipId) {
  const membership = await prisma.userMembership.findFirst({
    where: {
      id: membershipId,
      userId,
      status: 'PAUSED'
    }
  });
  
  if (!membership) {
    throw new Error('Paused membership not found');
  }
  
  // Calculate new end date based on remaining time
  // This is simplified for the example
  const updatedMembership = await prisma.userMembership.update({
    where: { id: membershipId },
    data: {
      status: 'ACTIVE'
    }
  });
  
  return updatedMembership;
}

/**
 * Cancel a membership
 * @param {string} userId - User ID
 * @param {string} membershipId - Membership ID
 * @returns {Object} - Updated membership
 */
export async function cancelMembership(userId, membershipId) {
  const membership = await prisma.userMembership.findFirst({
    where: {
      id: membershipId,
      userId,
      status: { in: ['ACTIVE', 'PAUSED'] }
    }
  });
  
  if (!membership) {
    throw new Error('Active or paused membership not found');
  }
  
  // Update membership status to cancelled
  const updatedMembership = await prisma.userMembership.update({
    where: { id: membershipId },
    data: {
      status: 'CANCELLED',
      endDate: new Date() // End immediately
    }
  });
  
  return updatedMembership;
}
