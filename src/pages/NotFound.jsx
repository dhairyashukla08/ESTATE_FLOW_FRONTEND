import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Top Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl w-full text-center">

          {/* Large 404 */}
          <h1 className="text-[120px] md:text-[180px] font-black text-slate-200 leading-none select-none">
            404
          </h1>

          {/* Main Message */}
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 -mt-6">
            This Property Doesn't Exist
          </h2>

          <p className="text-slate-500 text-lg mt-6 max-w-xl mx-auto">
            The page you're looking for might have been removed, renamed,
            or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
            <Link
              to="/"
              className="px-10 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Back to Home
            </Link>

            <Link
              to="/search"
              className="px-10 py-4 border-2 border-black text-black font-bold rounded-xl hover:bg-black hover:text-white transition-all"
            >
              Browse Properties
            </Link>

          </div>

        </div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="h-24 bg-gradient-to-t from-slate-100 to-transparent"></div>

    </div>
  );
};

export default NotFound;
