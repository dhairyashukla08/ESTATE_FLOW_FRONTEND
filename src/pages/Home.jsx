import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../hooks/PropertyContext.jsx";
import PropertyCard from "../components/PropertyCard.jsx";

const Home = () => {
  const { featuredProperties, loading } = usePropertyContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    location: "",
    type: "Buy",
    price: "",
  });

  const tabs = ["Buy", "Rent", "Commercial", "Plots"];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.location) params.append("city", search.location);
    params.append("purpose", search.type === "Rent" ? "Rent" : "Buy");
    if (search.type === "Commercial") {
      params.append("category", "Commercial");
    } else if (search.type === "Plots") {
      params.append("category", "Plot");
    } else {
      // Default Buy/Rent search
      const queryString = `city=${search.location}&purpose=${search.type}`;
      navigate(`/search?${params.toString()}`);
    }
  };

  const getLeftPos = () => {
    const index = tabs.indexOf(search.type);
    return `${index * 25}%`;
  };

  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="relative h-[600px] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1600"
          alt="Modern House"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-center px-4 w-full max-w-4xl">
          <h1 className="text-4xl md:text-4xl font-black text-white mb-10 tracking-tight">
            Find Your <span className="text-gray-300">Sanctuary</span>
          </h1>

          <div className="w-full">
            {/* MINIMALIST TABS - Clean line underline */}
            <div className="flex w-full mb-8 border-b border-white/30">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSearch({ ...search, type: tab })}
                  className={`py-4 px-2 flex-1 text-sm font-medium uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                    search.type === tab
                      ? "text-white border-b-2 border-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* MINIMALIST SEARCH BAR */}
            <div className="flex flex-col md:flex-row gap-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter location"
                  value={search.location}
                  onChange={(e) =>
                    setSearch({ ...search, location: e.target.value })
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wide rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-6 flex gap-6 justify-center text-xs font-bold uppercase tracking-widest text-white/60">
              {["Mumbai", "Delhi", "Bangalore", "Pune"].map((city) => (
                <span
                  key={city}
                  onClick={() => {
                    setSearch({ ...search, location: city });
                    navigate(`/search?city=${city}&purpose=${search.type}`);
                  }}
                  className="hover:text-white cursor-pointer transition"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION - unchanged */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              FEATURED LISTINGS
            </h2>
            <p className="text-gray-500 text-lg">
              Handpicked premium properties just for you.
            </p>
          </div>
          <button className="hidden md:block px-8 py-4 rounded-2xl border-2 border-black text-black font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all shadow-sm">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {loading ? (
            // Show a simple loading state or skeletons
            <p className="text-center col-span-3 text-gray-400">
              Loading premium listings...
            </p>
          ) : featuredProperties.length > 0 ? (
            featuredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                layout="vertical"
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-400">
              No featured properties available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
