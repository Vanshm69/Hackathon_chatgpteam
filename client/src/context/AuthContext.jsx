import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("carsUser")) || null
  );
  const [error, setError] = useState("");

  const register = (name, email, rollNo) => {
    if (!name || !email || !rollNo) {
      setError("All fields required");
      return false;
    }

    const role = rollNo.startsWith("ADMIN") ? "admin" : "user";

    const newUser = { name, email, rollNo, role };

    localStorage.setItem("tempUser", JSON.stringify(newUser));
    setError("");
    return true;
  };

  const requestOTP = () => {
    return true; // Always allow
  };

  const verifyOTP = (otp) => {
    if (!otp || otp.length < 4) {
      setError("Enter valid OTP");
      return false;
    }

    const savedUser = JSON.parse(localStorage.getItem("tempUser"));
    if (!savedUser) {
      setError("Register first");
      return false;
    }

    localStorage.setItem("carsUser", JSON.stringify(savedUser));
    setUser(savedUser);
    setError("");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("carsUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        requestOTP,
        verifyOTP,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
