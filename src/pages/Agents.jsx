import React, { useEffect, useState } from "react";
import AgentCard from "../components/AgentCard.jsx";
import InquiryModal from "../components/InquiryModal.jsx";

const Agents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // Change to absolute URL if proxy isn't configured
      const response = await fetch("http://localhost:8000/api/agents");

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setAgents(data);
    } catch (err) {
      setError("Failed to load agents. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // Defensive check: ensure fields exist before calling toLowerCase()
  const filteredAgents = agents.filter((agent) => {
    const name = agent.name?.toLowerCase() || "";
    const location = agent.location?.toLowerCase() || "location not set";
    const specialty = agent.specialty?.toLowerCase() || "general agent";
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      location.includes(search) ||
      specialty.includes(search)
    );
  });

  const handleContactClick = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-4xl font-black mb-10 tracking-tight">
            Find a Trusted Agent
          </h1>
          <div className="flex gap-3 pt-6">
            <input
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black transition"
              placeholder="Search by name, location, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <AgentCard
                key={agent._id || agent.id}
                agent={agent}
                onContact={() => handleContactClick(agent)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 font-bold">
                No agents found matching your search...
              </p>
            </div>
          )}
        </div>

        {/* INQUIRY MODAL */}
        <InquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agentName={selectedAgent?.name}
          agentId={selectedAgent?._id || selectedAgent?.id}
          propertyTitle="General Inquiry"
        />

        {/* Register CTA */}
        <div className="bg-black rounded-3xl p-14 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Are you a Real Estate Professional?
          </h2>
          <button className="px-10 py-3 rounded-xl bg-white text-black hover:bg-gray-200 transition font-bold uppercase text-xs tracking-widest">
            Register as an Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agents;
