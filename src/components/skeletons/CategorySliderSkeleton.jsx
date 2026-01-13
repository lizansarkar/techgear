import React from 'react';

const CategorySliderSkeleton = () => {
  return (
    <div className="bg-black py-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex gap-8 justify-center">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-zinc-900 rounded-full border border-white/5"></div>
            <div className="h-3 w-16 bg-zinc-800 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySliderSkeleton;