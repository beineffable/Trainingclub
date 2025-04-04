// src/api/auth.js
import prisma from '../lib/prisma';
import { supabaseClient, supabaseAdmin } from '../lib/supabase';

/**
 * Register a new user with access code
 * @param {Object} userData - User registration data
 * @param {string} accessCode - Access code for registration
 * @returns {Object} - Newly created user
 */
export async function registerUser(userData, accessCode) {
  // Validate access code
  const validCode = await prisma.accessCode.findFirst({
    where: {
      code: accessCode,
      isUsed: false,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    }
  });

  if (!validCode) {
    throw new Error('Invalid or expired access code');
  }

  // Create user in Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: userData.email,
    password: userData.password,
    email_confirm: true
  });

  if (authError) {
    throw new Error(`Authentication error: ${authError.message}`);
  }

  // Create user in database
  const user = await prisma.user.create({
    data: {
      id: authData.user.id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      membershipTier: userData.membershipTier,
      referralCode: generateReferralCode(userData.firstName, userData.lastName),
      referredById: validCode.createdById || null
    }
  });

  // Mark access code as used
  await prisma.accessCode.update({
    where: { id: validCode.id },
    data: {
      isUsed: true,
      usedById: user.id
    }
  });

  return user;
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} - Login session data
 */
export async function loginUser(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    throw new Error(`Login error: ${error.message}`);
  }

  return data;
}

/**
 * Get current user profile
 * @param {string} userId - User ID
 * @returns {Object} - User profile data
 */
export async function getUserProfile(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      memberships: {
        include: {
          plan: true
        },
        where: {
          status: 'ACTIVE'
        },
        orderBy: {
          endDate: 'desc'
        },
        take: 1
      },
      bookings: {
        include: {
          class: true
        },
        where: {
          status: {
            in: ['CONFIRMED', 'ATTENDED']
          },
          class: {
            startTime: { gt: new Date() }
          }
        },
        orderBy: {
          class: {
            startTime: 'asc'
          }
        }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} userData - User data to update
 * @returns {Object} - Updated user
 */
export async function updateUserProfile(userId, userData) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone
    }
  });

  return user;
}

/**
 * Generate a unique referral code
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @returns {string} - Unique referral code
 */
function generateReferralCode(firstName, lastName) {
  const prefix = `${firstName.substring(0, 2)}${lastName.substring(0, 2)}`.toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${randomPart}`;
}

/**
 * Request a new access code
 * @param {string} userId - User ID requesting the code
 * @returns {Object} - Newly created access code
 */
export async function requestAccessCode(userId) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Generate a unique access code
  const code = generateAccessCode();
  
  // Create access code in database
  const accessCode = await prisma.accessCode.create({
    data: {
      code,
      createdById: userId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days expiry
    }
  });

  return accessCode;
}

/**
 * Generate a unique access code
 * @returns {string} - Unique access code
 */
function generateAccessCode() {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
  let code = '';
  
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return code;
}

/**
 * Validate an access code
 * @param {string} code - Access code to validate
 * @returns {Object} - Access code data if valid
 */
export async function validateAccessCode(code) {
  const accessCode = await prisma.accessCode.findFirst({
    where: {
      code,
      isUsed: false,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } }
      ]
    },
    include: {
      createdBy: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  });

  if (!accessCode) {
    throw new Error('Invalid or expired access code');
  }

  return accessCode;
}
