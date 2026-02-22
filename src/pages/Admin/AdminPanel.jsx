import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [data, setData] = useState({ stats: {}, listings: [], users: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userObj = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${userObj.token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleDelete = async (id, category) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    try {
      const userObj = JSON.parse(localStorage.getItem("user"));
      let url = `/api/properties/${id}`;
      if (category === "Commercial") url = `/api/commercial/${id}`;
      if (category === "Plot") url = `/api/plots/${id}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${userObj.token}` },
      });
      setData((prev) => ({
        ...prev,
        listings: prev.listings.filter((l) => l._id !== id),
      }));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center font-black">INITIALIZING SYSTEMS...</div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:block shrink-0">
        <div className="p-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Management
          </h2>
          <nav className="mt-6 space-y-2">
            {["properties", "users", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all capitalize ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="flex-1 p-6 md:p-10">
        {/* STATS HEADER */}
        <header className="max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users"
              value={data.stats.totalUsers}
              color="text-blue-600"
            />
            <StatCard
              label="Total Listings"
              value={data.stats.totalListings}
              color="text-emerald-600"
            />
            <StatCard
              label="Commercial"
              value={data.stats.commercial}
              color="text-purple-600"
            />
            <StatCard
              label="Plots"
              value={data.stats.plots}
              color="text-orange-600"
            />
          </div>
        </header>

        {/* CONDITIONAL CONTENT */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "properties" && (
            <>
              <h2 className="text-xl font-black mb-6">Global Inventory</h2>
              <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                {data.listings.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50/50"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={
                          item.images?.[0] || "https://via.placeholder.com/50"
                        }
                        className="w-12 h-12 rounded-lg object-cover"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-slate-900">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          By: {item.agent?.name || "Unknown"}{" "}
                        </p>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                            item.category === "Commercial"
                              ? "bg-purple-100 text-purple-600"
                              : item.category === "Plot"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id, item.category)}
                      className="px-4 py-2 text-red-600 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "users" && (
            <>
              <h2 className="text-xl font-black mb-6">System Users</h2>
              <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.users.map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/50">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {u.name}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-[9px] font-black uppercase ${u.role === "admin" ? "bg-purple-100 text-purple-600" : u.role === "agent" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-600"}`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                          {u.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === "analytics" && (
            <div className="bg-white p-20 rounded-[32px] border border-slate-100 text-center">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Visual Analytics Coming Soon
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-wider">
      {label}
    </p>
    <p className={`text-2xl font-black ${color}`}>{value || 0}</p>
  </div>
);

export default AdminPanel;
