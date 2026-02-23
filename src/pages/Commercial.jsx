import React, { useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";

const Commercial = () => {
  const { commercialProperties, loading } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const cityFilter = searchParams.get("city") || "";
  const [typeFilter, setTypeFilter] = useState("");

  const displayedProperties = commercialProperties.filter((p) => {
    const matchesCity = cityFilter ? p.city?.toLowerCase() === cityFilter.toLowerCase() : true;
    const matchesType = typeFilter ? p.category?.toLowerCase() === typeFilter.toLowerCase() : true;
    return matchesCity && matchesType;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION - Matches Plots Style */}
      <div className="relative h-[300px] flex items-center bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Modern Commercial Building"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <p className="text-emerald-400 font-black uppercase text-xs tracking-[0.3em] mb-3">Corporate Real Estate</p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Business <span className="text-emerald-500">Spaces</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LARGE SIDEBAR */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-8 bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 text-gray-900">Filters</h2>
                <div className="h-1.5 w-10 bg-black rounded-full mb-8"></div>
              </div>

              {/* Location Filter */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Location</label>
                <select 
                  value={cityFilter}
                  onChange={(e) => setSearchParams(e.target.value ? { city: e.target.value } : {})}
                  className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-black outline-none transition-all cursor-pointer bg-transparent"
                >
                  <option value="">All Locations</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>

              {/* Property Type Filter */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Asset Type</label>
                <div className="flex flex-col gap-2">
                  {["Office Space", "Retail Shop", "Warehouse", "Showroom"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type.toLowerCase() === typeFilter.toLowerCase() ? "" : type)}
                      className={`text-left px-5 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${
                        typeFilter.toLowerCase() === type.toLowerCase() 
                        ? "border-black bg-black text-white shadow-xl translate-x-1" 
                        : "border-white bg-white text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {(typeFilter || cityFilter) && (
                <button 
                  onClick={() => { setTypeFilter(""); setSearchParams({}); }}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1">
            {/* 2. STATS SECTION - Matches Plots Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inventory</p>
                <p className="text-xl font-black text-gray-900">{displayedProperties.length} Spaces</p>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Growth</p>
                <p className="text-xl font-black text-emerald-600">High ROI</p>
              </div>
              <div className="hidden md:block bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Trust</p>
                <p className="text-xl font-black text-gray-900">Lease Ready</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100 gap-4">
              <div>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Commercial</p>
                <h3 className="text-xl font-black text-gray-900 uppercase">
                   {cityFilter ? `Premium Offices in ${cityFilter}` : "Latest Business Listings"}
                </h3>
              </div>
              <p className="text-gray-400 font-bold bg-gray-50 px-4 py-2 rounded-full text-sm">
                {displayedProperties.length} Results
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-[500px] bg-gray-50 animate-pulse rounded-[40px]" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-10">
                {displayedProperties.length > 0 ? (
                  displayedProperties.map((item) => (
                    <PropertyCard key={item._id} property={item} layout="vertical" />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-40 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-xl font-bold text-gray-400">No properties match your current filters.</p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Commercial;