"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  RefreshCw,
  BadgePercent,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Hero = () => {
  const slides = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      title: "ULTIMATE PERFORMANCE",
      subtitle: "FUTURE OF TECH",
      desc: "Experience high-speed satellite internet anywhere in the world.",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=2070&auto=format&fit=crop",
      title: "REDEFINED INTELLIGENCE",
      subtitle: "IPHONE 16 PRO MAX",
      desc: "The most powerful iPhone ever with advanced AI capabilities and titanium finish.",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=2070&auto=format&fit=crop",
      title: "NEXT GEN PRECISION",
      subtitle: "WATCH ULTRA 2",
      desc: "Built for extreme endurance, precision, and the ultimate outdoor experience.",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2070&auto=format&fit=crop",
      title: "CINEMATIC VISION",
      subtitle: "GALAXY S25 ULTRA",
      desc: "Unleash your creativity with the most advanced 200MP camera system.",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2070&auto=format&fit=crop",
      title: "PURE SONIC POWER",
      subtitle: "AIRPODS MAX 2",
      desc: "Lossless audio and industry-leading noise cancellation for total immersion.",
    },
  ];

  const features = [
    {
      icon: <CreditCard size={20} className="text-cyan-400" />,
      text: "36 Months EMI",
    },
    {
      icon: <Truck size={20} className="text-cyan-400" />,
      text: "Fastest Home Delivery",
    },
    {
      icon: <RefreshCw size={20} className="text-cyan-400" />,
      text: "Exchange Facility",
    },
    {
      icon: <BadgePercent size={20} className="text-cyan-400" />,
      text: "Best Price Deals",
    },
    {
      icon: <Headphones size={20} className="text-cyan-400" />,
      text: "After Sell Service",
    },
  ];

  return (
    <section className="bg-black text-white pt-[120px] pb-10 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background Unique Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Big Slider - Fixed Overlap */}
          <div className="lg:col-span-2 rounded-[2rem] overflow-hidden relative h-[400px] md:h-[550px] border border-white/10 group bg-black">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }} // এটি স্লাইডগুলোকে ক্লিনলি ফেইড করবে
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              className="h-full w-full"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  {/* স্লাইডারের মেইন ডিভ-এ bg-black দেওয়া হয়েছে যাতে নিচের ইমেজ না দেখা যায় */}
                  <div className="relative w-full h-full bg-black">
                    <Image
                      src={slide.img}
                      alt={slide.title}
                      fill
                      priority
                      className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-[2s]"
                    />
                    {/* Overlay Gradient for Text Clarity */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <p className="text-xs tracking-[0.5em] text-cyan-400 font-bold mb-4 uppercase">
                          {slide.title}
                        </p>
                        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                          {slide.subtitle}
                        </h2>
                        <p className="text-sm md:text-lg text-zinc-400 max-w-md mx-auto mb-8 font-light">
                          {slide.desc}
                        </p>
                        <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 mx-auto group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                          Shop Now{" "}
                          <ArrowUpRight
                            size={18}
                            className="group-hover:rotate-45 transition-transform"
                          />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Side Banners */}
          <div className="flex flex-col gap-5">
            <motion.div
              whileHover={{ y: -5 }}
              className="h-1/2 rounded-[2rem] overflow-hidden relative border border-white/10 group bg-zinc-950 shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
                alt="Watch"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold">Watch OS 11</h3>
                <p className="text-sm text-cyan-400 font-medium">
                  Coming this Fall
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="h-1/2 rounded-[2rem] overflow-hidden relative border border-white/10 group bg-zinc-950 shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop"
                alt="Kitchen"
                fill
                className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold">Smart Home</h3>
                <p className="text-sm text-cyan-400 font-medium">
                  Control Everything
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee Section */}
        <div className="border border-white/5 rounded-2xl py-8 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2s]" />

          <Marquee speed={60} gradient={false} pauseOnHover={true}>
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-6 px-16 border-r border-white/10 last:border-none group/item"
              >
                <div className="p-3 bg-zinc-900 rounded-2xl group-hover/item:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <span className="text-[13px] font-bold tracking-widest uppercase text-zinc-400 group-hover/item:text-white transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Hero;
