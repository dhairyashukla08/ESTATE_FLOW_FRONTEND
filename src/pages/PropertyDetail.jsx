import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePropertyContext } from "../hooks/PropertyContext";

const PropertyDetail = () => {
  const { id } = useParams();
  const { properties, loading: contextLoading } = usePropertyContext();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (properties.length > 0) {
      const found = properties.find((p) => p._id === id);
      setProperty(found);
    }
  }, [id, properties]);

  if (contextLoading || !property) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const images = property.images?.length > 0 ? property.images : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"];

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* 1. PREMIUM HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                {property.features?.bedrooms} BHK {property.category} for {property.purpose === 'sale' ? 'Sale' : 'Rent'} in {property.address?.area}
              </h1>
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <span className="font-semibold text-gray-700">{property.address?.area}</span>, {property.address?.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-gray-900">₹{property.price?.toLocaleString("en-IN")}</p>
              <p className="text-blue-600 text-xs font-bold mt-1 uppercase">EMI starts at ₹{Math.round(property.price * 0.007).toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* QUICK STATS RIBBON */}
          <div className="flex gap-12 mt-8 border-t border-gray-100 py-4 overflow-x-auto no-scrollbar">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Area</span>
              <span className="text-gray-800 font-bold">{property.features?.areaSize} <span className="text-xs font-normal">sq.ft</span></span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-12">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Configuration</span>
              <span className="text-gray-800 font-bold">{property.features?.bedrooms} BHK, {property.features?.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-12">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Status</span>
              <span className="text-green-600 font-bold">Ready to Move</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. GALLERY SECTION (99acres Horizontal Style) */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm p-2">
            <div className="flex flex-col md:flex-row gap-2 h-[450px]">
              <div className="md:w-3/4 h-full bg-gray-100 rounded-lg overflow-hidden">
                <img src={images[0]} className="w-full h-full object-cover" alt="Primary View" />
              </div>
              <div className="md:w-1/4 flex md:flex-col gap-2 h-full">
                {images.slice(1, 4).map((img, i) => (
                  <div key={i} className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                    <img src={img} className="w-full h-full object-cover" alt={`View ${i}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. PROPERTY DETAILS GRID */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">About the Property</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              <DetailItem label="Price per Sq.Ft" value={`₹${Math.round(property.price / property.features?.areaSize).toLocaleString("en-IN")}`} />
              <DetailItem label="Floor" value="12th of 24" />
              <DetailItem label="Furnishing" value="Semi-Furnished" />
              <DetailItem label="Facing" value="East" />
              <DetailItem label="Balcony" value="2 Balconies" />
              <DetailItem label="Ownership" value="Freehold" />
            </div>
          </div>

          {/* 4. DESCRIPTION BOX */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </div>

       {/* RIGHT COLUMN - Sticky Contact Card */}
<div className="lg:sticky lg:top-8 h-fit">
  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
    
    {/* Header with Background Accent */}
    <div className="bg-[#002B4B] p-6 text-white">
      <h3 className="text-lg font-bold">Contact Seller</h3>
      <p className="text-blue-200 text-xs mt-1">Get a response within 24 hours</p>
    </div>

    <div className="p-6 space-y-6">
      <form className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <div className="flex gap-2">
          <span className="flex items-center justify-center bg-gray-50 border border-gray-200 px-3 rounded-lg text-gray-500 text-sm font-semibold">
            +91
          </span>
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm"
          />
        </div>

        <textarea
          rows="3"
          placeholder="I'm interested in this property. Please get in touch with me."
          className="w-full p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm resize-none"
        ></textarea>

        <button className="w-full py-4 bg-[#FFBA00] text-[#002B4B] font-bold rounded-lg hover:bg-[#f0af00] transition-colors shadow-md active:scale-[0.98]">
          Contact Now
        </button>
      </form>
      {/* Agent Branding */}
      <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400 font-bold text-xl">
          {property.agentName?.charAt(0) || "A"}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-gray-900 truncate">
            {property.agentName || property.agent?.name}
          </p>
          <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">
            Verified Professional
          </p>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            {property.contact || property.agent?.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Trust Badge Below the Card */}
  <div className="mt-4 flex items-center gap-2 justify-center text-gray-400">
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span className="text-[10px] font-bold uppercase tracking-widest">Safe & Verified Listing</span>
  </div>
</div>
      </div>
    </div>
  );
};

// Helper Component for the Grid
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-xs mb-1 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

export default PropertyDetail;