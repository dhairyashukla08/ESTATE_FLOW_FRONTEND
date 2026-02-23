import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePropertyContext } from "../hooks/PropertyContext";
import InquiryModal from "../components/InquiryModal.jsx";
import axios from "axios";

const PropertyDetail = () => {
  const { id } = useParams();
  const { properties, commercialProperties, plotProperties, loading: contextLoading } = usePropertyContext();
  const [property, setProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allProperties = [...properties, ...commercialProperties, ...plotProperties];
    if (allProperties.length > 0) {
      const found = allProperties.find((p) => p._id === id);
      setProperty(found);

      if (found) {
        const updateViews = async () => {
          try {
            // Determine type for API endpoint based on schema characteristics
            const type = found.features?.carpetArea ? "Commercial" : found.features?.plotArea ? "Plot" : "Property";
            await axios.post(`http://localhost:8000/api/properties/${id}/view?type=${type}`);
          } catch (err) {
            console.error("Error updating view count:", err);
          }
        };
        updateViews();
      }
    }
  }, [id, properties, commercialProperties, plotProperties]);

  if (contextLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">Property not found</div>;

  // --- LOGIC HELPERS BASED ON YOUR SCHEMAS ---
  
  const isCommercial = !!property.features?.carpetArea;
  const isPlot = !!property.features?.plotArea;
  const isResidential = !isCommercial && !isPlot;

  const getDynamicTitle = () => {
    const area = property.address?.area || "this location";
    if (isCommercial) return `Commercial Property For ${property.purpose} in ${area}`;
    if (isPlot) return `Land For Sale in ${area}`;
    return `${property.features?.bedrooms || 0} BHK ${property.category} For ${property.purpose} in ${area}`;
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                {getDynamicTitle()}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                <span className="font-semibold text-gray-700">{property.address?.area}</span>, {property.address?.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-gray-900">₹{property.price?.toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* 2. RIBBON STATS (Dynamic per Schema) */}
          <div className="flex gap-12 mt-8 border-t border-gray-100 py-4 overflow-x-auto no-scrollbar">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">
                {isPlot ? "Plot Area" : "Carpet Area"}
              </span>
              <span className="text-gray-800 font-bold">
                {property.features?.carpetArea || property.features?.plotArea || property.features?.areaSize} 
                <span className="text-xs font-normal ml-1">sq.ft</span>
              </span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-12">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Configuration</span>
              <span className="text-gray-800 font-bold">
                {property.propertyType || `${property.features?.bedrooms} BHK`}
              </span>
            </div>
            <div className="flex flex-col border-l border-gray-200 pl-12">
              <span className="text-gray-400 text-[11px] uppercase font-bold tracking-wider">Status</span>
              <span className="text-green-600 font-bold">Ready to Move</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* IMAGE GALLERY */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm p-2">
            <div className="flex flex-col md:flex-row gap-2 h-[400px]">
              <div className="md:w-3/4 h-full bg-gray-100 rounded-lg overflow-hidden">
                <img src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa"} className="w-full h-full object-cover" alt="Property" />
              </div>
              <div className="md:w-1/4 flex md:flex-col gap-2 h-full">
                {property.images?.slice(1, 4).map((img, i) => (
                  <div key={i} className="flex-1 rounded-lg overflow-hidden bg-gray-100">
                    <img src={img} className="w-full h-full object-cover" alt="Property View" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. ABOUT THE PROPERTY (Dynamic per Schema) */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">About the Property</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
              <DetailItem 
                label="Price per Sq.Ft" 
                value={`₹${Math.round(property.price / (property.features?.carpetArea || property.features?.plotArea || property.features?.areaSize || 1)).toLocaleString("en-IN")}`} 
              />
              <DetailItem label="Locality" value={property.address?.area} />
              <DetailItem label="City" value={property.address?.city} />
              
              {isCommercial && (
                <>
                  <DetailItem label="Maintenance" value={`₹${property.features?.maintenance || 0}`} />
                  <DetailItem label="Parking" value={property.features?.parking || "Available"} />
                  <DetailItem label="Washrooms" value={property.features?.bathrooms || "Shared"} />
                </>
              )}

              {isPlot && (
                <>
                  <DetailItem label="Boundary Wall" value={property.features?.boundaryWall ? "Yes" : "No"} />
                  <DetailItem label="Corner Plot" value={property.features?.cornerPlot ? "Yes" : "No"} />
                  <DetailItem label="Type" value={property.propertyType} />
                </>
              )}

              {isResidential && (
                <>
                  <DetailItem label="Furnishing" value={property.features?.furnishedStatus} />
                  <DetailItem label="Bathrooms" value={property.features?.bathrooms} />
                  <DetailItem label="Bedrooms" value={property.features?.bedrooms} />
                </>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        {/* RIGHT COLUMN - Sticky Contact Card */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header with Background Accent */}
            <div className="bg-[#002B4B] p-6 text-white">
              <h3 className="text-lg font-bold">Contact Seller</h3>
              <p className="text-blue-200 text-xs mt-1">
                Get a response within 24 hours
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Interested in this property? Click below to send your details
                  to the agent.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-[#FFBA00] text-[#002B4B] font-bold rounded-lg hover:bg-[#f0af00] transition-colors shadow-md active:scale-[0.98]"
                >
                  Contact Agent Now
                </button>
              </div>
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
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Safe & Verified Listing
            </span>
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agentName={property.agentName}
        agentId={property.agent}
        propertyId={property._id}
        propertyTitle={getDynamicTitle()}
      />
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-xs mb-1 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value || "N/A"}</span>
  </div>
);

export default PropertyDetail;