import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import {
  FaSearch,
  FaHome,
  FaEnvelope,
  FaUserFriends,
  FaUser,
  FaRobot,
} from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to handle dropdown
  const navigate = useNavigate();
  let role;

  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, stay logged in",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        // setIsLoggedIn(false);
        navigate("/");
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };
  const handleMouseEnter = () => {
    setIsHovered(true); // Show AI Assistant text on hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Hide AI Assistant text when hover ends
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown visibility
  };

  return (
    token && (
      <header className="bg-black text-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Search Bar */}
          <div className="relative flex items-center w-1/2">
            <FaSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 text-white rounded-full border border-gray-600 focus:outline-none focus:border-blue-400"
              placeholder="Search for projects using our AI search feature"
            />
            <Link
              to="/chatAi"
              className="relative ml-4"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="bg-gray-700 text-white rounded-full p-2 ml-2">
                <FaRobot size={27} /> {/* Increased size to 40 */}
              </button>
              {isHovered && (
                <div className="absolute top-10 left-0 bg-black text-white p-1 rounded text-sm">
                  Assistant {/* Tooltip displayed on hover */}
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Links with Icons */}
          <nav className="flex space-x-8">
            <Link to="/feed" className="flex items-center hover:text-blue-300">
              <FaHome className="mr-2" /> Home
            </Link>
            <Link
              to="/message"
              className="flex items-center hover:text-blue-300"
            >
              <FaEnvelope className="mr-2" /> Message
            </Link>
            <Link
              to="/network"
              className="flex items-center hover:text-blue-300"
            >
              <FaUserFriends className="mr-2" /> My Network
            </Link>
            {role === "Client" && (
              <Link
                to="/post"
                className="flex items-center hover:text-blue-300"
              >
                <FaEnvelope className="mr-2" /> Post
              </Link>
            )}
          </nav>

          {/* Profile Section */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:text-blue-300"
              >
                <FaUser className="mr-2" /> Me
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)} // Close the dropdown on click
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-blue-300">
              Login
            </Link>
          )}
        </div>
      </header>
    )
  );
};

export default Header;
