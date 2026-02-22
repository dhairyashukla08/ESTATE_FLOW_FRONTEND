import React from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";

const Plots = () => {
  const { plotProperties, loading } = usePropertyContext();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-emerald-900">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Open Land"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Lands & Plots
          </h1>
          <p className="text-gray-200 mt-4 text-lg max-w-2xl mx-auto">
            Invest in the foundation of your future with our verified
            residential and agricultural plots.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Section */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm mb-16 flex flex-wrap gap-8 justify-around items-center border border-gray-100">
          <div className="text-center">
            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
              Available Listings
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">
              {loading ? "..." : plotProperties.length}
            </p>
          </div>
          <div className="h-12 w-[1px] bg-gray-100 hidden md:block"></div>
          <div className="text-center">
            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
              Verified Status
            </p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              100% Legal
            </p>
          </div>
          <div className="h-12 w-[1px] bg-gray-100 hidden md:block"></div>
          <div className="text-center">
            <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">
              Daily Inquiries
            </p>
            <p className="text-2xl font-black text-gray-900 mt-1">450+</p>
          </div>
        </div>

        {/* Grid Logic */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-white animate-pulse rounded-[40px] border border-gray-100"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {plotProperties.length > 0 ? (
              plotProperties.map((plot) => (
                <PropertyCard key={plot._id} property={plot} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-400 text-lg">
                  No plots available at the moment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Plots;
