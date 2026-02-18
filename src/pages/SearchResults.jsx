import React, { useEffect, useState } from 'react'
import PropertyCard from "../components/PropertyCard.jsx";
import { usePropertyContext } from '../hooks/PropertyContext.jsx';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, updateFilters, fetchProperties } = usePropertyContext();


  const [localFilters, setLocalFilters] = useState({
    city: searchParams.get('city') || '',
    purpose: searchParams.get('purpose') || 'Buy',
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });


  useEffect(() => {
    const params = {
      city: searchParams.get('city') || '',
      purpose: searchParams.get('purpose') || 'Buy',
      type: searchParams.get('type') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
    };
    
    setLocalFilters(params);
    updateFilters(params);
    fetchProperties(params);
  }, [searchParams]);

  const handleApply = () => {
    const urlParams = Object.fromEntries(
      Object.entries(localFilters).filter(([_, v]) => v !== '')
    );
    
    setSearchParams(urlParams);
  };

  const handleClear = () => {
    const cleared = { city: '', type: '', minPrice: '', maxPrice: '', purpose: 'Buy' };
    setSearchParams({ purpose: 'Buy' });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              {localFilters.purpose === 'Rent'
                ? 'Properties for Rent'
                : 'Properties for Sale'}
            </h1>

            <p className="text-gray-500 mt-2">
              Found{" "}
              <span className="font-semibold text-gray-900">
                {properties.length}
              </span>{" "}
              verified listings in
              <span className="font-medium text-gray-900 capitalize">
                {" "}
                {localFilters.city || "All India"}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort By:</span>
            <select className="px-4 py-2 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black transition">
              <option>Newest Listed</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-10">

          {/* SIDEBAR */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 sticky top-24">

              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  Filters
                </h3>
                <button
                  onClick={handleClear}
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Reset All
                </button>
              </div>

              {/* Buy/Rent Toggle Added for better UX */}
              <div className="flex p-1 bg-gray-100 rounded-xl">
                {['Buy', 'Rent'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setLocalFilters({ ...localFilters, purpose: p })}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      localFilters.purpose === p ? 'bg-white text-black shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai, Delhi"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                  value={localFilters.city}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, city: e.target.value })
                  }
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  Property Type
                </label>
                <div className="space-y-2">
                  {['Apartment', 'Villa', 'Plot'].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="type"
                        className="accent-black"
                        checked={localFilters.type === type}
                        onChange={() =>
                          setLocalFilters({ ...localFilters, type })
                        }
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm text-gray-600 mb-3">
                  Price Range (₹)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                    value={localFilters.minPrice}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, minPrice: e.target.value })
                    }
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
                    value={localFilters.maxPrice}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, maxPrice: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-black text-white rounded-xl py-2.5 hover:bg-gray-800 transition font-bold"
              >
                Update Search
              </button>
            </div>
          </aside>

          {/* RESULTS */}
          <div className="flex-1">
            {loading ? (
    /* LOADING SKELETONS - Updated to match new horizontal look */
    <div className="flex flex-col gap-6">
      {[1, 2, 3].map((n) => (
        <div key={n} className="h-72 bg-gray-200 animate-pulse rounded-[32px] w-full"></div>
      ))}
    </div>
  ) : properties.length > 0 ? (
    /* ONE CARD PER ROW LAYOUT */
    <div className="flex flex-col gap-6">
      {properties.map((property) => (
        <div key={property._id} className="w-full">
          {/* We pass layout="horizontal" and remove max-w-md constraints */}
          <PropertyCard property={property} layout="horizontal" />
        </div>
      ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center space-y-6">
                <div className="flex justify-center text-gray-400">
                  <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No properties found</h3>
                <p className="text-gray-500 max-w-md mx-auto">We couldn't find anything matching your exact criteria. Try broadening your search.</p>
                <button onClick={handleClear} className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition">
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults