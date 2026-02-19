import jwt from "jsonwebtoken";
import prisma from "../config/prisma.config.js";
import redisClient from "../config/redis.config.js";
export const authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try Redis cache first
    const cachedUser = await redisClient.get(
      `user:${decoded.userId}`
    );

    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }

    // Fallback to DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};