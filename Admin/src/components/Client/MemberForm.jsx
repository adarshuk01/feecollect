import React, { useState } from "react";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Button from "../common/Button";
import {
  FaUser,
  FaCalendarAlt,
  FaUserFriends,
  FaFlag,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { DollarSign, Save } from "lucide-react";

function MemberForm({ mode = "add", initialData = {}, onSubmit }) {
  const subscriptions = ["Monthly", "Quarterly", "Yearly", "Half-Yearly", "Weekly"];
  const groups = ["Group A", "Group B", "Group C", "Group D", "Group E"];

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    nationality: "",
    parentName: "",
    contact: "",
    whatsapp: "",
    email: "",
    subscription: "",
    group: "",
    outstanding: "",
    recurringDate: "",
    ...initialData,
  });

  const update = (key, val) => setFormData({ ...formData, [key]: val });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg ">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextInput
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Enter full name"
          className="border w-full p-2 rounded-lg"
          icon={FaUser}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={(e) => update("dob", e.target.value)}
            className="border w-full p-2 rounded-lg"
            icon={FaCalendarAlt}
          />
          <TextInput
            label="Age"
            type="number"
            value={formData.age}
            onChange={(e) => update("age", e.target.value)}
            className="border w-full p-2 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectInput
            label="Gender"
            icon={FaUserFriends}
            value={formData.gender}
            onChange={(e) => update("gender", e.target.value)}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
          <TextInput
            label="Nationality"
            type="text"
            value={formData.nationality}
            onChange={(e) => update("nationality", e.target.value)}
            placeholder="Enter nationality"
            className="border w-full p-2 rounded-lg"
            icon={FaFlag}
          />
        </div>

        <TextInput
          label="Parent Name"
          type="text"
          value={formData.parentName}
          onChange={(e) => update("parentName", e.target.value)}
          placeholder="Enter parent name"
          className="border w-full p-2 rounded-lg"
          icon={FaUser}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Contact Number"
            type="number"
            value={formData.contact}
            onChange={(e) => update("contact", e.target.value)}
            placeholder="Enter contact number"
            className="border w-full p-2 rounded-lg"
            icon={FaPhone}
          />
          <TextInput
            label="WhatsApp Number"
            type="number"
            value={formData.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value)}
            placeholder="Enter WhatsApp number"
            className="border w-full p-2 rounded-lg"
            icon={FaPhone}
          />
        </div>

        <TextInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Enter email address"
          className="border w-full p-2 rounded-lg"
          icon={FaEnvelope}
        />

        {/* ✅ Subscription */}
        <div>
          <label className="font-medium text-gray-700 mb-2 block">
            Select Subscription
          </label>
          <div className="flex flex-nowrap gap-3 overflow-x-auto pb-3 lg:w-full w-[320px] -mx-1 px-1">
            {subscriptions.map((sub, i) => (
              <div
                key={i}
                onClick={() => update("subscription", sub)}
                className={`shrink-0 px-5 py-3 min-w-[140px] border rounded-xl text-center cursor-pointer transition-all
                ${
                  formData.subscription === sub
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-400"
                }`}
              >
                <p className="font-medium text-gray-800 whitespace-nowrap">
                  {sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Group */}
        <div>
          <label className="font-medium text-gray-700 mb-2 block">
            Select Batch / Group
          </label>
          <div className="flex flex-nowrap gap-3 overflow-x-auto lg:w-full w-[320px] pb-3 -mx-1 px-1">
            {groups.map((grp, i) => (
              <div
                key={i}
                onClick={() => update("group", grp)}
                className={`shrink-0 px-5 py-3 min-w-[140px] border rounded-xl text-center cursor-pointer transition-all
                ${
                  formData.group === grp
                    ? "bg-green-100 border-green-600"
                    : "border-gray-300 hover:bg-green-50 hover:border-green-400"
                }`}
              >
                <p className="font-medium text-gray-800 whitespace-nowrap">
                  {grp}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-end md:grid-cols-2 gap-4">
          <TextInput
            label="Outstanding Fee"
            type="number"
            value={formData.outstanding}
            onChange={(e) => update("outstanding", e.target.value)}
            placeholder="Enter outstanding fee"
            className="border w-full p-2 rounded-lg"
            icon={DollarSign}
          />
          

    <SelectInput
  label="Recurring Date"
  icon={FaCalendarAlt}   // optional: import from react-icons/fa
  value={formData.recurringDate}
  onChange={(e) => update("recurringDate", e.target.value)}
  options={Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }))}
/>
         
        </div>

        <div className="flex gap-3 justify-end pt-4">
          {mode === "add" && (
            <button
              type="button"
              className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10"
            >
              Save and Add Another
            </button>
          )}
          <Button
            icon={Save}
            text={mode === "add" ? "Save" : "Update"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default MemberForm;
