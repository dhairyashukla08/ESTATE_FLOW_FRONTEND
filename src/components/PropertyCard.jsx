import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, layout = "vertical" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // --- UNIFIED DATA LOGIC ---
  // 1. Images
  const images =
    property.images?.length > 0
      ? property.images
      : ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"];

  // 2. Area (Checks all potential schema keys)
  const displayArea =
    property.features?.areaSize ||
    property.features?.carpetArea ||
    property.features?.plotArea ||
    "N/A";

  // 3. Agent/Seller Name (Handles populated 'seller' object or flat strings)
  const displayAgent =
    property.seller?.name ||
    property.agentName ||
    property.agent?.name ||
    "Verified Agent";

  // 4. Contact Number
  const contactNumber = property.seller?.phoneNumber || property.contact || "";

  // 5. Configuration/BHK Display
  const bhkDisplay =
    property.features?.bedrooms > 0
      ? `${property.features.bedrooms} BHK`
      : property.propertyType
        ? property.propertyType
        : "Commercial";

  // Carousel Handlers
  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [autoPlay, images.length]);

  if (layout === "horizontal") {
    return (
      <div className="group flex bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 w-full h-72 mb-6">
        {/* IMAGE SECTION (45%) */}
        <div
          className="relative w-[45%] h-full overflow-hidden bg-gray-100"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <img
            src={images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black"
              >
                ›
              </button>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {property.purpose}
          </div>
        </div>

        {/* CONTENT SECTION (55%) */}
        <div className="w-[55%] h-full p-6 flex flex-col justify-between">
          {/* TOP */}
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  {property.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Listed by{" "}
                  <span className="text-black font-bold">{displayAgent}</span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-black text-gray-900">
                  ₹{property.price?.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] font-bold text-gray-400 uppercase">
                  ₹
                  {displayArea !== "N/A"
                    ? Math.round(property.price / displayArea)
                    : 0}{" "}
                  / sq.ft
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4 relative">
              <p className="text-gray-600 text-sm line-clamp-2">
                {property.description}
              </p>

              {property.description?.length > 120 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-black text-xs font-bold mt-1 hover:underline"
                >
                  Read More...
                </button>
              )}

              {isExpanded && (
                <div className="absolute left-0 top-0 w-full bg-white border border-gray-200 shadow-2xl rounded-2xl p-5 z-20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-black text-sm uppercase text-gray-800">
                      Full Description
                    </h4>
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-gray-400 hover:text-black text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed max-h-15 overflow-y-auto">
                    {property.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM */}
          <div>
            <div className="flex justify-between text-sm border-t border-gray-100 pt-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Config
                </span>
                <p className="font-black text-gray-900">{bhkDisplay}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Area
                </span>
                <p className="font-black text-gray-900">{displayArea} sq.ft</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  Location
                </span>
                <p className="font-black text-gray-900">
                  {property.address?.area}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <a
                href={`tel:${contactNumber}`}
                className="px-5 py-2 rounded-xl border-2 border-black text-black font-bold text-xs hover:bg-black hover:text-white transition-all"
              >
                Call Agent
              </a>

              <Link
                to={`/property/${property._id}`}
                className="px-5 py-2 rounded-xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-all"
              >
                Full View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VERTICAL LAYOUT ---
  return (
    <div className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={prevImage}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg text-black"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {property.purpose}
        </div>
      </div>

      <div className="p-6 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-black text-gray-900 leading-tight">
            {property.title}
          </h3>
          <p className="text-lg font-black text-gray-900">
            ₹{property.price?.toLocaleString("en-IN")}
          </p>
        </div>
        <p className="text-gray-500 text-sm font-medium mt-1">
          Listed by <span className="text-black font-bold">{displayAgent}</span>
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between text-sm">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Config
            </span>
            <p className="font-black text-gray-900">{bhkDisplay}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Area
            </span>
            <p className="font-black text-gray-900">{displayArea} sq.ft</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">
              Location
            </span>
            <p className="font-black text-gray-900 truncate w-24">
              {property.address?.area}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <a
            href={`tel:${contactNumber}`}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-black text-black font-bold text-xs hover:bg-black hover:text-white transition-all text-center"
          >
            Call Agent
          </a>
          <Link
            to={`/property/${property._id}`}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-all text-center"
          >
            Full View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
