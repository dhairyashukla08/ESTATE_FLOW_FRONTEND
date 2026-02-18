import React from 'react';

const AgentCard = ({ agent }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition duration-300 group">

      {/* Top Section */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-20 h-20 rounded-2xl object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-4 border-white w-5 h-5 rounded-full shadow-sm"></div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black transition">
            {agent.name}
          </h3>
          <p className="text-sm text-gray-500">{agent.location}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
            Experience
          </p>
          <p className="font-semibold text-gray-900">
            {agent.experience}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
          <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
            Listings
          </p>
          <p className="font-semibold text-gray-900">
            {agent.listings} Active
          </p>
        </div>
      </div>

      {/* Specialty */}
      <div className="mb-8">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            Specializes in:
          </span>{" "}
          {agent.specialty}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
          Contact Agent
        </button>

        <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
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
