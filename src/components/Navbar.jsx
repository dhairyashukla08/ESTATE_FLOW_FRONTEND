import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.role?.toLowerCase() === "admin";
  const isAgent = user?.role?.toLowerCase() === "agent";

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-8 md:h-9 w-auto object-contain transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Center Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Buy", "Rent", "Find Agents"].map((item) => (
            <Link
              key={item}
              to={item === "Buy" ? "/search" : item === "Rent" ? "/search?purpose=Rent" : "/agents"}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right Side (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all"
                >
                  Admin
                </Link>
              )}

              {/* --- AGENT MANAGE BUTTON --- */}
              {(isAgent || isAdmin) && (
                <Link
                  to="/agent/manage"
                  className="px-4 py-2 rounded-xl bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-widest border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  Manage
                </Link>
              )}

              {(isAgent || isAdmin) && (
                <Link
                  to="/list-property"
                  className="px-4 py-2 rounded-xl border-2 border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  + Post
                </Link>
              )}

              <Link
                to="/dashboard"
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xs font-black border-2 border-transparent hover:border-blue-600 transition-all shadow-lg"
              >
                {user.name ? user.name[0].toUpperCase() : "U"}
              </Link>
              
              <button
                onClick={handleLogout}
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-600 transition-colors ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-800 transition shadow-xl active:scale-95"
              >
                Join
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-50 rounded-lg text-black"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 py-10 space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            <Link to="/search" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em]">Buy</Link>
            <Link to="/search?purpose=Rent" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em]">Rent</Link>
            <Link to="/agents" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em]">Find Agents</Link>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {user ? (
            <div className="flex flex-col gap-5">
              {(isAgent || isAdmin) && (
                <>
                  <Link to="/agent/manage" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Console</Link>
                  <Link to="/list-property" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em]">Post Property</Link>
                </>
              )}
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-xs font-black uppercase tracking-[0.2em]">Profile</Link>
              <button onClick={handleLogout} className="text-left text-xs font-black uppercase tracking-[0.2em] text-red-500">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-4 border-2 border-black text-center text-xs font-black uppercase tracking-[0.2em]">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="w-full py-4 bg-black text-white text-center text-xs font-black uppercase tracking-[0.2em]">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;