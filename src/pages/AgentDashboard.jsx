import React from 'react'

const AgentDashboard = () => {

    const stats = [
    { label: 'Active Listings', value: '12', color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Inquiries', value: '48', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Pending Reviews', value: '2', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
  <div className="min-h-screen bg-gray-50 flex">
    
    {/* SIDEBAR */}
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Dashboard
      </h2>

      <button className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition">
        My Listings
      </button>

      <button className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition">
        Lead Inbox
      </button>

      <button className="text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition">
        Performance
      </button>
    </aside>

    {/* MAIN CONTENT */}
    <div className="flex-1 p-8">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-gray-800">
          Agent Console
        </h1>

        <button className="mt-4 md:mt-0 px-5 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition">
          + New Listing
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500 mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Inquiries
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            <thead className="border-b border-gray-200 text-gray-500 uppercase text-xs">
              <tr>
                <th className="py-3">Property</th>
                <th className="py-3">Inquirer</th>
                <th className="py-3">Date</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((row) => (
                <tr key={row} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-gray-800">
                    Skyline Apartment 4B
                  </td>
                  <td className="py-4 text-gray-600">
                    Rahul Sharma
                  </td>
                  <td className="py-4 text-gray-500">
                    Oct 24, 2023
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600">
                      New
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
);

}

export default AgentDashboard