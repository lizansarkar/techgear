"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Shimmer = () => (
  <motion.div
    initial={{ x: '-100%' }}
    animate={{ x: '100%' }}
    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent z-10"
  />
);

const HomeSkeleton = () => {
  return (
    <div className="bg-[#050505] min-h-screen pt-[140px] pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Top Section: Slider & Side Banners Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Left: Main Big Slider Skeleton */}
          <div className="lg:col-span-2 rounded-[3rem] bg-zinc-900/40 border border-white/5 h-[400px] md:h-[580px] relative overflow-hidden">
            <Shimmer />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-8">
              <div className="h-3 w-32 bg-orange-500/20 rounded-full"></div>
              <div className="space-y-3 flex flex-col items-center">
                <div className="h-14 w-[80%] bg-zinc-800/80 rounded-2xl"></div>
                <div className="h-14 w-[60%] bg-zinc-800/80 rounded-2xl"></div>
              </div>
              <div className="h-4 w-1/2 bg-zinc-800/40 rounded-full"></div>
              <div className="h-14 w-44 bg-orange-500/10 border border-orange-500/20 rounded-full mt-6"></div>
            </div>
          </div>

          {/* Right: Two Side Banners Skeleton */}
          <div className="flex flex-col gap-6">
            {/* Top Small Banner */}
            <div className="h-[278px] rounded-[3rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden flex flex-col justify-end p-10 space-y-4">
              <Shimmer />
              <div className="h-3 w-20 bg-orange-500/20 rounded-full"></div>
              <div className="h-8 w-40 bg-zinc-800/80 rounded-xl"></div>
              <div className="h-3 w-28 bg-zinc-800/40 rounded-full"></div>
            </div>
            {/* Bottom Small Banner */}
            <div className="h-[278px] rounded-[3rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden flex flex-col justify-end p-10 space-y-4">
              <Shimmer />
              <div className="h-3 w-20 bg-orange-500/20 rounded-full"></div>
              <div className="h-8 w-40 bg-zinc-800/80 rounded-xl"></div>
              <div className="h-3 w-28 bg-zinc-800/40 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom: Brand/Marquee Section Skeleton */}
        <div className="relative border border-white/5 rounded-[2.5rem] py-12 bg-zinc-900/20 backdrop-blur-xl overflow-hidden">
          <Shimmer />
          <div className="flex justify-around items-center px-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-4 opacity-40">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl rotate-12"></div>
                <div className="h-2 w-20 bg-zinc-800 rounded-full hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeSkeleton;