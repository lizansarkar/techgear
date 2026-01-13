import React from 'react'

const ItemsDtailsSkeleton = () => {
  return (
    <div className="bg-black min-h-screen pt-[120px] pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-16 bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-zinc-800/50 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Image Gallery Skeleton */}
          <div className="space-y-6">
            {/* Main Big Image */}
            <div className="relative aspect-square bg-zinc-900 rounded-[2.5rem] border border-white/5 animate-pulse overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 animate-shimmer"></div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 px-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/5 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Right: Info Skeleton */}
          <div className="flex flex-col space-y-6">
            {/* Brand & Compare */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-24 bg-zinc-800 rounded animate-pulse"></div>
              <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse"></div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <div className="h-10 w-full bg-zinc-800 rounded-xl animate-pulse"></div>
              <div className="h-10 w-2/3 bg-zinc-800 rounded-xl animate-pulse"></div>
            </div>

            {/* Price Card */}
            <div className="h-24 w-full bg-zinc-900/50 border border-white/5 rounded-[2rem] animate-pulse"></div>

            {/* Options Grid (Color & Storage) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] animate-pulse"></div>
              <div className="h-32 bg-zinc-900/40 border border-white/5 rounded-[1.5rem] animate-pulse"></div>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="mt-auto space-y-6">
              <div className="h-8 w-40 bg-zinc-800 rounded animate-pulse"></div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-[2] h-16 bg-zinc-800 rounded-[2rem] animate-pulse"></div>
                <div className="flex-1 h-16 bg-zinc-900 border border-white/5 rounded-[2rem] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemsDtailsSkeleton