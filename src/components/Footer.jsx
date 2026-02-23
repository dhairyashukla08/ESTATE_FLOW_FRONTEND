import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-removebg-preview.png";

const Footer = () => {
  const [contactData, setContactData] = useState({ email: "", message: "" });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setContactData({ email: "", message: "" });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/">
            <img src={logo} alt="EstateFlow Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            The most trusted platform to buy, rent, and sell properties across
            the country. Real estate made simple and professional.
          </p>
        </div>

        {/* Marketplace */}
        <div>
          <h4 className="text-white font-medium mb-6">Marketplace</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/search">Buy Properties</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/search?purpose=Rent">Rent Properties</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/commercial">Commercial</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/plots">Plots & Lands</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-medium mb-6">Company</h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer">
              <Link to="/agents">Our Agents</Link>
            </li>
            <li className="hover:text-white transition cursor-pointer text-gray-500 italic">
              Support Available 24/7
            </li>
          </ul>
        </div>

        {/* Contact Form Section (Replaced Newsletter) */}
        <div>
          <h4 className="text-white font-medium mb-4">Contact Support</h4>
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Your Email"
              required
              value={contactData.email}
              onChange={(e) =>
                setContactData({ ...contactData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-800 border-none rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-white transition"
            />
            <textarea
              placeholder="How can we help?"
              required
              rows="2"
              value={contactData.message}
              onChange={(e) =>
                setContactData({ ...contactData, message: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-gray-800 border-none rounded-xl text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-white transition resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2.5 bg-white text-gray-900 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gray-200 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-8 px-4">
        © 2026 EstateFlow Real Estate Platform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
