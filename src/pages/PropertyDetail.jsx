import React from "react";

const PropertyDetail = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-96 rounded-2xl overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Property"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                  alt="Property"
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className="absolute inset-0 bg-black/40"></span>
                <p className="relative text-white font-medium text-lg">
                  +5 More
                </p>
              </div>
            </div>
          </div>

          {/* Property Header */}
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900">
                  Luxury Penthouse
                </h1>
                <p className="text-gray-500 mt-2">
                  Bandra West, Mumbai
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-3xl font-semibold text-gray-900">
                  ₹8.5 Cr
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  ₹45,000 / sq.ft
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex gap-10 border-t border-gray-100 pt-6 text-gray-700">
              <div>
                <p className="text-xl font-semibold text-gray-900">3</p>
                <p className="text-sm text-gray-500">BHK</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">4</p>
                <p className="text-sm text-gray-500">Baths</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-gray-900">2,400</p>
                <p className="text-sm text-gray-500">sqft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Experience unparalleled luxury in this sprawling penthouse.
              Featuring floor-to-ceiling windows, a private terrace,
              and state-of-the-art kitchen appliances. Perfect for those
              who seek exclusivity in the heart of the city.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - Sticky Contact Card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            
            <h3 className="text-lg font-semibold text-gray-900">
              Inquire About Property
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              />

              <textarea
                rows="4"
                placeholder="I am interested in this property..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition"
              ></textarea>

              <button className="w-full py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition">
                Send Inquiry
              </button>
            </form>

            {/* Agent Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-medium text-gray-900">
                  Rajesh Kumar
                </p>
                <p className="text-sm text-gray-500">
                  Premium Agent • 45 Listings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
