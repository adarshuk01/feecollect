import React, { useState, useMemo } from "react";

import AddClient from "../../components/Admin/AddClient";
import TextInput from "../../components/common/TextInput";
import { ChevronLeft, Search, User } from "lucide-react";
import Button from "../../components/common/Button";
import { useAdmin } from "../../context/admin/AdminContext";
import { Link } from "react-router-dom";

function Client() {
  const { clients } = useAdmin();
  const [showAddClient, setShowAddClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    return Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const daysLeft = calculateDaysLeft(client.endDate);
      const isExpired = daysLeft <= 0;
      const matchesSearch =
        client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client?.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "active" && !isExpired) ||
        (filterStatus === "expired" && isExpired);
      return matchesSearch && matchesFilter;
    });
  }, [clients, searchQuery, filterStatus]);

  return (
    <div className="space-y-4">
      {showAddClient ? (
        <>
          <div className="flex items-center mb-4 gap-2 text-gray-600">
            <button onClick={() => setShowAddClient(false)}>
              <ChevronLeft />
            </button>
            <h1 className="text-xl font-bold uppercase">Add New Client</h1>
          </div>
          <AddClient />
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold uppercase">Manage Clients</h1>

          <div className="bg-white p-4 rounded-2xl shadow-md flex flex-wrap gap-4 items-center">
            <TextInput
              placeholder="Search Clients"
              icon={Search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="border bg-gray-50 border-gray-300 rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
            <Button text="New Client" icon={User} onClick={() => setShowAddClient(true)} />
          </div>

          {/* Cards */}
          <div className="p-4 bg-white rounded-2xl flex flex-wrap gap-4 justify-">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => {
                console.log(client);
                
                const daysLeft = calculateDaysLeft(client.endDate);
                const isExpired = daysLeft <= 0;
                return (
                  <Link
                  to={`/admin/client/${client.id}`}
                    key={client.id}
                    className={`shadow-md p-4 w-full sm:w-[48%] lg:w-64 rounded-2xl border-l-4 ${
                      isExpired ? "border-red-500" : "border-green-500"
                    }`}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="bg-gray-300 p-3 rounded-full">
                        <User />
                      </div>
                      <div>
                        <p className="font-bold">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </div>
                    <hr className="my-4 border-gray-200" />
                    {isExpired ? (
                      <p className="text-red-600 font-semibold">Expired!</p>
                    ) : (
                      <p className="text-green-600 font-semibold">{daysLeft} Days Left</p>
                    )}
                  </Link>
                );
              })
            ) : (
              <p className="text-gray-500">No clients found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Client;
