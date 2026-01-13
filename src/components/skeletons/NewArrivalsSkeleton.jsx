import React from 'react';

const NewArrivalsSkeleton = () => {
  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Skeleton */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-3">
            <div className="h-4 w-32 bg-zinc-800 rounded-full animate-pulse"></div>
            <div className="h-10 w-64 bg-zinc-800 rounded-xl animate-pulse"></div>
          </div>
          <div className="h-10 w-24 bg-zinc-900 rounded-full animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-[2rem] p-5 space-y-5 animate-pulse">
              <div className="aspect-square bg-zinc-800 rounded-2xl w-full"></div>
              <div className="space-y-3">
                <div className="h-5 w-3/4 bg-zinc-800 rounded-lg"></div>
                <div className="h-4 w-1/2 bg-zinc-800/50 rounded-lg"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-20 bg-zinc-800 rounded-lg"></div>
                <div className="h-10 w-10 bg-zinc-800 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSkeleton;