"use client";
import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PromoBanner = () => {
  return (
    // min-h-screen ব্যবহারের ফলে এটি পুরো ডিসপ্লে জুড়ে থাকবে
    <section className="relative w-full min-h-screen overflow-hidden bg-black flex items-center py-20">
      
      {/* --- Full-Display Background Video --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-all duration-1000" 
        >
          <source src="/videos/promo-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Balanced Overlay: বাম এবং ডান দিকে সমান হালকা অন্ধকার শেড */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Side Vertical Title */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            <span className="[writing-mode:vertical-lr] rotate-180 text-[11px] font-black tracking-[0.6em] text-orange-500 uppercase opacity-80">
              Future Edition // 2026
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-orange-500 to-transparent" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative Stroke Text - এটাকে আরও স্বচ্ছ করা হয়েছে */}
              <span className="absolute -top-20 left-0 text-[140px] font-black text-white/[0.05] select-none hidden md:block tracking-tighter">
                PREMIUM
              </span>

              <h2 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] text-white uppercase relative z-10 drop-shadow-2xl">
                THE FUTURE <br />
                <span className="text-orange-500 italic">
                  IN MOTION.
                </span>
              </h2>
            </motion.div>

            <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <p className="text-zinc-100 text-lg md:text-xl font-medium leading-snug drop-shadow-lg">
                We are redefining the boundaries of technology. Experience raw performance wrapped in titanium.
              </p>
              
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 backdrop-blur-xl border border-orange-500/30 flex items-center justify-center">
                    <Zap size={20} className="text-orange-500" fill="currentColor" />
                  </div>
                  <span className="text-sm font-black text-white tracking-widest uppercase italic">High-Speed Tech</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                    <Zap size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-black text-zinc-300 tracking-widest uppercase italic">Limitless Power</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-10 pt-6">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                className="w-full md:w-auto px-14 py-6 bg-orange-500 text-white rounded-full font-black text-xl flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_0_40px_rgba(249,115,22,0.4)] cursor-pointer"
              >
                SECURE ACCESS <ArrowRight size={24} />
              </motion.button>
              
              <div className="flex flex-col gap-2">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-orange-500 bg-zinc-800 overflow-hidden shadow-lg">
                      <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
                   Joined by 2k+ Tech Enthusiasts
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;