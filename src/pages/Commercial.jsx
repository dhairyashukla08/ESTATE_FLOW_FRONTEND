import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";
import { getCommercialTags } from "../utils/filterTags.js";

// label shown to the user -> value stored in the Commercial schema enum
const ASSET_TYPES = [
  { label: "Office Space", value: "Office" },
  { label: "Retail Shop", value: "Shop" },
  { label: "Warehouse", value: "Warehouse" },
  { label: "Showroom", value: "Showroom" },
];

const parseList = (v) => (v ? v.split(",").filter(Boolean) : []);

const EMPTY = {
  city: "",
  purpose: "",
  propertyType: [],
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  sort: "newest",
};

const Commercial = () => {
  const { commercialProperties, loading, fetchCommercial } = usePropertyContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(EMPTY);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY);

  useEffect(() => {
    const params = {
      city: searchParams.get("city") || "",
      purpose: searchParams.get("purpose") || "",
      propertyType: parseList(searchParams.get("propertyType")),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minArea: searchParams.get("minArea") || "",
      maxArea: searchParams.get("maxArea") || "",
      sort: searchParams.get("sort") || "newest",
    };
    setFilters(params);
    setAppliedFilters(params); 
    fetchCommercial(params);
  }, [searchParams]);

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  const toggleType = (value) =>
    setFilters((f) => ({
      ...f,
      propertyType: f.propertyType.includes(value)
        ? f.propertyType.filter((t) => t !== value)
        : [...f.propertyType, value],
    }));

  const commit = (next) => {
    const clean = Object.entries(next).reduce((acc, [k, v]) => {
      const val = Array.isArray(v) ? v.join(",") : String(v ?? "").trim();
      if (val !== "") acc[k] = val;
      return acc;
    }, {});
    setSearchParams(clean);
  };

  const hasFilters =
    filters.city ||
    filters.purpose ||
    filters.propertyType.length ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.minArea ||
    filters.maxArea;

  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <div className="relative h-[300px] flex items-center bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Modern Commercial Building"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
          <p className="text-emerald-400 font-black uppercase text-xs tracking-[0.3em] mb-3">
            Corporate Real Estate
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Business <span className="text-emerald-500">Spaces</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-8 bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-sm max-h-[calc(100vh-9rem)] overflow-y-auto">
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 text-gray-900">
                  Filters
                </h2>
                <div className="h-1.5 w-10 bg-black rounded-full"></div>
              </div>

              {/* Buy / Rent */}
              <div className="flex p-1 bg-white rounded-2xl border-2 border-gray-100">
                {[
                  { label: "All", value: "" },
                  { label: "Buy", value: "Sale" },
                  { label: "Rent", value: "Rent" },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => set({ purpose: p.value })}
                    className={`flex-1 py-2.5 text-xs font-black uppercase rounded-xl transition-all ${
                      filters.purpose === p.value
                        ? "bg-black text-white shadow-sm"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Any city"
                  value={filters.city}
                  onChange={(e) => set({ city: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && commit(filters)}
                  className="w-full bg-white border-2 border-gray-100 p-4 rounded-2xl font-bold text-sm focus:border-black outline-none transition-all"
                />
              </div>

              {/* Asset type */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Asset Type
                </label>
                <div className="flex flex-col gap-2">
                  {ASSET_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => toggleType(type.value)}
                      className={`text-left px-5 py-4 rounded-2xl border-2 transition-all font-bold text-sm ${
                        filters.propertyType.includes(type.value)
                          ? "border-black bg-black text-white shadow-xl translate-x-1"
                          : "border-white bg-white text-gray-500 hover:border-gray-200"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Budget (₹)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => set({ minPrice: e.target.value })}
                    className="w-full bg-white px-3 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold outline-none focus:border-black"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => set({ maxPrice: e.target.value })}
                    className="w-full bg-white px-3 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Carpet area */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                  Carpet Area (sq.ft)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minArea}
                    onChange={(e) => set({ minArea: e.target.value })}
                    className="w-full bg-white px-3 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold outline-none focus:border-black"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxArea}
                    onChange={(e) => set({ maxArea: e.target.value })}
                    className="w-full bg-white px-3 py-3 rounded-xl border-2 border-gray-100 text-sm font-bold outline-none focus:border-black"
                  />
                </div>
              </div>

              <button
                onClick={() => commit(filters)}
                className="w-full py-4 rounded-2xl bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg"
              >
                Apply Filters
              </button>

              {hasFilters && (
                <button
                  onClick={() => setSearchParams({})}
                  className="w-full py-3 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Inventory
                </p>
                <p className="text-xl font-black text-gray-900">
                  {commercialProperties.length} Spaces
                </p>
              </div>
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Growth
                </p>
                <p className="text-xl font-black text-emerald-600">High ROI</p>
              </div>
              <div className="hidden md:block bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  Trust
                </p>
                <p className="text-xl font-black text-gray-900">Lease Ready</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 pb-4 border-b border-gray-100 gap-4">
              <div>
                <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">
                  Commercial
                </p>
                <h3 className="text-xl font-black text-gray-900 uppercase">
                  {filters.city
                    ? `Business Spaces in ${filters.city}`
                    : "Latest Business Listings"}
                </h3>
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-[500px] bg-gray-50 animate-pulse rounded-[40px]" />
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-10">
                {commercialProperties.length > 0 ? (
                  commercialProperties.map((item) => (
                    <PropertyCard key={item._id} property={item} layout="vertical" matchedFilters={getCommercialTags(item, appliedFilters)} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-40 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                    <p className="text-xl font-bold text-gray-400">
                      No properties match your current filters.
                    </p>
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