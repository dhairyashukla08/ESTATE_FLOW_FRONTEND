import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PropertyCard = ({ property, layout = 'vertical' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = property.images || [];

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Logic to determine if we should show residential features
  const isResidential = property.category === 'Residential' || (!property.category && property.features?.bedrooms > 0);

  if (layout === 'horizontal') {
    return (
      <Link
        to={`/property/${property._id}`}
        className="group flex flex-col md:flex-row bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 w-full mb-6 hover:-translate-y-1"
      >
        {/* IMAGE SECTION - Fixed width on desktop, full on mobile */}
        <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-auto overflow-hidden bg-gray-100 shrink-0">
          <img
            key={currentImageIndex}
            src={images[currentImageIndex] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600"}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={prevImage} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={nextImage} className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {property.purpose}
            </span>
          </div>
        </div>

        {/* CONTENT SECTION - Expanded to fill the row */}
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                {property.category || 'Property'}
              </p>
              {property.isFeatured && (
                <span className="bg-yellow-400 text-black text-[9px] font-black uppercase px-2 py-1 rounded-md">Featured</span>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-black transition">
              {property.title}
            </h3>
            
            <p className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {property.address?.area}, {property.address?.city}
            </p>

            {/* Features Row */}
            <div className="flex gap-6 text-sm text-gray-600 mt-6 py-4 border-y border-gray-50">
              {isResidential && (
                <span className="flex items-center gap-2">
                  <b className="text-gray-900 font-black">{property.features?.bedrooms}</b> BHK
                </span>
              )}
              <span className="flex items-center gap-2">
                <b className="text-gray-900 font-black">{property.features?.areaSize?.toLocaleString()}</b> 
                {property.category === 'Plots' ? 'sq. yards' : 'sqft'}
              </span>
              {property.features?.bathrooms > 0 && (
                <span className="flex items-center gap-2">
                  <b className="text-gray-900 font-black">{property.features?.bathrooms}</b> Baths
                </span>
              )}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Price</p>
              <p className="text-3xl font-black text-gray-900 tracking-tighter">
                ₹{property.price?.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:bg-gray-800">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ORIGINAL VERTICAL LAYOUT (unchanged - kept for backward compatibility)
  return (
    <Link
      to={`/property/${property._id}`}
      className="group block bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.images?.[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600"}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            {property.purpose}
          </span>

          {property.isFeatured && (
            <span className="bg-yellow-400 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6">
        {/* Category Tag */}
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
          {property.category || 'Property'}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2 font-medium">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.address.area}, {property.address.city}
        </p>

        {/* Adaptive Features */}
        <div className="flex gap-4 text-xs text-gray-600 mt-5 py-4 border-y border-gray-50">
          {isResidential && (
            <>
              <span className="flex items-center gap-1">
                <b className="text-gray-900 font-black">{property.features.bedrooms}</b> BHK
              </span>
              <div className="w-[1px] h-4 bg-gray-200"></div>
            </>
          )}
          
          <span className="flex items-center gap-1">
            <b className="text-gray-900 font-black">
              {property.features.areaSize.toLocaleString()}
            </b> 
            {property.category === 'Plots' ? 'sq. yards' : 'sqft'}
          </span>

          {property.features.bathrooms > 0 && (
            <>
              <div className="w-[1px] h-4 bg-gray-200"></div>
              <span className="flex items-center gap-1">
                <b className="text-gray-900 font-black">{property.features.bathrooms}</b> Baths
              </span>
            </>
          )}
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Price</p>
            <p className="text-2xl font-black text-gray-900 tracking-tighter">
              ₹{property.price.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-900 group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard
