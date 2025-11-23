import React, { useState } from "react";
import Button from "../../components/common/Button";
import TextInput from "../../components/common/TextInput";
import { ChevronRight, Plus, Search, Users } from "lucide-react";
import Modal from "../../components/common/Modal";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import Breadcrumbs from "../../components/common/Breadcrumbs";

function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([
     { id: 1, name: "Morning 6AM", members: 13, status: "active" },
    
  ]);

  // 🔍 Filter + Search Logic
  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || group.status === filter;
    return matchesSearch && matchesFilter;
  });

  // ➕ Add New Group
  const handleAddGroup = () => {
    if (groupName.trim() === "") return;
    const newGroup = {
      id: groups.length + 1,
      name: groupName,
      members: Math.floor(Math.random() * 10) + 5,
      status: "active",
    };
    setGroups([...groups, newGroup]);
    setGroupName("");
    setIsModalOpen(false);
  };

  return (
    <div className="p-">
     {/* Header */}
        <header className="mb-4">
          <h1 className="lg:text-3xl text-2xl font-bold text-gray-900">Groups</h1>
          <p className="text-gray-500 mt-1 text-sm">
            View and manage your groups !
          </p>
        </header>
    <div className="space-y-4  rounded-lg">
         <Breadcrumbs /> {/* ← Add here */}
     
      {/* 🔍 Search & Filter */}
      <div className=" rounded-2xl  flex items-center gap-4 lg:gap-10 flex-wrap lg:flex-nowrap">
        <TextInput
          placeholder="Search by group name"
          icon={Search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex gap-2 lg:items-center">
          <div className="flex gap-2 items-center">
          
            <select
              className="border bg-gray-50 border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 transition"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <Button
            className="text-nowrap"
            icon={Plus}
            text="New Group"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* 📋 Groups List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => (
            <Link
              to={'/client/groups/1'}
              key={group.id}
              className="bg-white p-4 rounded-2xl shadow-md flex justify-between gap-2 items-center"
            >
                <div className="flex gap-2">
              <div className="bg-gray-300 p-3 text-white rounded-full w-fit">
                <Users />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-primary capitalize">{group.name}</p>
                <p className="text-sm text-gray-500">{group.members} members</p>
                
              </div>
              </div>
              <ChevronRight/>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-4">
            No groups found.
          </p>
        )}
      </div>

      {/* 🧩 Modal for Adding Group */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Group"
      >
        <TextInput
          label="Group Name"
          placeholder="Enter group name"
          icon={Users}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="mt-3">
          <Button text="Create" onClick={handleAddGroup} />
        </div>
      </Modal>
    </div>
    </div>
  );
}

export default Groups;
