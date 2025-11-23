import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Tabs from '../../components/common/Tabs';
import { Calendar, ChevronRight, Coins, Search } from 'lucide-react';
import FeeReport from '../../components/Client/reports/FeeReport';
import AttendanceReport from '../../components/Client/reports/AttendanceReport';
import TextInput from '../../components/common/TextInput';

function Reports() {

  const navigate = useNavigate();

  const dummyUsers = [
    {
      id: "STU001",
      name: "Arjun Kumar",
      phone: "9876543210",
      email: "arjun@gmail.com",
      transactions: [
        { date: "2024-01-05", amount: 1500, mode: "Cash" },
        { date: "2024-02-05", amount: 1500, mode: "UPI" },
      ],
      attendance: [
        { month: "Jan", year: 2024, present: 22, absent: 4 },
        { month: "Feb", year: 2024, present: 20, absent: 6 },
      ]
    },
    {
      id: "STU002",
      name: "Sneha R",
      phone: "9123456780",
      email: "sneha@gmail.com",
      transactions: [
        { date: "2024-01-08", amount: 1200, mode: "Cash" },
        { date: "2024-02-08", amount: 1200, mode: "Card" },
      ],
      attendance: [
        { month: "Jan", year: 2024, present: 24, absent: 2 },
        { month: "Feb", year: 2024, present: 23, absent: 3 },
      ]
    },
    {
      id: "STU003",
      name: "Nikhil Das",
      phone: "9991112223",
      email: "nikhil@gmail.com",
      transactions: [
        { date: "2024-01-10", amount: 1800, mode: "UPI" },
        { date: "2024-02-10", amount: 1800, mode: "Cash" },
      ],
      attendance: [
        { month: "Jan", year: 2024, present: 21, absent: 5 },
        { month: "Feb", year: 2024, present: 20, absent: 8 },
      ]
    },
    {
      id: "STU004",
      name: "Meera Joseph",
      phone: "8877665544",
      email: "meera@gmail.com",
      transactions: [
        { date: "2024-01-12", amount: 1600, mode: "Card" },
        { date: "2024-02-12", amount: 1600, mode: "UPI" },
      ],
      attendance: [
        { month: "Jan", year: 2024, present: 25, absent: 1 },
        { month: "Feb", year: 2024, present: 24, absent: 4 },
      ]
    },
  ];

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef(null);

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter users
  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.id.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    {
      id: "fees",
      label: "Fees",
      icon: Coins,
      content: <FeeReport />,
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: Calendar,
      content: <AttendanceReport />,
    },
  ];

  return (
    <div className="p-2">
      {/* Header */}
      <header className="mb-4">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 mt-1 text-sm">
          View students fee and Attendance report!
        </p>
      </header>

      {/* Search Input */}
      <div className="relative" ref={searchRef}>
        <TextInput
        label={'Search Members'}
          icon={Search}
          placeholder="Search student (id, phone, name, email)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />

        {showDropdown && (
          <div className="bg-white rounded-lg shadow-2xl p-4 mt-2 absolute w-full z-20 max-h-64 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <p className="text-gray-500 text-sm">No Student Found!</p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-2 border-b flex justify-between items-center border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    navigate(`/client/reports/${user.id}`, { state: user });
                    setShowDropdown(false);
                  }}
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.id} • {user.phone}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <ChevronRight className="text-gray-800" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Reports;
