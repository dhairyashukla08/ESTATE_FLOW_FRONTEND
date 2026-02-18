import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ location: '', type: 'Buy', price: '' })

  const tabs = ['Buy', 'Rent', 'Commercial', 'Plots'];

  const handleSearch = () => {
   if (search.type === 'Commercial') {
    navigate(`/commercial?city=${search.location}`);
  } else if (search.type === 'Plots') {
    navigate(`/plots?city=${search.location}`);
  } else {
    // Default Buy/Rent search
    const queryString = `city=${search.location}&purpose=${search.type}`;
    navigate(`/search?${queryString}`);
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
                  className={`py-4 px-2 flex-1 text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                    search.type === tab 
                      ? 'text-white border-b-2 border-white' 
                      : 'text-white/70 hover:text-white'
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
                  onChange={(e) => setSearch({ ...search, location: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <button 
                onClick={handleSearch}
                className="px-8 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wide rounded-xl hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200 whitespace-nowrap"
              >
                Search
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-6 flex gap-6 justify-center text-xs font-bold uppercase tracking-widest text-white/60">
              <span className="hover:text-white cursor-pointer transition">Mumbai</span>
              <span className="hover:text-white cursor-pointer transition">Delhi</span>
              <span className="hover:text-white cursor-pointer transition">Bangalore</span>
              <span className="hover:text-white cursor-pointer transition">Pune</span>
              <span className="hover:text-white cursor-pointer transition">Jaipur</span>
              <span className="hover:text-white cursor-pointer transition">Ahmedabad</span>
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
          {[1, 2, 3].map((item) => (
            <div key={item} className="group bg-white rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                  alt="Property"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                  Featured
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900">Modern Villa Royale</h3>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Downtown, Los Angeles
                </p>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-50">
                  <span className="text-xl font-black text-black">$1,250,000</span>
                  <button className="p-3 rounded-xl bg-gray-900 text-white hover:bg-black transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
