"use client";
import React, { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import PromoBanner from "@/components/home/PromoBanner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import CategorySlider from "@/components/home/CategorySlider";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <HomeSkeleton />;

  return (
    <div className="bg-black overflow-hidden">
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: New Arrivals (Swiper/Slider use kora jabe) */}
      <NewArrivals />

      {/* Section 3: Categories */}
      <CategorySlider />

      {/* Section 4: Promo Banner (Apple style glassmorphism) */}
      <PromoBanner />

      {/* Section 5: Why Choose Us */}
      <WhyChooseUs />

      {/* Section 6: Testimonials (Marquee use kora jabe) */}
      <Testimonials />

      {/* Section 7: FAQ */}
      <FAQ />
    </div>
  );
}
