import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import TextInput from "../../components/common/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useClient } from "../../context/client/ClientContext";

function ClientLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, loading, error } = useClient();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const res = await login(formData.username, formData.password);
    if (res) {
      toast.success("Login successful!");
      setTimeout(() => navigate("/client"), 1000); // ⏳ wait 1s before navigating
    } else {
      toast.error(error || "Invalid credentials, please try again.");
    }
  };

  return (
    <div className="lg:min-h-screen h-[90vh] flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl uppercase font-bold flex gap-2 items-center text-gray-600">
          Client Login
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
          disabled={loading}
          className={`w-full text-white py-2 rounded-lg transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-right text-primary underline underline-offset-4"> <Link to={'/client/forgot-password'}> Forgot Password?</Link></p>
      </form>
    </div>
  );
}

export default ClientLogin;
