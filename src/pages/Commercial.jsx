import React from 'react';
import PropertyCard from '../components/PropertyCard.jsx';

const Commercial = () => {
  // Dummy data to visualize the cards
  const commercialProperties = [
    {
      _id: 'c1',
      title: "Tech Park Office Suite",
      images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
      purpose: "For Rent",
      category: "Commercial",
      isFeatured: true,
      address: { city: "Bangalore", area: "Whitefield" },
      features: { areaSize: 2500, bathrooms: 2 },
      price: 150000
    },
    {
      _id: 'c2',
      title: "Corner Retail Showroom",
      images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"],
      purpose: "For Sale",
      category: "Commercial",
      address: { city: "Mumbai", area: "Bandra" },
      features: { areaSize: 1200, bathrooms: 1 },
      price: 45000000
    }
  ];

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
            <p className="text-gray-500 text-sm">Showing premium business properties</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black">
              <option>Property Type</option>
              <option>Office Space</option>
              <option>Retail Shop</option>
              <option>Warehouse</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black">
              <option>Sort By</option>
              <option>Price: Low to High</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {commercialProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
          {/* Empty states or skeletons can go here if loading */}
        </div>
      </div>
    </div>
  );
};

export default Commercial;