import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";

const Plots = () => {
  const { plotProperties, loading } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const cityFilter = searchParams.get("city") || "";
  const [landType, setLandType] = useState("");

  const displayedPlots = plotProperties.filter(plot => {
    const matchesCity = cityFilter ? plot.city?.toLowerCase() === cityFilter.toLowerCase() : true;
    const matchesType = landType ? plot.category?.toLowerCase() === landType.toLowerCase() : true;
    return matchesCity && matchesType;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. ADDED BACK: REFINED HERO SECTION */}
      <div className="relative h-[300px] flex items-center bg-emerald-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Open Land"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <p className="text-emerald-400 font-black uppercase text-xs tracking-[0.3em] mb-3">Premium Land Bank</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Lands & <span className="text-emerald-500">Plots</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-10">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Land Filters</h2>
                <div className="h-1.5 w-10 bg-emerald-500 rounded-full mt-2"></div>
              </div>

              {/* City Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Region</label>
                <select 
                  value={cityFilter}
                  onChange={(e) => setSearchParams(e.target.value ? { city: e.target.value } : {})}
                  className="w-full border-b-2 border-gray-100 py-3 font-bold text-sm outline-none focus:border-emerald-500 transition-all cursor-pointer bg-transparent"
                >
                  <option value="">All Regions</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>

              {/* Land Use Selection */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Land Usage</label>
                <div className="space-y-2">
                  {["Residential", "Agricultural", "Industrial"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setLandType(type.toLowerCase() === landType.toLowerCase() ? "" : type)}
                      className={`w-full text-left px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                        landType.toLowerCase() === type.toLowerCase() 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 translate-x-1" 
                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {(landType || cityFilter) && (
                 <button 
                  onClick={() => { setLandType(""); setSearchParams({}); }}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {/* 2. ADDED BACK: STATS SECTION (Inline version) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Listings</p>
                <p className="text-xl font-black text-gray-900">{displayedPlots.length} Available</p>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Quality</p>
                <p className="text-xl font-black text-emerald-600">100% Verified</p>
              </div>
              <div className="hidden md:block bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Daily Views</p>
                <p className="text-xl font-black text-gray-900">1.2k+</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100 gap-4">
              <h3 className="text-xl font-black text-gray-900 uppercase">
                {cityFilter ? `Verified Land in ${cityFilter}` : "Latest Land Opportunities"}
              </h3>
            </div>

            {/* 3. GRID LOGIC (Ensure 2 columns for vertical cards) */}
            <div className="grid md:grid-cols-2 gap-10">
              {loading ? (
                [1, 2, 3, 4].map(n => <div key={n} className="h-[480px] bg-white rounded-[40px] animate-pulse" />)
              ) : (
                displayedPlots.length > 0 ? (
                  displayedPlots.map(plot => (
                    <PropertyCard key={plot._id} property={plot} layout="vertical" />
                  ))
                ) : (
                  <div className="col-span-2 py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                    <p className="text-gray-400 font-bold text-lg">No land listings found for this search.</p>
                  </div>
                )
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Plots;