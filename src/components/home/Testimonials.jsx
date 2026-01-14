"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  { id: 1, name: "Alex Rivera", role: "Tech Enthusiast", review: "The iPhone 16 Pro I bought from here is amazing. The service was lightning fast and the packaging was super premium.", rating: 5, img: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sarah Jenkins", role: "Digital Creator", review: "Finally found a reliable store that delivers authentic global variants. Highly recommended for creators!", rating: 5, img: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "David Chen", role: "Software Engineer", review: "Best price in the market for genuine products. Their customer support helped me choose the right MacBook.", rating: 4, img: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Emily Watson", role: "Photographer", review: "The delivery was surprisingly fast. I received my Sony A7R V within 24 hours. Truly world-class experience.", rating: 5, img: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Michael Ross", role: "Business Analyst", review: "Seamless transaction and genuine warranty. This is my go-to shop for all office tech needs.", rating: 5, img: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Jessica Alba", role: "UI Designer", review: "The minimalist aesthetics of their store and the quality of the Apple products are unmatched.", rating: 5, img: "https://i.pravatar.cc/150?u=6" },
  { id: 7, name: "Rahat Karim", role: "Gamer", review: "Got my PS5 from here. Authentic product and the staff were very knowledgeable about the specs.", rating: 4, img: "https://i.pravatar.cc/150?u=7" },
];

const Testimonials = () => {
  return (
    <section className="bg-black py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-20 space-y-4 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase"
          >
            Client Experiences
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase">
            OUR <span className="text-zinc-800 italic">COMMUNITY.</span>
          </h2>
        </div>

        {/* Testimonials Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          // পপ-আপ আইকন যাতে না কাটে সেজন্য স্লাইডারে প্যাডিং দেওয়া হয়েছে
          className="testimonial-swiper !pb-20 !pt-10" 
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <div className="group relative h-full bg-zinc-900/20 border border-white/5 p-8 md:p-10 rounded-[2rem] hover:bg-zinc-900/40 transition-all duration-500">
                
                {/* Floating Quote Icon - Fixed Positioning */}
                <div className="absolute -top-5 right-8 w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl shadow-orange-500/20 z-30">
                  <Quote size={20} fill="currentColor" />
                </div>

                <div className="space-y-6">
                  {/* Stars and Verified Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < item.rating ? "#f97316" : "transparent"} 
                          className={i < item.rating ? "text-orange-500" : "text-zinc-700"} 
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                      <CheckCircle2 size={12} className="text-orange-500" /> Verified
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed italic">
                    "{item.review}"
                  </p>

                  {/* Profile Section */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/5 mt-auto">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 shrink-0">
                      <img src={item.img} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-black uppercase tracking-wider text-xs truncate">
                        {item.name}
                      </h4>
                      <p className="text-orange-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #27272a;
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #f97316 !important;
          width: 35px;
          border-radius: 4px;
        }
        /* স্লাইডারের কন্টেইনার যাতে আইকন না কাটে */
        .swiper {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;