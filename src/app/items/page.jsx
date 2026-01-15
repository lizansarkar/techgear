"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Eye,
  Star,
  Filter,
  ArrowUpRight,
  Zap,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

// --- ৮টি টেক প্রোডাক্টের ডেটা ---
const initialProducts = [
  {
    id: 1,
    name: "CyberPulse Headset",
    category: "Audio",
    price: 299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500",
    specs: "7.1 Surround Sound",
  },
  {
    id: 2,
    name: "NanoTech Mouse",
    category: "Accessories",
    price: 89,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500",
    specs: "25k DPI Sensor",
  },
  {
    id: 3,
    name: "Titan Mechanical Keyboard",
    category: "Accessories",
    price: 159,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500",
    specs: "RGB Hot-swappable",
  },
  {
    id: 4,
    name: "UltraView Monitor",
    category: "Display",
    price: 549,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500",
    specs: "4K 144Hz IPS",
  },
  {
    id: 5,
    name: "Sonic Pro Earbuds",
    category: "Audio",
    price: 199,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500",
    specs: "Active Noise Cancel",
  },
  {
    id: 6,
    name: "GigaDrive SSD",
    category: "Storage",
    price: 129,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=500",
    specs: "7000MB/s Read",
  },
  {
    id: 7,
    name: "Z-Series Camera",
    category: "Media",
    price: 1200,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500",
    specs: "8K Video Capture",
  },
  {
    id: 8,
    name: "Flux Graphics Card",
    category: "Hardware",
    price: 899,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=500",
    specs: "Ray Tracing Ready",
  },
];

const ItemsPage = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("default");

  // --- ফিল্টারিং লজিক ---
  const filteredProducts = useMemo(() => {
    let sorted = [...initialProducts];
    if (filter === "lowToHigh") sorted.sort((a, b) => a.price - b.price);
    if (filter === "highToLow") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filter]);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange-500 font-black text-[10px] uppercase tracking-[0.5em]"
            >
              Inventory v2.0
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2">
              TECH <span className="text-zinc-800 italic">VAULT.</span>
            </h1>
          </div>

          <div className="relative inline-block">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-zinc-900 border border-white/10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-orange-500/50 transition-all cursor-pointer outline-none"
            >
              <option value="default">Sort: Recommended</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
              size={14}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              <div className="relative bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-4 transition-all duration-500 group-hover:border-orange-500/30">
                {/* Image Wrapper */}
                <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden bg-black/50">
                  <motion.img
                    animate={{ scale: hoveredId === product.id ? 1.1 : 1 }}
                    src={product.image}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100"
                  />

                  {/* Action Overlay */}
                  <AnimatePresence>
                    {hoveredId === product.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
                      >
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-3 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-colors cursor-pointer shadow-lg"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-3 bg-zinc-800 text-white rounded-full hover:bg-orange-500 transition-colors cursor-pointer shadow-lg">
                          <ShoppingCart size={18} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info */}
                <div className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-tight truncate w-32">
                      {product.name}
                    </h3>
                    <span className="text-[10px] font-bold text-orange-500 px-2 py-0.5 bg-orange-500/10 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    <Zap size={12} className="text-orange-500" />{" "}
                    {product.specs}
                  </div>

                  {/* Price and Shop Now Button */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white">
                        ${product.price}
                      </span>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Shop Now Action */}
                    <Link href={`/items/${product.id}`} className="w-full">
                      <button className="w-full bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 cursor-pointer group/btn">
                        SHOP NOW
                        <ArrowUpRight
                          size={14}
                          className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                        />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- QUICK VIEW MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-orange-500 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-80 md:h-auto bg-black">
                <img
                  src={selectedProduct.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mt-2 leading-none">
                    {selectedProduct.name}
                  </h2>
                </div>

                <div className="flex items-center gap-4 py-4 border-y border-white/5">
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={16} fill="currentColor" />{" "}
                    <span className="text-sm font-black">
                      {selectedProduct.rating}
                    </span>
                  </div>
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    In Stock • Fast Shipping
                  </div>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  Experience next-level performance with the{" "}
                  {selectedProduct.name}. Designed for elite enthusiasts who
                  demand the best in {selectedProduct.category.toLowerCase()}{" "}
                  technology.
                </p>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-4xl font-black">
                    ${selectedProduct.price}
                  </span>
                  <button className="bg-orange-500 hover:bg-white hover:text-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-3">
                    ADD TO CART <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemsPage;
