import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import TextInput from "../../components/common/TextInput"; // adjust the path as needed
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Simple validation
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      // 👇 Call your login API
      const response = await axios.post("http://127.0.0.1:8000/feezy/token/", {
        username: formData.username,
        password: formData.password,
      });

      // 👇 Example success toast
      toast.success("Login successful!");
        navigate('/admin')


      console.log("Login Response:", response.data);

      // Example: store token if backend returns one
      localStorage.setItem("token", response.data.token);

    } catch (error) {
      console.error("Login Error:", error);

      // 👇 Example error toast
      toast.error(
        error.response?.data?.message || "Invalid credentials, please try again."
      );
    }
  };

  return (
    <div className="lg:min-h-screen h-[90vh] flex justify-center items-center bg-gray-100 px-4">
      {/* Toaster component to display toast messages */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl uppercase font-bold flex gap-2 items-center text-gray-600">
          Admin Login
        </h2>

        <TextInput
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          icon={FaUser}
          error={errors.username}
        />

        <TextInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={FaLock}
          error={errors.password}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
