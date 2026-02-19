import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import itemRoutes from "./routes/item.routes.js";
import claimRoutes from "./routes/claim.routes.js";


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/claims", claimRoutes);
app.use("/api/v1/claims", claimRoutes);

console.log("SMTP USER:", process.env.SMTP_USER);
console.log("SMTP PASS:", process.env.SMTP_PASS);
export default app;