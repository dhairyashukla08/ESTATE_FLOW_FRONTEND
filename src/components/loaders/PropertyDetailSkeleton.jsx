import React from "react";

const PropertyDetailSkeleton = () => (
  <div className="min-h-screen bg-[#F4F4F4] animate-pulse">
    <div className="bg-white border-b border-gray-200 pt-6 pb-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-3">
            <div className="h-7 w-96 bg-gray-200 rounded-lg" />
            <div className="h-4 w-56 bg-gray-100 rounded" />
          </div>
          <div className="h-9 w-40 bg-gray-200 rounded-lg" />
        </div>
        <div className="flex gap-12 mt-8 border-t border-gray-100 py-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-2">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl p-2">
          <div className="h-[400px] bg-gray-200 rounded-lg" />
        </div>
        <div className="bg-white rounded-xl p-8 space-y-6">
          <div className="h-5 w-48 bg-gray-200 rounded" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-2">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl h-80" />
    </div>
  </div>
);

export default PropertyDetailSkeleton;