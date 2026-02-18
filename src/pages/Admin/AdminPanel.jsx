import React from "react";

const AdminPanel = () => {
 return (
  <div className="min-h-screen bg-gray-50 px-6 py-10">
    
    {/* Header */}
    <div className="max-w-6xl mx-auto mb-12">
      <h1 className="text-3xl font-semibold text-gray-900">
        Admin Management
      </h1>

      <div className="flex gap-6 mt-6 text-sm text-gray-600">
        <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
          Users: <span className="font-medium text-gray-900">1,240</span>
        </div>

        <div className="bg-white px-5 py-3 rounded-xl shadow-sm">
          Pending Approval:{" "}
          <span className="font-medium text-gray-900">14</span>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
      
      {/* LEFT SECTION */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">
            Pending Property Reviews
          </h2>

          <div className="space-y-8">
            {[1, 2].map((property) => (
              <div
                key={property}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-6"
              >
                
                {/* Property Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl"></div>

                  <div>
                    <h4 className="font-medium text-gray-900">
                      Green Valley Estate
                    </h4>
                    <p className="text-sm text-gray-500">
                      Posted by: Agent John Doe
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 text-sm">
                  <button className="text-gray-900 hover:underline">
                    Approve
                  </button>

                  <button className="text-gray-500 hover:text-gray-900 transition">
                    Reject
                  </button>

                  <button className="text-gray-500 hover:text-gray-900 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="space-y-8">
        
        {/* Analytics */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Site Traffic
          </h3>

          <div className="h-36 flex items-center justify-center bg-gray-100 rounded-xl text-sm text-gray-400">
            Chart Component
          </div>
        </div>

        {/* Flagged Users */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Flagged Users
          </h3>

          <p className="text-sm text-gray-500">
            No users currently flagged.
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default AdminPanel;
