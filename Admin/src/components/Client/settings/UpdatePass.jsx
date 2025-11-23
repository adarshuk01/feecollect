import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Breadcrumbs from "../../common/Breadcrumbs";
import TextInput from "../../common/TextInput";
import Button from "../../common/Button";

function UpdatePass() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading,setloading]=useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    
    if (formData.new_password !== formData.confirm_password) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      // ✅ Get token from sessionStorage
      const storedClient = sessionStorage.getItem("client");
      const clientData = storedClient ? JSON.parse(storedClient) : null;
      const token = clientData?.token;

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return;
      }

      // ✅ API call with Authorization header
      const response = await axios.post(
        "http://127.0.0.1:8000/feezy/update-password/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setFormData({ old_password: "", new_password: "", confirm_password: "" });
      }
    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.old_password ||
        error.response?.data?.message ||
        "Failed to update password. Please try again.";
      toast.error(message);
    }finally{
       setloading(false)
    }
  };

  return (
    <div className="bg-white p-4  mx-auto rounded-2xl">
      <Breadcrumbs />
      <form onSubmit={handleSubmit} className="space-y-2">
        <TextInput
          type="password"
          label="Current password"
          value={formData.old_password}
          onChange={(e) => handleChange("old_password", e.target.value)}
        />
        <TextInput
          type="password"
          label="New password"
          value={formData.new_password}
          onChange={(e) => handleChange("new_password", e.target.value)}
        />
        <TextInput
          type="password"
          label="Confirm password"
          value={formData.confirm_password}
          onChange={(e) => handleChange("confirm_password", e.target.value)}
        />

       
        <Button loading={loading} className="w-full" type="submit" text={'Update password'} />
      </form>
    </div>
  );
}

export default UpdatePass;
