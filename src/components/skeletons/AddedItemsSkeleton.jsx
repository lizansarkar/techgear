// components/skeletons/AddedItemsSkeleton.jsx
import React from 'react';

const AddedItemsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-16 pt-[120px]">
        <div className="space-y-4">
          <div className="h-4 w-32 bg-zinc-800 animate-pulse rounded"></div>
          <div className="h-12 w-64 bg-zinc-800 animate-pulse rounded-xl"></div>
        </div>
        <div className="h-24 w-48 bg-zinc-800 animate-pulse rounded-3xl"></div>
      </div>

      {/* List Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-zinc-900/30 border border-white/5 rounded-[2rem] p-5 flex flex-col md:flex-row items-center gap-8 animate-pulse">
            <div className="w-24 h-24 bg-zinc-800 rounded-2xl"></div>
            <div className="flex-1 space-y-3">
              <div className="h-3 w-20 bg-zinc-800 rounded"></div>
              <div className="h-6 w-48 bg-zinc-800 rounded"></div>
            </div>
            <div className="h-8 w-24 bg-zinc-800 rounded"></div>
            <div className="flex gap-3">
              <div className="h-12 w-12 bg-zinc-800 rounded-xl"></div>
              <div className="h-12 w-12 bg-zinc-800 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedItemsSkeleton;