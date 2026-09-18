import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";
import { getResidentialTags } from "../utils/filterTags.js";

const CATEGORIES = ["Apartment", "Villa"];
const BHK = [1, 2, 3, 4, 5];
const FURNISHING = ["Furnished", "Semi-Furnished", "Unfurnished"];

const EMPTY = {
  city: "",
  purpose: "Buy",
  category: [],
  bedrooms: [],
  furnishing: [],
  minPrice: "",
  maxPrice: "",
  minArea: "",
  maxArea: "",
  bathrooms: "",
  sort: "newest",
};

const parseList = (v) => (v ? v.split(",").filter(Boolean) : []);

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, fetchProperties } = usePropertyContext();
  const [localFilters, setLocalFilters] = useState(EMPTY);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY);

  useEffect(() => {
    const params = {
      city: searchParams.get("city") || "",
      purpose: searchParams.get("purpose") || "Buy",
      category: parseList(searchParams.get("category")),
      bedrooms: parseList(searchParams.get("bedrooms")),
      furnishing: parseList(searchParams.get("furnishing")),
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minArea: searchParams.get("minArea") || "",
      maxArea: searchParams.get("maxArea") || "",
      bathrooms: searchParams.get("bathrooms") || "",
      sort: searchParams.get("sort") || "newest",
    };
    setLocalFilters(params);
    setAppliedFilters(params);
    fetchProperties(params);
  }, [searchParams]);

  const set = (patch) => setLocalFilters((f) => ({ ...f, ...patch }));

  const toggle = (key, value) =>
    setLocalFilters((f) => {
      const v = String(value);
      const list = f[key].map(String);
      return {
        ...f,
        [key]: list.includes(v) ? list.filter((x) => x !== v) : [...list, v],
      };
    });

  const commit = (filters) => {
    const clean = Object.entries(filters).reduce((acc, [k, v]) => {
      const val = Array.isArray(v) ? v.join(",") : v;
      if (val !== "" && val != null) acc[k] = val;
      return acc;
    }, {});
    setSearchParams(clean);
  };

  const handleApply = () => commit(localFilters);
  const handleClear = () => commit({ purpose: localFilters.purpose });

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    set({ sort: newSort });
    commit({ ...appliedFilters, sort: newSort });
  };

  const activeCount =
    localFilters.category.length +
    localFilters.bedrooms.length +
    localFilters.furnishing.length +
    ["city", "minPrice", "maxPrice", "minArea", "maxArea", "bathrooms"].filter(
      (k) => localFilters[k],
    ).length;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">
              {localFilters.purpose === "Rent"
                ? "Properties for Rent"
                : "Properties for Sale"}
            </h1>
            <p className="text-gray-500 mt-2">
              Found{" "}
              <span className="font-semibold text-gray-900">
                {properties.length}
              </span>{" "}
              verified listings in
              <span className="font-medium text-gray-900 capitalize">
                {" "}
                {localFilters.city || "All Cities"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-bold">
                  Filters{" "}
                  {activeCount > 0 && (
                    <span className="text-xs text-gray-400">
                      ({activeCount})
                    </span>
                  )}
                </h3>
                <button
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-black font-bold uppercase transition"
                >
                  Reset
                </button>
              </div>

              {/* Purpose */}
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {["Buy", "Rent"].map((p) => (
                  <button
                    key={p}
                    onClick={() => {const next = {...localFilters,purpose: p,...(p === "Buy" ? { furnishing: [] } : {}), };
                      set(next);
                      commit(next);
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      localFilters.purpose === p
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                  value={localFilters.city}
                  onChange={(e) => set({ city: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                />
              </div>

              {/* Property type (multi) */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-3">
                  Property Type
                </label>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-black"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded"
                        checked={localFilters.category.includes(cat)}
                        onChange={() => toggle("category", cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-3">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {BHK.map((n) => (
                    <button
                      key={n}
                      onClick={() => toggle("bedrooms", n)}
                      className={`px-3 py-2 rounded-xl text-xs font-black border transition-all ${
                        localFilters.bedrooms.includes(String(n))
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {n === 5 ? "5+ BHK" : `${n} BHK`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Furnishing — Rent only */}
              {localFilters.purpose === "Rent" && (
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-3">
                    Furnishing
                  </label>
                  <div className="space-y-2">
                    {FURNISHING.map((f) => (
                      <label
                        key={f}
                        className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-black"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-black rounded"
                          checked={localFilters.furnishing.includes(f)}
                          onChange={() => toggle("furnishing", f)}
                        />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Price Range (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice}
                    onChange={(e) => set({ minPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice}
                    onChange={(e) => set({ maxPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                  />
                </div>
              </div>

              {/* Area */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Area (sq.ft)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minArea}
                    onChange={(e) => set({ minArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxArea}
                    onChange={(e) => set({ maxArea: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                  />
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Bathrooms (min)
                </label>
                <select
                  value={localFilters.bathrooms}
                  onChange={(e) => set({ bathrooms: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-black text-sm font-medium"
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n}+
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-black text-white rounded-xl py-3 hover:bg-gray-800 transition font-black uppercase text-xs tracking-widest shadow-lg"
              >
                Update Search
              </button>
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-72 bg-gray-200 animate-pulse rounded-[32px] w-full"
                  />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="flex flex-col gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    layout="horizontal"
                    matchedFilters={getResidentialTags(
                      property,
                      appliedFilters,
                    )}
                  />
                ))}
                {properties.length > 3 && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={scrollToTop}
                      className="px-6 py-3 rounded-2xl bg-black text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-gray-800 transition-all"
                    >
                      Back to Top
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[32px] p-20 text-center border border-dashed border-gray-200">
                <h3 className="text-2xl font-black text-gray-900">
                  No matches found
                </h3>
                <p className="text-gray-500 mt-2">
                  Try widening your price or area range.
                </p>
                <button
                  onClick={handleClear}
                  className="mt-6 px-8 py-3 bg-black text-white rounded-xl font-bold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
