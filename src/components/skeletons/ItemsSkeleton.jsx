import React from 'react';

const ItemsSkeleton = () => {
  return (
    <div className="relative bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-4 animate-pulse">
      
      {/* Image Skeleton */}
      <div className="relative h-48 w-full rounded-[1.5rem] bg-zinc-800/50" />

      {/* Info Section Skeleton */}
      <div className="mt-4 space-y-5">
        
        {/* Title and Category Tag */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-zinc-800 rounded-md" />
          <div className="h-4 w-12 bg-zinc-800/50 rounded-full" />
        </div>

        {/* Specs/Zap Icon Section */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 bg-zinc-800 rounded-full" />
          <div className="h-3 w-40 bg-zinc-800 rounded-md" />
        </div>

        {/* Price and Rating Section */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="h-6 w-16 bg-zinc-800 rounded-md" />
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-zinc-800 rounded-full" />
              <div className="h-3 w-6 bg-zinc-800 rounded-md" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-full h-12 bg-zinc-800/30 rounded-xl border border-white/5" />
        </div>

      </div>
    </div>
  );
};

export default ItemsSkeleton;