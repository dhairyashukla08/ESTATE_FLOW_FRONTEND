import React from "react";

const AgentCardSkeleton = () => (
  <div className="bg-white rounded-3xl p-8 border border-gray-100 animate-pulse">
    <div className="flex items-center gap-5 mb-8">
      <div className="w-20 h-20 rounded-2xl bg-gray-200" />
      <div className="space-y-2">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="h-16 bg-gray-100 rounded-2xl" />
      <div className="h-16 bg-gray-100 rounded-2xl" />
    </div>
    <div className="h-6 w-32 bg-gray-100 rounded-lg mb-8" />
    <div className="flex gap-3">
      <div className="flex-1 h-12 bg-gray-200 rounded-2xl" />
      <div className="w-14 h-12 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);

const AgentGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <AgentCardSkeleton key={i} />
    ))}
  </div>
);

export default AgentGridSkeleton;