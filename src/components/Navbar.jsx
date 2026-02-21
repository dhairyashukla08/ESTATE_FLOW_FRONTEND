import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-gray-900"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/search" className="hover:text-black transition">
            Buy
          </Link>
          <Link
            to="/search?purpose=Rent"
            className="hover:text-black transition"
          >
            Rent
          </Link>
          <Link to="/agents" className="hover:text-black transition">
            Find Agents
          </Link>
        </div>

        {/* Right Side */}
<div className="flex items-center gap-4">
  {user ? (
    <>
      {/* Agent & Admin Specific Links */}
      {["agent", "admin"].includes(user.role?.toLowerCase()) && (
        <div className="flex items-center gap-3">
          {/* New Manage Link */}
          <Link
            to="/agent/manage"
            className="hidden lg:inline-block text-sm font-bold text-gray-600 hover:text-black transition"
          >
            Manage Dashboard
          </Link>
          
          <Link
            to="/list-property"
            className="hidden md:inline-block px-4 py-2 rounded-xl border border-black text-black text-sm hover:bg-black hover:text-white transition"
          >
            Post Property
          </Link>
        </div>
      )}

      {/* Avatar */}
      <Link
        to="/dashboard"
        className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-gray-700 transition"
      >
        {user.name ? user.name[0].toUpperCase() : "U"}
      </Link>

      <button
        onClick={handleLogout}
        className="text-sm text-gray-600 hover:text-black transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="text-sm text-gray-600 hover:text-black transition"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="px-4 py-2 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
      >
        Sign Up
      </Link>
    </>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;
