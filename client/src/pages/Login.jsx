import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { requestOTP, verifyOTP, error } = useAuth();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleRequestOTP = () => {
    const success = requestOTP(email);
    if (success) setOtpSent(true);
  };

  const handleVerify = () => {
    verifyOTP(email, otp);
  };

  return (
    <div className="flex h-screen justify-center items-center bg-black">
      <div className="bg-white p-10 rounded-xl w-96">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Login with OTP
        </h2>

        {!otpSent ? (
          <>
            <input
              placeholder="Registered Email"
              className="w-full border p-3 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleRequestOTP}
              className="w-full bg-red-600 text-white py-3 rounded"
            >
              Request OTP
            </button>
          </>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              className="w-full border p-3 rounded mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerify}
              className="w-full bg-black text-white py-3 rounded"
            >
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}

      </div>
    </div>
  );
}
