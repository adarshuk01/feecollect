import React, { useState, useMemo } from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import {
  FaBook,
  FaBus,
  FaTshirt,
  FaBuilding,
  FaMoneyBillWave,
  FaUserGraduate,
} from "react-icons/fa";
import { DollarSign, Save } from "lucide-react";

function SubscriptionForm({ mode = "add", initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    subscriptionName: "",
    tuitionFee: "",
    admissionFee: "",
    bookFee: "",
    transportFee: "",
    uniformFee: "",
    managementFee: "",
    otherFee: "",
    ...initialData,
  });

  const [recurringFlags, setRecurringFlags] = useState({
    tuitionFee: false,
    admissionFee: false,
    bookFee: false,
    transportFee: false,
    uniformFee: false,
    managementFee: false,
    otherFee: false,
  });

  const update = (key, val) =>
    setFormData({
      ...formData,
      [key]: val,
    });

  const toggleRecurring = (key) =>
    setRecurringFlags({
      ...recurringFlags,
      [key]: !recurringFlags[key],
    });

  const totalRecurringAmount = useMemo(() => {
    return Object.keys(recurringFlags).reduce((sum, key) => {
      if (recurringFlags[key] && formData[key]) {
        return sum + Number(formData[key]);
      }
      return sum;
    }, 0);
  }, [formData, recurringFlags]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, recurringFlags, totalRecurringAmount });
  };

  // UPDATED renderFeeInput
  const renderFeeInput = (label, key, icon) => (
    <div className="border border-gray-200 p-3 rounded-xl shadow-sm bg-gray-50">
      <TextInput
        label={label}
        type="number"
        value={formData[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}`}
        icon={icon}
      />

      {/* Remove checkbox only for Admission Fee */}
      {key !== "admissionFee" && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={recurringFlags[key]}
            onChange={() => toggleRecurring(key)}
          />
          <span className="text-sm text-gray-600">Monthly Recurring</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <TextInput
          label="Subscription Name"
          type="text"
          value={formData.subscriptionName}
          onChange={(e) => update("subscriptionName", e.target.value)}
          placeholder="Enter subscription name"
          icon={FaUserGraduate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {renderFeeInput("Tuition Fee", "tuitionFee", DollarSign)}
          {renderFeeInput("Admission Fee", "admissionFee", FaMoneyBillWave)}
          {renderFeeInput("Book Fee", "bookFee", FaBook)}
          {renderFeeInput("Transport Fee", "transportFee", FaBus)}
          {renderFeeInput("Uniform Fee", "uniformFee", FaTshirt)}
          {renderFeeInput("Management Fee", "managementFee", FaBuilding)}
          {renderFeeInput("Other Fee", "otherFee", FaMoneyBillWave)}
        </div>

        <div className="bg-green-100 p-4 rounded-xl text-lg font-bold text-green-800">
          Total Monthly Recurring Amount: ₹{totalRecurringAmount}
        </div>

        <div className="flex justify-end pt-4">
          <Button icon={Save} text={mode === "add" ? "Save" : "Update"} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default SubscriptionForm;
