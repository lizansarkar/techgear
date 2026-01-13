import React from 'react';

const HomeSkeleton = () => {
  return (
    <div className="bg-black min-h-screen pt-[140px] pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        
        {/* Top Section: Slider & Side Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          
          {/* Left: Main Big Slider Skeleton */}
          <div className="lg:col-span-2 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 h-[400px] md:h-[550px] relative overflow-hidden animate-pulse">
            {/* Shimmer effect for the main slider area */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-6">
              <div className="h-4 w-32 bg-zinc-800 rounded-full"></div>
              <div className="h-16 w-3/4 bg-zinc-800 rounded-2xl"></div>
              <div className="h-4 w-1/2 bg-zinc-800 rounded-full"></div>
              <div className="h-12 w-40 bg-zinc-800 rounded-full mt-4"></div>
            </div>
          </div>

          {/* Right: Two Side Banners Skeleton */}
          <div className="flex flex-col gap-5">
            {/* Top Small Banner */}
            <div className="h-1/2 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 animate-pulse flex flex-col justify-end p-8 space-y-3">
              <div className="h-6 w-24 bg-zinc-800 rounded-lg"></div>
              <div className="h-4 w-32 bg-zinc-800/50 rounded-lg"></div>
            </div>
            {/* Bottom Small Banner */}
            <div className="h-1/2 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 animate-pulse flex flex-col justify-end p-8 space-y-3">
              <div className="h-6 w-24 bg-zinc-800 rounded-lg"></div>
              <div className="h-4 w-32 bg-zinc-800/50 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Bottom: Marquee Section Skeleton */}
        <div className="border border-white/5 rounded-[2rem] py-10 bg-zinc-900/20 backdrop-blur-xl animate-pulse">
          <div className="flex justify-around items-center px-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-800 rounded-2xl"></div>
                <div className="h-4 w-24 bg-zinc-800 rounded-lg hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeSkeleton;