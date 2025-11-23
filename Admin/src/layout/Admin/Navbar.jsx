import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaUserCircle, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate=useNavigate()
  

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0   border-b border-gray-300 left-0 right-0  bg-theme shadow- md:relative md:shadow-none flex items-center justify-between px-4 py-3">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger Icon (mobile only) */}
        <button
          onClick={toggleSidebar}
          className="md:hidden text-bgGrey focus:outline-none"
        >
          <RiMenu2Fill size={22} />
        </button>
        <div>
  <h1 className="text-primary text-lg font-bold">FeEzy</h1>
        <p className="uppercase text-xs text-gray-400">Admin panel</p>
        </div>
      

      </div>

      {/* Right Section (User Menu) */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 text-bgGrey hover:text-primary focus:outline-none"
        >
          <FaUserCircle size={26} />
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 z-50">
            <ul className="flex flex-col text-sm text-gray-700">
              <li>
                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                  <FaUser size={14} /> Profile
                </button>
              </li>
              <li>
                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                  <FaCog size={14} /> Settings
                </button>
              </li>
              <li>
                <hr className="my-1 border border-gray-200" />
              </li>
              <li>
                <button onClick={()=>navigate('/login')}  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100">
                  <FaSignOutAlt size={14} /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
