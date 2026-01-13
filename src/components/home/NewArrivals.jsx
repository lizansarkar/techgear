"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart, Eye, Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import NewArrivalsSkeleton from "@/components/skeletons/NewArrivalsSkeleton";

const NewArrivals = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    { 
      id: 1, 
      name: "iPhone 16 Pro Max", 
      price: "165,000", 
      img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000", 
      tag: "Limited" 
    },
    { 
      id: 2, 
      name: "Watch Ultra 2 Titanium", 
      price: "95,000", 
      img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000", 
      tag: "Trending" 
    },
    { 
      id: 3, 
      name: "AirPods Max - Space Gray", 
      price: "62,000", 
      img: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000", 
      tag: "New" 
    },
    { 
      id: 4, 
      name: "Vision Pro Simulator", 
      price: "345,000", 
      img: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=1000", 
      tag: "Exclusive" 
    },
  ];

  if (loading) return <NewArrivalsSkeleton />;

  return (
    <section className="bg-black text-white py-20 px-4 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Unique & Bold Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500 font-black tracking-[0.3em] text-xs uppercase">
              <Sparkles size={14} /> 
              <span>Next Generation Tech</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              New <span className="text-zinc-700 italic">Arrivals</span>
            </h2>
          </div>
          
          <button className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 cursor-pointer font-bold text-sm">
            EXPLORE ALL <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              key={item.id}
              className="group relative bg-zinc-900/30 border border-white/5 rounded-[3rem] p-4 hover:bg-zinc-900/60 transition-all duration-700 cursor-default"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative h-72 w-full rounded-[2.5rem] overflow-hidden mb-6 bg-zinc-900/50 flex items-center justify-center">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100" 
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                  <button className="p-4 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-all cursor-pointer transform -translate-y-4 group-hover:translate-y-0 duration-500 shadow-2xl">
                    <Eye size={20} />
                  </button>
                  <button className="p-4 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-all cursor-pointer transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-2xl">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Tag */}
                <span className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-4 py-1.5 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Details Section */}
              <div className="px-4 pb-4 space-y-4">
                <div className="min-h-[50px]">
                  <h3 className="text-xl font-bold text-zinc-200 line-clamp-1 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-medium">Premium Tech Gadget</p>
                </div>
                
                <div className="flex justify-between items-center bg-black/40 p-2 pl-4 rounded-2xl border border-white/5">
                  <span className="text-xl font-black tracking-tighter">৳{item.price}</span>
                  <button className="p-4 bg-orange-500 rounded-xl hover:bg-orange-600 transition-all cursor-pointer group/btn active:scale-90 shadow-lg shadow-orange-500/20">
                    <ShoppingCart size={18} className="group-hover:animate-bounce" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;