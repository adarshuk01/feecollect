import React from "react";
import { FaUsers, FaUserCheck, FaUserTimes, FaClock, FaDollarSign } from "react-icons/fa";
import { IoArrowUp, IoArrowDown } from "react-icons/io5";
import { useClient } from "../../context/client/ClientContext";

function Dashboard() {

  
  const stats = [
    {
      title: "Total Clients",
      value: 120,
      percent: "+8%",
      isIncrease: true,
      icon: <FaUsers size={34} />,
    },
    {
      title: "Active Clients",
      value: 95,
      percent: "+5%",
      isIncrease: true,
      icon: <FaUserCheck size={34} />,
    },
    {
      title: "Total Revenue",
      value: 10000,
      percent: "-3%",
      isIncrease: false,
      icon: <FaDollarSign size={34} />,
    },
    {
      title: "Expired Clients",
      value: 15,
      percent: "-2%",
      isIncrease: false,
      icon: <FaUserTimes size={34} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-5 rounded-xl shadow-md bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-sm text-gray-500 font-medium">{item.title}</h3>
            <p className="text-3xl font-semibold text-gray-800">{item.value}</p>
            <div
              className={`flex items-center text-sm font-medium ${
                item.isIncrease ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.isIncrease ? (
                <IoArrowUp size={18} />
              ) : (
                <IoArrowDown size={18} />
              )}
              <span className="ml-1">{item.percent}</span>
            </div>
          </div>
          <div className="p-3 bg-blue-100 text-primary rounded-full shadow-sm">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
