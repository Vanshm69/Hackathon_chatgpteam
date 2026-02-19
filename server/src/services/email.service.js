import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify SMTP on startup
export const verifySMTPConnection = async () => {
  try {
    await transporter.verify();
    console.log("📧 Gmail SMTP ready");
  } catch (err) {
    console.error("❌ Gmail SMTP error:", err);
  }
};

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"CARS - Campus Asset Recovery" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Login OTP",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>CARS Login Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 6px;">${otp}</h1>
        <p>This code is valid for 5 minutes.</p>
      </div>
    `
  });
};