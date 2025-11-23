import React, { useState, useMemo } from "react";

const sampleData = [
  {
    name: "Shafeeq",
    id: "1728",
    contact: "9847939392",
    subscription: "Monthly",
    group: "Class -1",
    lastPaid: "15/08/2025",
    totalPaid: 1000,
    pending: 8000,
  },
  {
    name: "Pravan",
    id: "1729",
    contact: "9895745467",
    subscription: "Monthly",
    group: "Class -1",
    lastPaid: "19/09/2025",
    totalPaid: 5000,
    pending: 3000,
  },
  {
    name: "Adarsh",
    id: "1730",
    contact: "9846765384",
    subscription: "Monthly",
    group: "Class -1",
    lastPaid: "23/08/2025",
    totalPaid: 4000,
    pending: 4000,
  },
  {
    name: "Jesin",
    id: "1731",
    contact: "9856787654",
    subscription: "Monthly",
    group: "Class -2",
    lastPaid: "09/07/2025",
    totalPaid: 2000,
    pending: 0,
  },
];

export default function FeeReportCards() {
  const [search, setSearch] = useState("");
  const [pendingFilter, setPendingFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("Class -1");

  const groups = [...new Set(sampleData.map((d) => d.group))];

  const filtered = useMemo(() => {
    return sampleData
      .filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.id.includes(search)
      )
      .filter((d) => (pendingFilter === "pending" ? d.pending > 0 : true))
      .filter((d) => (groupFilter ? d.group === groupFilter : true));
  }, [search, pendingFilter, groupFilter]);

  return (
    <div className=" ">
      <h2 className="text-lg font-extrabold text-gray-800 mb-8 border-b pb-3">
        📚 Group Wise Fee Report
      </h2>

      {/* Filters Section */}
      <div className="grid md:grid-cols-3 gap-5 bg-white  rounded-xl mb-8">
        <input
          type="text"
          placeholder="🔍 Search name or ID"
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded-lg p-3 w-full bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={pendingFilter}
          onChange={(e) => setPendingFilter(e.target.value)}
        >
          <option value="all">Status: All</option>
          <option value="pending">Status: Pending Only</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg p-3 w-full bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
        >
          {groups.map((g) => (
            <option key={g} value={g}>
              Group: {g}
            </option>
          ))}
        </select>
      </div>
      {/* --- */}

      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((d) => {
          // Determine the border color based on pending status
          const borderColor = d.pending > 0 ? "border-red-400" : "border-green-400";
          
          return (
            <div
              key={d.id}
              // Enhanced card design
              className={`bg-white border-t-4 ${borderColor} rounded-xl shadow-lg p-5 flex flex-col transition duration-300 transform hover:scale-[1.02] hover:shadow-xl`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3 border-b pb-3">
                <h3 className="text-xl font-bold text-gray-800 truncate">
                  {d.name}
                </h3>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                  ID: {d.id}
                </span>
              </div>

              {/* Contact and Group Info */}
              <div className="mb-4 space-y-1">
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2 text-blue-500">📞</span> {d.contact}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="mr-2 text-purple-500">🏢</span> {d.group}
                </p>
              </div>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {/* Subscription */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Subscription
                  </p>
                  <p className="font-semibold text-sm text-gray-700">
                    {d.subscription}
                  </p>
                </div>
                {/* Last Paid */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Last Paid
                  </p>
                  <p className="font-semibold text-sm text-gray-700">
                    {d.lastPaid}
                  </p>
                </div>
                {/* Total Paid */}
                <div className="col-span-1">
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wider">
                    ✅ Total Paid
                  </p>
                  <p className="font-extrabold text-green-700 text-lg">
                    ₹{d.totalPaid}
                  </p>
                </div>
                {/* Pending */}
                <div className="col-span-1">
                  <p className="text-xs text-red-600 font-medium uppercase tracking-wider">
                    🚨 Pending
                  </p>
                  <p className="font-extrabold text-red-700 text-lg">
                    ₹{d.pending}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* --- */}

      {filtered.length === 0 && (
        <div className="flex justify-center items-center p-4 bg-white rounded-xl shadow-inner">
          <p className="text-xl text-gray-500 font-medium">
            😔 No records found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}