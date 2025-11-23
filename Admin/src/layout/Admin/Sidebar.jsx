import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: <MdDashboard />, exact: true },
  { name: "Client", path: "/admin/client", icon: <FaUser /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64  shadow-lg transform bg-primary z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-white">FeEzy</h2>
          <p className="uppercase text-xs text-gray-200">Admin panel</p>
        </div>

        <nav className="p-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact} // 👈 this ensures exact match for /admin
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg  hover:bg-primaryLite9 transition ${
                  isActive
                    ? "bg-primaryLite9 text-primary border-b-4 border-gray-300 font-medium py-3"
                    : "text-gray-50 hover:bg-blue-400 py-3"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
