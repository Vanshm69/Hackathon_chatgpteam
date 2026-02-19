import jwt from "jsonwebtoken";
import {
  generateOTP,
  checkRateLimit,
  cacheOTP,
  verifyOTPCode,
  findOrCreateUser,
  cacheUser
} from "../services/auth.service.js";
import { sendOTPEmail } from "../services/email.service.js";

export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    await checkRateLimit(email);

    const otp = generateOTP();
    await cacheOTP(email, otp);

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    await verifyOTPCode(email, otp);

    const user = await findOrCreateUser(email);
    await cacheUser(user);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    await logoutService(req.user.id);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
};