"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe, Cpu, RotateCcw, Headset } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: <Cpu className="" size={32} />,
      title: "NEXT-GEN TECH",
      desc: "Get the latest flagship devices with cutting-edge processors and hardware.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="" size={32} />,
      title: "SECURE WARRANTY",
      desc: "Every product comes with a 100% official brand warranty and protection plan.",
    },
    {
      id: 3,
      icon: <Zap className="" size={32} />,
      title: "ULTRA FAST",
      desc: "Experience lightning-fast performance and same-day delivery across the city.",
    },
    {
      id: 4,
      icon: <Globe className="" size={32} />,
      title: "GLOBAL STANDARDS",
      desc: "We bring international variants and global tech standards right to your doorstep.",
    },
    {
      id: 5,
      icon: <RotateCcw className="" size={32} />,
      title: "EASY REPLACEMENT",
      desc: "Not satisfied? Our 7-day no-questions-asked replacement policy has you covered.",
    },
    {
      id: 6,
      icon: <Headset className="" size={32} />,
      title: "24/7 EXPERT CARE",
      desc: "Our tech experts are always available to help you set up and troubleshoot.",
    },
  ];

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-orange-500 font-black tracking-[0.4em] text-xs uppercase"
            >
              Why Choose Our Store
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
              WE DEFINE <br /> <span className="text-zinc-800">EXCELLENCE.</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-500 font-medium text-sm border-l border-zinc-800 pl-6">
            Providing more than just gadgets—we provide a premium ecosystem for tech enthusiasts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "#000" }}
              className="bg-black p-10 group transition-all duration-500 cursor-default"
            >
              <div className="space-y-6">
                {/* Icon with Glow */}
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-orange-500 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,1)]">
                  <div className="group-hover:text-white group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-black tracking-widest text-white uppercase group-hover:text-orange-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors italic">
                    {feature.desc}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="w-0 h-[2px] bg-orange-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Branding */}
        <div className="mt-20 pt-10 border-t border-zinc-900 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-2xl font-black text-white italic tracking-tighter underline decoration-orange-500">TRUSTED</span>
          <span className="text-2xl font-black text-white italic tracking-tighter underline decoration-orange-500">CERTIFIED</span>
          <span className="text-2xl font-black text-white italic tracking-tighter underline decoration-orange-500">AUTHENTIC</span>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;