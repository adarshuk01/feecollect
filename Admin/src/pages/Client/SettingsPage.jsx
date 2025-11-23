import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Star,
  HelpCircle,
  LogOut,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// The main Settings Page component
const SettingsPage = () => {
  // Mock authentication state for demonstration
  const [userName, setUserName] = useState("Jane Doe");
  const navigate =useNavigate()

  const settingsData = [
    {
      title: "Account Settings",
      items: [
        {
          icon: User,
          label: "Profile Information",
          description: "Name, email, and phone number",
          to:'/client/settings/profile'
        },
        {
          icon: Lock,
          label: "Change Password",
          description: "Update your security credentials",
          to:'/client/settings/update-password'
        },
        {
          icon: Bell,
          label: "Notifications",
          description: "Manage alerts and preferences",
          to:'/client/settings/recieptpreview'
        },
      ],
    },
    {
      title: "General",
      items: [
        {
          icon: Star,
          label: "Rate & Review App",
          description: "Share your feedback with us",
          to:'/client/settings/'
        },
        {
          icon: HelpCircle,
          label: "Help & Support",
          description: "Find answers and contact support",
          to:'/client/settings/'
        },
      ],
    },
  ];

  const handleLogout = () => {
    console.log("User logged out successfully.");
    alert("Logging out...");
  };

  const handleItemClick = (label,to) => {
    console.log(`Clicked on: ${label}`);
    navigate(`${to}`)
  };

  // Individual settings item component
  const SettingsItem = ({ Icon, label, description,to }) => (
    <button
      onClick={() => handleItemClick(label,to)}
      className="flex items-center justify-between w-full p-4 hover:bg-indigo-50 transition-colors duration-150 ease-in-out cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-indigo-100/70 rounded-full text-primary group-hover:bg-indigo-200 transition">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-gray-900 font-medium text-base">{label}</p>
          <p className="text-gray-500 text-sm hidden sm:block">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition" />
    </button>
  );

  return (
    <div className="  p- rounded-2xl ">
      <div className=" mx-auto">
        {/* Header */}
        <header className="mb-4">
          <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage your account and app preferences.
          </p>
        </header>

        {/* Profile / Premium Card */}
        <div className="mb-4 p-3 bg-white  rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {userName.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {userName}
                </p>
                <p className="text-sm text-gray-500">Edit Profile</p>
              </div>
            </div>

            {/* Premium Badge */}
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200 cursor-pointer hover:bg-yellow-100 transition-colors">
              <Zap className="w-4 h-4 fill-yellow-700" />
              Upgrade
            </div>
          </div>
        </div>

        {/* Map through settings sections */}
        <div className="space-y-4">
          {settingsData.map((section, i) => (
            <div
              key={i}
              className="bg-white  rounded-2xl overflow-hidden border border-gray-100"
            >
                
              <h3 className="text-sm font-medium uppercase text-gray-500 tracking-wider pt-6 px-6 pb-2 border-b border-gray-100">
                {section.title}
              </h3>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, j) => (
                  <SettingsItem
                    key={j}
                    Icon={item.icon}
                    label={item.label}
                    description={item.description}
                    to={item.to}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center p-4 gap-3 w-full bg-white text-red-600 border border-gray-200 rounded-xl  hover:bg-red-50 hover:text-red-700 transition-all font-semibold text-base"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Footer padding */}
      <div className="h-10"></div>
    </div>
  );
};

export default SettingsPage;
