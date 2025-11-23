import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../common/TextInput";
import { ChevronLeft, Lock, Mail } from "lucide-react";
import Modal from "../common/Modal";

function ForgotPass() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // ✅ to track success
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setModalTitle("Error");
      setModalMessage("Please enter your email address.");
      setIsModalOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feezy/forgot-password/",
        { email }
      );

      if (response.status === 200) {
        setModalTitle("Success");
        setModalMessage(
          "A new password has been sent to your registered email address."
        );
        setIsSuccess(true); // ✅ success state
      } else {
        setModalTitle("Error");
        setModalMessage("Unexpected response. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setModalTitle("Error");
      if (error.response?.data?.email) {
        setModalMessage(error.response.data.email);
      } else {
        setModalMessage("Something went wrong. Please try again later.");
      }
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setIsModalOpen(true);
    }
  };

  const handleGoToLogin = () => {
    setIsModalOpen(false);
    navigate("/client/login");
  };

  return (
    <div className="lg:min-h-screen h-[90vh] flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl px-4 py-6 w-full max-w-md space-y-4"
      >
        <div>
             <Link to={'/client/login'} className="flex gap- underline-offset-2 underline mb-4 text-primary"> <ChevronLeft /> back to login </Link>
          <h1 className="font-bold text-xl flex gap-2 mb-1">
            <Lock /> Forget password?
          </h1>
          <p className="text-gray-700 text-sm">
            Provide your account's email for which you want to reset password
          </p>
        </div>

        <TextInput
          label=""
          icon={Mail}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`p-2 rounded-lg w-full text-white font-bold transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Next"}
        </button>
       
      </form>

      {/* 🔹 Modal for Success/Error */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <div className="text-gray-700 space-y-4">
          <p>{modalMessage}</p>

          {isSuccess && (
            <div className="text-right">
              <button
                onClick={handleGoToLogin}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ForgotPass;
