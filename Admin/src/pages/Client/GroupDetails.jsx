import React, { useMemo, useState, useEffect } from "react";
import {
  Users,
  Pencil,
  Search,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { IoCalendarOutline } from "react-icons/io5";
import { GiPiggyBank } from "react-icons/gi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import Breadcrumbs from "../../components/common/Breadcrumbs";

// ---------------------------
// Small helper components
// ---------------------------
const Avatar = ({ name, size = 40 }) => {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-linear-to-br from-gray-200 to-gray-300 text-gray-700 font-semibold select-none`} 
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials}
    </div>
  );
};

const IconButton = ({ children, label, onClick, className = "" }) => (
  <button
    aria-label={label}
    onClick={onClick}
    className={`inline-flex items-center justify-center p-2 rounded-lg hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
  >
    {children}
  </button>
);

// ---------------------------
// Main component
// ---------------------------
export default function GroupDetails() {
  const [members, setMembers] = useState([
    { id: 1, name: "Rahul T", present: null, fee: "₹100", overdue: false, nextDate: "2025-11-01" },
    { id: 2, name: "Aditya P", present: null, fee: "₹100", overdue: false, nextDate: "2025-11-01" },
    { id: 3, name: "Sneha R", present: null, fee: "₹100", overdue: true, nextDate: "2025-12-05" },
    { id: 4, name: "Meera K", present: null, fee: "₹100", overdue: false, nextDate: "2025-12-01" },
  ]);

  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [confirm, setConfirm] = useState({ open: false, action: null });

  const totals = useMemo(() => {
    const present = members.filter((m) => m.present === true).length;
    const absent = members.filter((m) => m.present === false).length;
    const pending = members.filter((m) => m.present === null).length;
    return { present, absent, pending };
  }, [members]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) => m.name.toLowerCase().includes(q));
  }, [members, query]);

  const mark = (id, value) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, present: value } : m)));
  };

  const bulkMark = (value) => {
    setConfirm({ open: true, action: () => setMembers((prev) => prev.map((m) => ({ ...m, present: value }))) });
  };

  const [lastSnapshot, setLastSnapshot] = useState(null);
  useEffect(() => {
    setLastSnapshot(members.map((m) => ({ ...m })));
  }, []);

  const undo = () => {
    if (lastSnapshot) setMembers(lastSnapshot.map((m) => ({ ...m })));
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        setIsSearching(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className=" mx-auto p- sm:p- lg:p-">
      <Breadcrumbs />

      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-3 rounded-2xl text-blue-700">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Morning 6AM</h1>
              <p className="text-sm text-gray-500">{members.length} members</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <IoCalendarOutline className="text-gray-500" />
              <label className="sr-only">Select date</label>
              <input
                aria-label="Attendance date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-sm bg-transparent outline-none"
              />
            </div>

            <IconButton
              label="Bulk mark present"
              onClick={() => bulkMark(true)}
              className="bg-green-50 text-green-700"
            >
              <Check size={16} />
            </IconButton>

            <IconButton
              label="Bulk mark absent"
              onClick={() => bulkMark(false)}
              className="bg-red-50 text-red-700"
            >
              <X size={16} />
            </IconButton>

            <button
              onClick={() => {
                setIsSearching((s) => !s);
                if (!isSearching) setTimeout(() => document.getElementById("group-search")?.focus(), 80);
              }}
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition"
              aria-expanded={isSearching}
            >
              <Search size={16} />
              <span className="hidden sm:inline text-sm text-gray-700">Search</span>
            </button>

            <button
              onClick={() => alert("Edit group - integrate edit flow")}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition"
            >
              <Pencil size={16} />
              <span className="hidden sm:inline text-sm">Edit</span>
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border border-gray-100 bg-linear-to-br from-white to-gray-50">
            <p className="text-xs text-gray-500">Amount collected</p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">$0</h2>
              <GiPiggyBank size={36} className="text-blue-600 opacity-80" />
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-gray-100 bg-white">
            <p className="text-xs text-gray-500">Amount Due</p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">$0</h2>
              <RiCalendarScheduleFill size={36} className="text-blue-600 opacity-80" />
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-gray-100 bg-white flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Attendance</p>
              <h2 className="text-2xl font-semibold">{totals.present} / {members.length}</h2>
              <p className="text-sm text-gray-500">Present / Total</p>
            </div>
            <div className="flex flex-col items-end text-sm text-gray-500">
              <span>Absent: {totals.absent}</span>
              <span>Pending: {totals.pending}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* Search bar */}
          {isSearching && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center grow bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                  <Search className="text-gray-400 mr-2" size={18} />
                  <label htmlFor="group-search" className="sr-only">Search members by name</label>
                  <input
                    id="group-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search members by name"
                    className="w-full text-gray-700 outline-none"
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearching(false);
                    setQuery("");
                  }}
                  className="text-sm text-gray-500 px-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Members list */}
          <div className="space-y-3">
            {filtered.map((member, idx) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-white border border-gray-50 hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-gray-500">{idx + 1}</div>
                  <Avatar name={member.name} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      {member.overdue && (
                        <span className="text-xs text-red-600 font-medium">• overdue</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      Next: {member.nextDate} • Fee: {member.fee}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => mark(member.id, true)}
                    aria-pressed={member.present === true}
                    className={`px-3 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-300 transition ${
                      member.present === true
                        ? "bg-green-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Check size={14} />
                    <span className="hidden sm:inline">Present</span>
                  </button>

                  <button
                    onClick={() => mark(member.id, false)}
                    aria-pressed={member.present === false}
                    className={`px-3 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-300 transition ${
                      member.present === false
                        ? "bg-red-600 text-white shadow"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">Absent</span>
                  </button>

                  <button
                    onClick={() => alert("Open member details")}
                    className="p-2 rounded-lg text-gray-500 hover:text-blue-600 transition"
                    aria-label={`Open ${member.name} details`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No members match your search.
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setConfirm({ open: true, action: undo })}
                className="px-3 py-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50"
              >
                Undo
              </button>
              <button
                onClick={() => alert("Export attendance CSV")}
                className="px-3 py-2 rounded-lg bg-white border border-gray-100 hover:bg-gray-50"
              >
                Export
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Auto-saved locally • {date}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setConfirm({ open: false, action: null })}
          />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg border">
            <h3 className="text-lg font-semibold">Confirm action</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to perform this action? This can be undone with Undo.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirm({ open: false, action: null })}
                className="px-3 py-2 rounded-lg bg-white border"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (typeof confirm.action === "function") confirm.action();
                  setConfirm({ open: false, action: null });
                }}
                className="px-3 py-2 rounded-lg bg-blue-600 text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
