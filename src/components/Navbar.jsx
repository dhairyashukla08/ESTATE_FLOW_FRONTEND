import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.role?.toLowerCase() === "admin";
  const isAgent = user?.role?.toLowerCase() === "agent";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-8 md:h-10 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Center Links */}
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

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100 hover:bg-red-600 hover:text-white transition"
                >
                  Admin Panel
                </Link>
              )}
              {(isAgent || isAdmin) && (
                <Link
                  to="/list-property"
                  className="px-4 py-2 rounded-xl border border-black text-black text-sm hover:bg-black hover:text-white transition"
                >
                  Post Property
                </Link>
              )}
              <Link
                to="/dashboard"
                className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium hover:bg-gray-700 transition"
              >
                {user.name ? user.name[0].toUpperCase() : "U"}
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-black transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 hover:text-black transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Link
              to="/dashboard"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium"
            >
              {user.name ? user.name[0].toUpperCase() : "U"}
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-300">
          <Link
            to="/search"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-medium text-gray-600"
          >
            Buy
          </Link>
          <Link
            to="/search?purpose=Rent"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-medium text-gray-600"
          >
            Rent
          </Link>
          <Link
            to="/agents"
            onClick={() => setIsOpen(false)}
            className="block text-lg font-medium text-gray-600"
          >
            Find Agents
          </Link>

          <hr className="border-gray-100" />

          {user ? (
            <div className="space-y-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block text-red-600 font-bold"
                >
                  Admin Panel
                </Link>
              )}
              {(isAgent || isAdmin) && (
                <>
                  <Link
                    to="/agent/manage"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-600"
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/list-property"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-600"
                  >
                    Post Property
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-500 font-medium pt-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 border border-gray-200 rounded-xl font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 bg-black text-white rounded-xl font-medium"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
