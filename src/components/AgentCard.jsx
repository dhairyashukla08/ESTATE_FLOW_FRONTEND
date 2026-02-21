import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgentCard = ({ agent,onContact }) => {
  const navigate = useNavigate();

  const handleContact = (e) => {
    e.stopPropagation();
    onContact();
    // This will eventually open your inquiry modal
    console.log(`Contacting agent: ${agent.name}`);
  };

  return (
    <div 
      onClick={() => navigate(`/agents/${agent.id}`)} // Preparing for Agent Profile Page
      className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100"
    >
      {/* Top Section */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative">
          <img
            src={agent.image || "https://via.placeholder.com/200"}
            alt={agent.name}
            className="w-20 h-20 rounded-2xl object-cover shadow-md"
          />
          {/* Online Status Indicator */}
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-4 border-white w-6 h-6 rounded-full shadow-sm"></div>
        </div>

        <div>
          <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">
            {agent.name}
          </h3>
          <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {agent.location || "Available Nationwide"}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
            Experience
          </p>
          <p className="text-lg font-bold text-gray-900">
            {agent.experience || "New Associate"}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
            Listings
          </p>
          <p className="text-lg font-bold text-gray-900">
            {agent.listings} <span className="text-xs font-medium text-gray-500">Ads</span>
          </p>
        </div>
      </div>

      {/* Specialty Tag */}
      <div className="mb-8">
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
          {agent.specialty || "Real Estate Expert"}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={handleContact}
          className="flex-1 bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition shadow-lg active:scale-95"
        >
          Contact Agent
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); /* Logic for share */ }}
          className="px-5 py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition active:scale-95"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AgentCard;