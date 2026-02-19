import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
  const { user,updateProfile } = useAuth(); // Assuming login updates state/localStorage
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Local state for the form
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phoneNumber || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phoneNumber || "",
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSave =async () => {
setLoading(true);
    setMessage({ type: "", text: "" });
   const result = await updateProfile({
      name: formData.name,
      phoneNumber: formData.phone, 
    });

   if (result.success) {
      setIsEditing(false);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } else {
      setMessage({ type: "error", text: result.message });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12 flex items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-black text-white flex items-center justify-center text-4xl font-bold shadow-md">
            {formData.name ? formData.name[0].toUpperCase() : "U"}
          </div>

          <div>
            {isEditing ? (
              <input
                type="text"
                className="text-4xl font-black text-slate-900 border-b-2 border-black focus:outline-none bg-transparent"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <h1 className="text-4xl font-black text-slate-900">
                {user.name}
              </h1>
            )}
            <p className="text-slate-500 text-lg capitalize mt-1">
              {user.role || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-2xl font-black text-slate-900">
            Account Information
          </h2>
          <p className="text-slate-500 mt-2">
            Manage your personal details and account settings.
          </p>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Email Field */}
          <div className="space-y-3 opacity-70">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-400">
              Email Address (Permanent)
            </h3>
            <p className="text-lg font-semibold text-slate-800 break-all">
              {user.email}
            </p>
            <div className="h-px bg-slate-200 mt-4"></div>
          </div>

          {/* Phone Field */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-400">
              Phone Number
            </h3>
            {isEditing ? (
              <input
                type="text"
                placeholder="Enter phone number"
                className="w-full text-lg font-semibold text-slate-800 border-b border-slate-300 focus:border-black focus:outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            ) : (
              <p className="text-lg font-semibold text-slate-800">
                {user.phoneNumber || "Not provided"}
              </p>
            )}
            <div className="h-px bg-slate-200 mt-4"></div>
          </div>

          {/* Member Since (Read Only) */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest font-black text-slate-400">
              Member Since
            </h3>
            <p className="text-lg font-semibold text-slate-800">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="h-px bg-slate-200 mt-4"></div>
          </div>
        </div>

        {/* Action Area */}
        <div className="mt-16 flex gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-10 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
              >
                Save Profile
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-10 py-4 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition-all"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-10 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
