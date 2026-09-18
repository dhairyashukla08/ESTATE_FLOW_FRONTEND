import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";
import {getPlotTags} from "../utils/filterTags.js";

const LAND_USAGE = ["Residential", "Agricultural", "Industrial"];
const parseList = (v) => (v ? v.split(",").filter(Boolean) : []);

const EMPTY = {
  city: "",
  propertyType: [],
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  sort: "newest",
};

const Plots = () => {
  const { plotProperties, loading, fetchPlots } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [appliedFilters, setAppliedFilters] = useState(EMPTY);

 const [filters, setFilters] = useState(EMPTY);

  useEffect(() => {
    const params = {
      city: searchParams.get("city") || "",
      propertyType: parseList(searchParams.get("propertyType")),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minArea: searchParams.get("minArea") || "",
      maxArea: searchParams.get("maxArea") || "",
      sort: searchParams.get("sort") || "newest",
    };
    setFilters(params);
    setAppliedFilters(params);
    fetchPlots(params);
  }, [searchParams]);

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const toggleType = (type) =>
    setFilters((f) => ({
      ...f,
      propertyType: f.propertyType.includes(type)
        ? f.propertyType.filter((t) => t !== type)
        : [...f.propertyType, type],
    }));

  const commit = (next) => {
    const clean = Object.entries(next).reduce((acc, [k, v]) => {
      const val = Array.isArray(v) ? v.join(",") : v;
      if (val !== "" && val != null) acc[k] = val;
      return acc;
    }, {});
    setSearchParams(clean);
  };

  const hasFilters =
    filters.city || filters.propertyType.length || filters.minPrice ||
    filters.maxPrice || filters.minArea || filters.maxArea;

  return (
    <div className="bg-gray-50 min-h-screen">
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
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 space-y-8">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Land Filters</h2>
                <div className="h-1.5 w-10 bg-emerald-500 rounded-full mt-2"></div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Region</label>
                <input
                  type="text"
                  placeholder="Any city"
                  value={filters.city}
                  onChange={(e) => set({ city: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && commit(filters)}
                  className="w-full border-b-2 border-gray-100 py-3 font-bold text-sm outline-none focus:border-emerald-500 transition-all bg-transparent"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Land Usage</label>
                <div className="space-y-2">
                  {LAND_USAGE.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`w-full text-left px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                        filters.propertyType.includes(type)
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 translate-x-1"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Budget (₹)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.minPrice}
                    onChange={(e) => set({ minPrice: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                  <input type="number" placeholder="Max" value={filters.maxPrice}
                    onChange={(e) => set({ maxPrice: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Plot Area (sq.ft)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={filters.minArea}
                    onChange={(e) => set({ minArea: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                  <input type="number" placeholder="Max" value={filters.maxArea}
                    onChange={(e) => set({ maxArea: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500" />
                </div>
              </div>

              <button
                onClick={() => commit(filters)}
                className="w-full py-4 rounded-2xl bg-emerald-600 text-white text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition shadow-lg"
              >
                Apply Filters
              </button>

              {hasFilters && (
                <button
                  onClick={() => setSearchParams({})}
                  className="w-full py-2 text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </aside>

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Listings</p>
                <p className="text-xl font-black text-gray-900">{plotProperties.length} Available</p>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Quality</p>
                <p className="text-xl font-black text-emerald-600">100% Verified</p>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8 pb-4 border-b border-gray-100">
              <h3 className="text-xl font-black text-gray-900 uppercase">
                {filters.city ? `Verified Land in ${filters.city}` : "Latest Land Opportunities"}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {loading ? (
                [1, 2, 3, 4].map((n) => <div key={n} className="h-[480px] bg-white rounded-[40px] animate-pulse" />)
              ) : plotProperties.length > 0 ? (
                plotProperties.map((plot) => (
                  <PropertyCard key={plot._id} property={plot} layout="vertical"  matchedFilters={getPlotTags(plot, appliedFilters)} />
                ))
              ) : (
                <div className="col-span-2 py-32 text-center bg-white rounded-[40px] border border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold text-lg">No land listings found for this search.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Plots;