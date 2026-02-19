import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rollNo: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(
      form.name,
      form.email,
      form.rollNo,
      form.password
    );
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-black">
      <div className="bg-white p-10 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="College Roll No"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button className="w-full bg-red-600 text-white py-3 rounded">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
