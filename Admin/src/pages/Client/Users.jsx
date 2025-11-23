import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";
import { Search, User } from "lucide-react";
import usersData from "../../data/userData";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import { FaUserPlus } from "react-icons/fa";

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "all";
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState(q);
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(usersData);

  useEffect(() => {
    setStatusFilter(q);
  }, [q]);

  const handleStatusFilterChange = (e) => {
    const newFilter = e.target.value;
    setStatusFilter(newFilter);
    setSearchParams({ q: newFilter });
  };

  const handlePaymentFilterChange = (e) => {
    setPaymentFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 🔹 Calculate pending / partially paid amount
  const getDueAmount = (user) => {
    const pendingAmounts = user.transactions
      .filter((txn) => txn.status === "pending" || txn.status === "partial")
      .map((txn) => Number(txn.amount.replace("₹", "")));

    if (pendingAmounts.length === 0) return null;

    const total = pendingAmounts.reduce((a, b) => a + b, 0);
    return `₹${total}`;
  };

  // 🔹 Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || user.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // 🔹 Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "inactive":
        return "text-yellow-600";
      case "expired":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // 🔹 Payment color
  const getPaymentColor = (payment) => {
    switch (payment) {
      case "paid":
        return "text-green-600";
      case "pending":
        return "text-red-500";
      case "partially":
        return "text-yellow-600";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-4 rounded-xl p-">
      <header className="mb-4">
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1 text-sm">
          View and manage your Customers !
        </p>
      </header>

      <div className="flex justify-between items-end">
        <Breadcrumbs />
        <Button
          className="text-nowrap"
          icon={FaUserPlus}
          text="Add Member"
          onClick={() => navigate("/client/customers/add")}
        />
      </div>

      {/* Search & Filter */}
      <div className="rounded-2xl flex items-center gap-4 lg:gap-10 flex-wrap lg:flex-nowrap">
        <TextInput
          placeholder="Search by user name"
          icon={Search}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="flex gap-3 lg:items-center">
          <select
            className="border bg-gray-50 focus:outline-none border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>

          <select
            className="border bg-gray-50 focus:outline-none border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
            value={paymentFilter}
            onChange={handlePaymentFilterChange}
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="partially">Partially Paid</option>
          </select>
        </div>
      </div>

      {/* Users List */}
      <div className="divide-y divide-gray-200">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((member, index) => (
            <Link
              to={`/client/customers/${member.id}`}
              key={member.id}
              className="flex justify-between items-center py-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <p className="text-lg font-semibold w-6 text-gray-500">
                  {index + 1}
                </p>
                <div className="w-fit p-3 text-white bg-gray-300 rounded-full">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className={`text-sm font-medium ${getStatusColor(member.status)}`}>
                    {member.status.charAt(0).toUpperCase() +
                      member.status.slice(1)}
                  </p>
                </div>
              </div>

              {/* Payment Status + Due Amount */}
              <p className={`font-semibold ${getPaymentColor(member.payment)}`}>
                {member.payment.toUpperCase()}

                {member.payment !== "paid" && (
                  <span className="ml-2 text-gray-700">
                    {getDueAmount(member)}
                  </span>
                )}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Users;
