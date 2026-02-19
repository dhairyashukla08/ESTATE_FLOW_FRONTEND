import React, { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Data for demonstration
  const stats = [
    { label: "Total Users", value: "1,240", color: "text-blue-600" },
    { label: "Active Listings", value: "482", color: "text-emerald-600" },
    { label: "Pending Reviews", value: "14", color: "text-amber-600" },
    { label: "Reports", value: "3", color: "text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* 1. INTERNAL SIDEBAR NAVIGATION */}
      <div className="w-64 bg-white border-r border-slate-200 hidden md:block shrink-0">
        <div className="p-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Management</h2>
          <nav className="mt-6 space-y-2">
            {["properties", "users", "analytics", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all capitalize ${
                  activeTab === tab 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Header with Quick Stats */}
        <header className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Overview</h1>
              <p className="text-slate-500 font-medium">Welcome back, Super Admin.</p>
            </div>
            <button className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition">
              Download System Audit
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">{s.label}</p>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </header>

        {/* 3. MODERATION QUEUE */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-xl font-black text-slate-900">Moderation Queue</h2>
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="Search listings..." 
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>

              <div className="divide-y divide-slate-50">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-8 hover:bg-slate-50/50 transition-colors">
                    <div className="flex gap-6">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200" alt="Property" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded mb-1 inline-block">Review Required</span>
                            <h4 className="font-bold text-slate-900 text-lg">Skyline Penthouse 402</h4>
                            <p className="text-sm text-slate-500 font-medium">Submitted by: <span className="text-slate-900">Agent Sarah Miller</span></p>
                          </div>
                          <p className="font-black text-slate-900">₹4.2 Cr</p>
                        </div>
                        
                        <div className="flex gap-3 mt-6">
                          <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-black transition">Approve Listing</button>
                          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition">Reject</button>
                          <button className="px-4 py-2 text-slate-400 hover:text-slate-900 text-xs font-bold transition">View Assets</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. SIDEBAR ACTIONS */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-200">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all text-left px-4 flex items-center justify-between">
                  Broadcast Message <span>→</span>
                </button>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all text-left px-4 flex items-center justify-between">
                  Add New Admin <span>+</span>
                </button>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { user: "Admin Dev", act: "Rejected Listing #204", time: "12m ago" },
                  { user: "System", act: "New User Registration", time: "45m ago" },
                  { user: "Admin Max", act: "Updated Commission Rates", time: "2h ago" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-slate-200 mt-1.5 shrink-0"></div>
                    <div>
                      <p className="text-slate-900 font-bold">{log.user}</p>
                      <p className="text-slate-500 text-xs">{log.act}</p>
                      <span className="text-[10px] text-slate-300 font-bold uppercase">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminPanel;