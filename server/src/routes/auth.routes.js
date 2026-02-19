import express from "express";
import { logout, requestOTP, verifyOTP } from "../controllers/auth.controller.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/request-otp", requestOTP);
router.post("/verify-otp", verifyOTP);
router.post("/logout", logout);
router.post("/me", getCurrentUser);

export default router;