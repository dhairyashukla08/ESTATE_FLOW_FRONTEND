import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        {/* Logo Icon Animation */}
        <div className="mb-6 relative">
          <div className="w-16 h-16 border-4 border-slate-100 rounded-2xl"></div>
          <div className="w-16 h-16 border-t-4 border-black rounded-2xl absolute top-0 left-0 animate-spin"></div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
            ESTATE<span className="text-slate-400">FLOW</span>
          </h1>
          
          {/* Progress Bar Line */}
          <div className="mt-4 w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-black w-1/2 animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation Keyframe (Add to tailwind.config.js or use style tag) */}
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;