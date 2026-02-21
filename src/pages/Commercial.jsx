import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';
import { usePropertyContext } from '../hooks/PropertyContext.jsx';

const Commercial = () => {

  const { commercialProperties, loading } = usePropertyContext();
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Commercial Buildings"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Commercial Space</h1>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">Find high-yield office spaces, retail shops, and warehouses for your business growth.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-100 pb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Listings</h2>
            <p className="text-gray-500 text-sm">
              {loading ? "Fetching properties..." : `Showing ${commercialProperties.length} premium properties`}
            </p>
          </div>
          <div className="flex gap-3">
            <select className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black">
              <option>Property Type</option>
              <option>Office Space</option>
              <option>Retail Shop</option>
              <option>Warehouse</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 bg-gray-100 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          /* Real Data Grid */
          <div className="grid md:grid-cols-3 gap-10">
            {commercialProperties.length > 0 ? (
              commercialProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-gray-500 text-lg">No commercial properties found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commercial;