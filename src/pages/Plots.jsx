import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';

const Plots = () => {

  const plotListings = [
    {
      _id: 'p1',
      title: "Green Valley Residential Plot",
      images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"],
      purpose: "For Sale",
      category: "Plots",
      isFeatured: true,
      address: { city: "Gurgaon", area: "Sector 45" },
      features: { areaSize: 1500, bathrooms: 0 },
      price: 7500000
    },
    {
      _id: 'p2',
      title: "Industrial Land Parcel",
      images: ["https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?auto=format&fit=crop&q=80&w=800"],
      purpose: "For Sale",
      category: "Plots",
      address: { city: "Pune", area: "Chakan" },
      features: { areaSize: 10000, bathrooms: 0 },
      price: 24000000
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center bg-emerald-900">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          alt="Open Land"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Lands & Plots</h1>
          <p className="text-gray-200 mt-4 text-lg max-w-2xl mx-auto">Invest in the foundation of your future with our verified residential and agricultural plots.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Section */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm mb-16 flex flex-wrap gap-8 justify-around items-center border border-gray-100">
           <div className="text-center">
             <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">Available Area</p>
             <p className="text-2xl font-black text-gray-900 mt-1">1,200+ Acres</p>
           </div>
           <div className="h-12 w-[1px] bg-gray-100 hidden md:block"></div>
           <div className="text-center">
             <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">Verified Status</p>
             <p className="text-2xl font-black text-emerald-600 mt-1">100% Legal</p>
           </div>
           <div className="h-12 w-[1px] bg-gray-100 hidden md:block"></div>
           <div className="text-center">
             <p className="text-gray-400 uppercase text-[10px] font-black tracking-[0.2em]">Daily Inquiries</p>
             <p className="text-2xl font-black text-gray-900 mt-1">450+</p>
           </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {plotListings.map((plot) => (
            <PropertyCard key={plot._id} property={plot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plots;