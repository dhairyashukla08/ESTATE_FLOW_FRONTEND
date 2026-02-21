import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const InquiryModal = ({ isOpen, onClose, agentName, agentId, propertyId, propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in "${propertyTitle}". Let's connect!`
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the data to match your Backend Controller
      const inquiryData = {
        ...formData,
        agentId,    // Passed from AgentCard
        propertyId  // Passed from PropertyDetail or AgentCard
      };

      const response = await axios.post('/api/inquiries/send', inquiryData);
      
      if (response.status === 201) {
        alert("Success! Your message has been sent to " + agentName);
        onClose();
        // Optional: Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error("Inquiry Error:", error);
      alert(error.response?.data?.message || "Failed to send inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-md bg-white h-screen shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-gray-100 flex flex-col">
        
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Inquiry</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-4">
          <div className="mb-8 p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">Recipient</p>
            <p className="text-lg font-bold text-gray-900">{agentName}</p>
            <p className="text-xs text-gray-500 italic mt-2">Connecting regarding: {propertyTitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input fields remain the same as your code */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Your Identity</label>
              <input
                required
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Contact Info</label>
              <input
                required
                type="email"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium mb-3"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input
                required
                type="tel"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Message</label>
              <textarea
                rows="5"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-black'} text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-gray-800 transition-all`}
            >
              {loading ? 'Sending...' : 'Send Secure Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;