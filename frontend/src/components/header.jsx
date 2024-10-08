import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
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
        setIsLoggedIn(false);
        navigate("/");
        Swal.fire("Logged out!", "You have been logged out.", "success");
      }
    });
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-300">
            Trumio
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/register" className="hover:text-blue-300">
            Register
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/feed" className="hover:text-blue-300">
                Feed
              </Link>
              <Link to="/profile" className="hover:text-blue-300">
                Profile
              </Link>
              {role === "Client" && (
                <Link to="/post" className="hover:text-blue-300">
                  Post
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-blue-300 bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
