import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState({ stats: {}, listings: [], inquiries: [] });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleDelete = async (id, category) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;
    const toastId = toast.loading("Removing listing...");
    try {
      const userObj = JSON.parse(localStorage.getItem("user"));
      let endpoint = `/api/properties/${id}`;
      if (category === "Commercial") endpoint = `/api/commercial/${id}`;
      if (category === "Plot") endpoint = `/api/plots/${id}`;

      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${userObj.token}` },
      });

      setData((prev) => ({
        ...prev,
        listings: prev.listings.filter((item) => item._id !== id),
      }));
      toast.update(toastId, {
        render: "Property deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Delete error:", err);
      toast.update(toastId, {
        render: "Failed to delete property",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          console.error("No user found in local storage");
          return;
        }

        const userObj = JSON.parse(storedUser);
        const token = userObj.token;

        if (!token) {
          console.error("No token found in user object");
          return;
        }

        const res = await axios.get("/api/agents/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-black text-sm text-gray-400 uppercase tracking-widest">
            Accessing Console...
          </p>
        </div>
      </div>
    );

  const statsList = [
    {
      label: "Active Listings",
      value: data.stats.activeListings || 0,
      color: "text-blue-600",
    },
    {
      label: "Total Inquiries",
      value: data.stats.totalInquiries || 0,
      color: "text-emerald-600",
    },
    {
      label: "Property Views",
      value: data.stats.propertyViews || 0,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col gap-2">
        <div className="mb-8 px-4">
          <h2 className="text-xl font-black text-black tracking-tight">
            EstateFlow
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Agent Console
          </p>
        </div>

        {["overview", "listings", "leads"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm capitalize ${activeTab === tab ? "bg-black text-white shadow-lg" : "hover:bg-gray-100 text-gray-500"}`}
          >
            {tab === "leads"
              ? "Lead Inbox"
              : tab === "listings"
                ? "My Listings"
                : tab}
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage your portfolio and client requests.
            </p>
          </div>
          <button
            onClick={() => navigate("/list-property")}
            className="px-6 py-3 rounded-xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-all hover:scale-105 shadow-lg uppercase tracking-wider"
          >
            + New Listing
          </button>
        </header>

        {activeTab === "overview" && (
          <div className="space-y-10">
            <div className="grid md:grid-cols-3 gap-6">
              {statsList.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100"
                >
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-black ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">
                  Recent Activity
                </h3>
                <button
                  onClick={() => setActiveTab("leads")}
                  className="text-xs font-bold text-blue-600"
                >
                  View All
                </button>
              </div>
              <InquiryTable
                limit={3}
                onSelect={setSelectedLead}
                inquiries={data.inquiries}
              />
            </div>
          </div>
        )}

        {activeTab === "listings" && (
          <ManageListings
            listings={data.listings}
            onDelete={handleDelete}
            onEdit={(item) =>
              navigate("/list-property", { state: { editData: item } })
            }
          />
        )}
        {activeTab === "leads" && (
          <InquiryTable onSelect={setSelectedLead} inquiries={data.inquiries} />
        )}
      </div>

      {selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ManageListings = ({ listings, onDelete, onEdit }) => (
  <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
    {listings.length > 0 ? (
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4">Property Details</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            {/* --- NEW COLUMN --- */}
            <th className="px-6 py-4">Views</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {listings.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {item.address?.city || "Location N/A"}
                </p>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[9px] font-black rounded uppercase tracking-tighter">
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-600 text-sm font-bold italic">
                ₹{item.price?.toLocaleString("en-IN")}
              </td>

              {/* --- VIEW COUNT CELL --- */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-purple-600">
                    {item.views || 0}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
              </td>

              <td className="px-6 py-4 text-right space-x-4">
                <button
                  onClick={() => onEdit(item)}
                  className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id, item.category)}
                  className="text-[10px] font-black text-red-600 hover:text-red-800 uppercase tracking-widest"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="p-20 text-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
          No listings found. Start by adding one!
        </p>
        <button
          onClick={() => navigate("/list-property")}
          className="text-blue-600 font-black text-xs uppercase underline tracking-widest"
        >
          Create First Listing
        </button>
      </div>
    )}
  </div>
);

const InquiryTable = ({ limit, onSelect, inquiries }) => (
  <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
    {inquiries.length > 0 ? (
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
          <tr>
            <th className="px-6 py-4">Inquirer</th>
            <th className="px-6 py-4">Interest</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {inquiries.slice(0, limit || inquiries.length).map((inquiry) => (
            <tr key={inquiry._id} className="hover:bg-gray-50/50 transition">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-900 text-sm">
                  {inquiry.name}
                </p>
                <p className="text-[10px] text-gray-400 font-bold">
                  {inquiry.phone || inquiry.email}
                </p>
              </td>
              <td className="px-6 py-4 text-gray-500 text-xs truncate max-w-[200px]">
                {inquiry.message}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onSelect(inquiry)}
                  className="px-4 py-2 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition hover:bg-gray-800"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div className="p-20 text-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          Your inbox is currently empty.
        </p>
      </div>
    )}
  </div>
);

const LeadModal = ({ lead, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
    <div className="bg-white rounded-[32px] max-w-md w-full p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-black text-gray-900">{lead.name}</h2>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">
            Property Inquiry
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-black transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
        <p className="text-gray-600 text-sm leading-relaxed italic font-medium">
          "{lead.message}"
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={`tel:${lead.phone}`}
          className="block w-full bg-black text-white text-center py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Call Client
        </a>
        <button
          onClick={onClose}
          className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition"
        >
          Mark as Read
        </button>
      </div>
    </div>
  </div>
);

export default AgentDashboard;
