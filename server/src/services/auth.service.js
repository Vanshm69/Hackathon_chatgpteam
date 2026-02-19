import crypto from "crypto";
import redisClient from "../config/redis.config.js";
import prisma from "../config/prisma.config.js";

const OTP_EXPIRY = 300; // 5 minutes
const RATE_LIMIT_WINDOW = 300; // 5 min
const MAX_ATTEMPTS = 3;

// Generate 6 digit OTP
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Rate limit OTP requests
export const checkRateLimit = async (email) => {
  const key = `otp-req:login:${email}`;
  const attempts = await redisClient.incr(key);

  if (attempts === 1) {
    await redisClient.expire(key, RATE_LIMIT_WINDOW);
  }

  if (attempts > MAX_ATTEMPTS) {
    throw new Error("Too many OTP requests. Try again later.");
  }
};

// Cache OTP
export const cacheOTP = async (email, otp) => {
  await redisClient.setEx(`otp:login:${email}`, OTP_EXPIRY, otp);
};

// Verify OTP
export const verifyOTPCode = async (email, otp) => {
  const stored = await redisClient.get(`otp:login:${email}`);

  if (!stored) {
    throw new Error("OTP expired or not found");
  }

  if (stored !== otp) {
    throw new Error("Invalid OTP");
  }

  await redisClient.del(`otp:login:${email}`);
};

// Find or create user
export const findOrCreateUser = async (email) => {
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email }
    });
  }

  return user;
};

// Cache user in Redis (optional but clean)
export const cacheUser = async (user) => {
  await redisClient.setEx(
    `user:${user.id}`,
    60 * 60 * 24 * 7, // 7 days
    JSON.stringify(user)
  );
};

export const logoutService = async (userId) => {
  await redisClient.del(`user:${userId}`);
};