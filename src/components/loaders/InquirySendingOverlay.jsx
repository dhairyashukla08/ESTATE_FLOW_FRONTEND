import React from "react";

const InquirySendingOverlay = () => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl z-10">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-black rounded-full animate-spin" />
    </div>
    <p className="text-xs font-black uppercase tracking-widest text-gray-500">
      Sending your message
    </p>
  </div>
);

export default InquirySendingOverlay;