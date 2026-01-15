"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import CategorySliderSkeleton from "@/components/skeletons/CategorySliderSkeleton";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const CategorySlider = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 1, name: "iPhone", img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=500" },
    { id: 2, name: "Watch", img: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=500" },
    { id: 3, name: "AirPods", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500" },
    { id: 4, name: "iPad", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500" },
    { id: 5, name: "MacBook", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500" },
    { id: 6, name: "Vision Pro", img: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=500" },
    { id: 7, name: "Console", img: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=500" },
    { id: 8, name: "Cameras", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500" },
  ];

  if (loading) return <CategorySliderSkeleton />;

  return (
    <section className="bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 6, spaceBetween: 40 },
          }}
          className="category-swiper"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="flex flex-col items-center gap-5 group cursor-pointer py-4"
              >
                {/* Circular Icon Container */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-900 border-2 border-white/5 group-hover:border-orange-500 transition-all duration-500 overflow-hidden shadow-2xl">
                  {/* Image with object-cover to fill the circle */}
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-125 transition-transform duration-700 grayscale-[0.5] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  {/* Subtle Inner Overlay for Premium Look */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:to-transparent transition-all" />
                </div>

                {/* Category Name */}
                <div className="text-center">
                  <span className="text-xs md:text-sm font-black tracking-widest uppercase text-zinc-500 group-hover:text-orange-500 transition-colors duration-300">
                    {cat.name}
                  </span>
                  {/* Active Indicator Line */}
                  <motion.div 
                    className="h-[2px] w-0 bg-orange-500 mx-auto mt-1 group-hover:w-full transition-all duration-300" 
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          color: #f97316;
          transform: scale(0.5);
          background: rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .category-swiper .swiper-button-next:hover,
        .category-swiper .swiper-button-prev:hover {
          background: #f97316;
          color: white;
        }
      `}</style>
    </section>
  );
};

export default CategorySlider;