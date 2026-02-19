import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PropertyCard = ({ property, layout = 'vertical' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || [];

  const nextImage = (e) => {
    e.preventDefault(); // Prevent Link navigation
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault(); // Prevent Link navigation
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isResidential = property.category === 'Residential' || (!property.category && property.features?.bedrooms > 0);
  
  // Calculate Price per Sqft
  const pricePerSqft = property.price && property.features?.areaSize 
    ? Math.round(property.price / property.features.areaSize) 
    : 0;

  if (layout === 'horizontal') {
    return (
      <Link
        to={`/property/${property._id}`}
        className="group flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 w-full mb-6 hover:-translate-y-1"
      >
        {/* IMAGE SECTION */}
        <div className="relative w-full md:w-80 lg:w-[400px] h-72 md:h-auto overflow-hidden bg-gray-100 shrink-0">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={prevImage} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={nextImage} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
            </div>
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{property.purpose}</span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 lg:p-8 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">{property.title}</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">By <span className="text-black font-bold">{property.agentName || "Premium Dealer"}</span> • {property.postedAt || "2 days ago"}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900">₹{property.price?.toLocaleString("en-IN")}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase">₹{pricePerSqft}/sq.ft</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mt-3 leading-relaxed">
            Located in the heart of <span className="font-bold text-gray-800">{property.address?.area}</span>, this property offers excellent connectivity to {property.highlights?.[0] || "major hubs"}.
          </p>

          {/* Highlights Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {property.highlights?.map((hl, i) => (
              <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-emerald-100">
                {hl}
              </span>
            )) || (
              <>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-blue-100">East Facing</span>
                <span className="bg-purple-50 text-purple-700 text-[10px] font-black uppercase px-3 py-1 rounded-lg border border-purple-100">School Nearby</span>
              </>
            )}
          </div>

          {/* Specs Footer */}
          <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
             <div className="flex gap-6 text-sm">
                <span className="flex items-center gap-2"><b className="font-black">{property.features?.bedrooms}</b> BHK</span>
                <span className="flex items-center gap-2"><b className="font-black">{property.features?.areaSize}</b> sqft</span>
             </div>
             
             <div className="flex gap-2">
                <a href={`tel:${property.contact || '9876543210'}`} onClick={(e) => e.stopPropagation()} className="px-5 py-2.5 rounded-xl border-2 border-black text-black font-bold text-xs hover:bg-black hover:text-white transition-all">
                  Contact
                </a>
                <button className="px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-all flex items-center gap-2">
                   View Details
                   <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
             </div>
          </div>
        </div>
      </Link>
    );
  }

  // VERTICAL LAYOUT (Updates for Home/Featured)
  return (
    <Link to={`/property/${property._id}`} className="group block bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="relative h-60 overflow-hidden">
        <img src={images[0]} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <span className="bg-white/90 backdrop-blur text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg">₹{pricePerSqft}/sq.ft</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition">{property.title}</h3>
        </div>
        <p className="text-2xl font-black text-gray-900 mt-1">₹{property.price?.toLocaleString("en-IN")}</p>
        
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar">
           <span className="whitespace-nowrap bg-gray-100 text-gray-600 text-[9px] font-bold uppercase px-2 py-1 rounded">D-Mart Nearby</span>
           <span className="whitespace-nowrap bg-gray-100 text-gray-600 text-[9px] font-bold uppercase px-2 py-1 rounded">Vastu Compliant</span>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
          <div className="text-[10px] text-gray-400 font-bold uppercase">Posted by <span className="text-gray-900">{property.agentName || "Dealer"}</span></div>
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-black transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;