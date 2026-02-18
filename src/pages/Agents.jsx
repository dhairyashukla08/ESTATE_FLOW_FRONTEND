import React, { useState } from 'react';
import AgentCard from '../components/AgentCard.jsx';


const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data - Connect to /api/users?role=agent later
  const agents = [
    {
      id: 1,
      name: "Rajesh Malhotra",
      experience: "8+ Years",
      listings: 24,
      specialty: "Luxury Villas",
      location: "South Delhi",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      name: "Priya Sharma",
      experience: "5+ Years",
      listings: 15,
      specialty: "Residential Apartments",
      location: "Bandra, Mumbai",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    }
  ];

 return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900">
            Find a Trusted Agent
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed">
            Connect with local experts who can help you find your dream home
            or sell your property at the best price.
          </p>

          <div className="flex gap-3 pt-6">
            <input
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="px-8 py-3 rounded-xl bg-black text-white hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-black rounded-3xl p-14 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Are you a Real Estate Professional?
          </h2>

          <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Join 10,000+ agents who grow their business using EstateFlow's
            advanced marketing tools.
          </p>

          <button className="px-10 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition font-medium">
            Register as an Agent
          </button>
        </div>

      </div>
    </div>
  );
};

export default Agents;