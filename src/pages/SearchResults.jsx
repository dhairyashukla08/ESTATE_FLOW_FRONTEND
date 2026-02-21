import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, updateFilters, fetchProperties } =
    usePropertyContext();

  const [localFilters, setLocalFilters] = useState({
    city: searchParams.get("city") || "",
    purpose: searchParams.get("purpose") || "Buy",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  // Sync with URL changes (back button / nav)
  useEffect(() => {
    const params = {
      city: searchParams.get("city") || "",
      purpose: searchParams.get("purpose") || "Buy",
      category: searchParams.get("category") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    };

    setLocalFilters(params);
    updateFilters(params);
    fetchProperties(params);
  }, [searchParams]);

  const handleApply = () => {
    const urlParams = Object.fromEntries(
      Object.entries(localFilters).filter(([_, v]) => v !== "" && v !== null),
    );
    setSearchParams(urlParams);
  };

  const handleClear = () => {
    const cleared = { purpose: "Buy" };
    setLocalFilters({
      city: "",
      purpose: "Buy",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    setSearchParams(cleared);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-4xl font-black mb-4 tracking-tight">
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
          <aside className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 sticky top-24">
              <div className="flex justify-between items-center border-b pb-4">
                <h3 className="text-lg font-bold">Filters</h3>
                <button
                  onClick={handleClear}
                  className="text-xs text-gray-400 hover:text-black font-bold uppercase transition"
                >
                  Reset
                </button>
              </div>

              {/* Purpose Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {["Buy", "Rent"].map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      setLocalFilters({ ...localFilters, purpose: p })
                    }
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${localFilters.purpose === p ? "bg-white text-black shadow-sm" : "text-gray-500"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                  value={localFilters.city}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, city: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-3">
                  Property Type
                </label>
                <div className="space-y-2">
                  {["Apartment", "Villa", "Plot", "Commercial"].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer text-sm font-medium text-gray-700 hover:text-black"
                    >
                      <input
                        type="radio"
                        name="category"
                        className="w-4 h-4 accent-black"
                        checked={localFilters.category === cat}
                        onChange={() =>
                          setLocalFilters({ ...localFilters, category: cat })
                        }
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* Prices */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                    value={localFilters.minPrice}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        minPrice: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 outline-none focus:border-black text-sm"
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        maxPrice: e.target.value,
                      })
                    }
                  />
                </div>
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
                  />
                ))}

                {/* BACK TO TOP BUTTON */}
                {properties.length > 3 && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={scrollToTop}
                      className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-gray-800 transition-all duration-300"
                    >
                      Back to Top
                      <svg
                        className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
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
                  Try adjusting your filters or location to see more properties.
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
