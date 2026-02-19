import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectRedis } from "./src/config/redis.config.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Dynamically import AFTER dotenv is loaded
  const { verifySMTPConnection } = await import("./src/services/email.service.js");

  await connectRedis();
  await verifySMTPConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();