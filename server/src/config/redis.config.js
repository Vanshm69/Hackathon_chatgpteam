import { createClient } from "redis";

const redisClient = createClient();

// Handle connection success
redisClient.on("connect", () => {
    console.log("🔌 Redis connected successfully");
});

// Handle connection errors
redisClient.on("error", (err) => {
    console.error("❌ Redis connection error:", err);
});

// Connect to Redis asynchronously
export const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error("❌ Failed to connect to Redis:", err);
    }
};

export default redisClient;

