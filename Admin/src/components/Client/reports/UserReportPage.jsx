import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../common/Breadcrumbs";
import Tabs from "../../common/Tabs";
import { format } from "date-fns"; // Recommended for production-ready date formatting

// Mock Data Structure for reference (replace with actual data fetching if needed)
const mockUser = {
  id: 'U12345',
  name: 'Rohan Sharma',
  email: 'rohan.sharma@example.com',
  phone: '+91 98765 43210',
  transactions: [
    { date: '2024-10-25T10:00:00Z', amount: 5000, mode: 'Online' },
    { date: '2024-09-15T15:30:00Z', amount: 4500, mode: 'Cash' },
  ],
  attendance: [
    { month: 'Oct', year: 2024, present: 20, absent: 2 },
    { month: 'Sep', year: 2024, present: 18, absent: 4 },
  ],
};

/**
 * 🎨 Production-Ready User Report Page
 * Displays a student's detailed report, including personal info,
 * transactions, and attendance in a tabbed interface.
 */
function UserReportPage() {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use useEffect to handle state from useLocation and simulate loading
  useEffect(() => {
    // Simulate a minor delay for a clean loading effect
    const timer = setTimeout(() => {
      setUser(state || null); // Assuming the user object is passed as state: { user: {...} }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [state]);

  // --- Components for Production UI ---

  // 🦴 Skeleton Loader for better UX
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 bg-gray-300 rounded w-3/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md h-32 col-span-1">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        </div>
      </div>
    </div>
  );

  // ❌ Error State for missing data
  if (!loading && !user) {
    return (
      <div className="p-8 text-center bg-white m-4 rounded-xl shadow-lg border border-red-200">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          User Data Not Found
        </h1>
        <p className="text-gray-600">
          The requested report for student ID: **{id}** could not be loaded. Please ensure you are navigating from a valid source.
        </p>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="p-4 md:p-8">
        <Breadcrumbs />
        <LoadingSkeleton />
      </div>
    );
  }

  // --- Tab Content Definitions (Using Tables) ---

  const TransactionTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mode
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user.transactions.length > 0 ? (
            user.transactions.map((t, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace- text-sm font-medium text-gray-900">
                  {/* Format date for better display */}
                  {format(new Date(t.date), "dd MMM yyyy, hh:mm a")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                  ₹{t.amount.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {t.mode}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No transactions recorded.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const AttendanceTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month / Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Present Days
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Absent Days
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {user.attendance.length > 0 ? (
            user.attendance.map((a, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {a.month} {a.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                  {a.present} days
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                  {a.absent} days
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No attendance data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  // 👉 Define tabs using the new table components
  const tabs = [
    {
      id: "transactions",
      label: "Transactions",
      content: <TransactionTable />,
    },
    {
      id: "attendance",
      label: "Attendance",
      content: <AttendanceTable />,
    },
  ];

  // --- Main Render ---

  return (
    <div className="p-2  space-y-6 bg-gray-50 ">
      <Breadcrumbs />

      <header className="space-y-1">
        <h1 className="text-xl font-extrabold text-gray-900">
          Student Report: **{user.name}**
        </h1>
        <p className="text-lg text-gray-500">ID: {id}</p>
      </header>

      {/* Student Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-primary border-b border-primary pb-2">
          Student Details 🧑‍🎓
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-700">
          <p>
            <strong className="text-gray-900">Email:</strong> {user.email}
          </p>
          <p>
            <strong className="text-gray-900">Phone:</strong> {user.phone}
          </p>
          {/* Add more info here like Address, Class, etc. */}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default UserReportPage;