"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Eye,
  Star,
  ArrowUpRight,
  Zap,
  X,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ItemsSkeleton from "@/components/skeletons/ItemsSkeleton";

const ItemsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("default");
  const [loading, setLoading] = useState(true);

  // --- ডাটাবেস থেকে সর্ট অনুযায়ী ডেটা ফেচ করা ---
  useEffect(() => {
    const fetchItems = async () => {
      // সর্টিং চেঞ্জ হওয়ার সাথে সাথে লোডিং ট্রু হবে যাতে স্কেলিটন দেখা যায়
      setLoading(true); 
      try {
        const response = await fetch(`/api/items?sort=${filter}&limit=100`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [filter]);

  const displayProducts = products.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-6 relative overflow-hidden font-sans">
      {/* Background Glows (অপরিবর্তিত) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Filter (অপরিবর্তিত) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-orange-500 font-black text-[10px] uppercase tracking-[0.5em]">
              Inventory v2.0
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2">
              TECH <span className="text-zinc-800 italic">VAULT.</span>
            </h1>
          </div>

          <div className="relative inline-block">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-zinc-900 border border-white/10 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-orange-500/50 transition-all cursor-pointer outline-none"
            >
              <option value="default">Sort: Recommended</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" size={14} />
          </div>
        </div>

        {/* Product Grid - Skeleton logic এখানে ইমপ্লিমেন্ট করা হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // সর্টিং বা লোডিং এর সময় ৮টি স্কেলিটন দেখাবে
            Array.from({ length: 8 }).map((_, i) => (
              <ItemsSkeleton key={i} />
            ))
          ) : (
            displayProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 8) * 0.05 }}
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer"
              >
                <div className="relative bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2rem] p-4 transition-all duration-500 group-hover:border-orange-500/30">
                  <div className="relative h-48 w-full rounded-[1.5rem] overflow-hidden bg-black/50">
                    <motion.img
                      animate={{ scale: hoveredId === product._id ? 1.1 : 1 }}
                      src={product.image}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100"
                    />

                    <AnimatePresence>
                      {hoveredId === product._id && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3">
                          <button onClick={() => setSelectedProduct(product)} className="p-3 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-colors cursor-pointer shadow-lg">
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => router.push(`/items/${product._id}`)}
                            className="p-3 bg-zinc-800 text-white rounded-full hover:bg-orange-500 transition-colors cursor-pointer shadow-lg"
                          >
                            <ShoppingCart size={18} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-black uppercase tracking-tight truncate w-32">{product.name}</h3>
                      <span className="text-[10px] font-bold text-orange-500 px-2 py-0.5 bg-orange-500/10 rounded-full">{product.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      <Zap size={12} className="text-orange-500" /> {product.specs}
                    </div>
                    <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-black text-white">${product.price}</span>
                        <div className="flex items-center gap-1 text-orange-500">
                          <Star size={12} fill="currentColor" />
                          <span className="text-[10px] font-bold">{product.rating}</span>
                        </div>
                      </div>
                      <Link href={`/items/${product._id}`} className="w-full">
                        <button className="w-full bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 cursor-pointer group/btn">
                          SHOP NOW <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {!loading && products.length > visibleCount && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={loadMore}
              className="px-12 py-4 bg-zinc-900 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
            >
              Load More Gadgets
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal (অপরিবর্তিত) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProduct(null)} className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-orange-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
              <div className="w-full md:w-1/2 h-80 md:h-auto bg-black">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">{selectedProduct.category}</span>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mt-2 leading-none">{selectedProduct.name}</h2>
                </div>
                <div className="flex items-center gap-4 py-4 border-y border-white/5">
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={16} fill="currentColor" /> <span className="text-sm font-black">{selectedProduct.rating}</span>
                  </div>
                  <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">In Stock • Fast Shipping</div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Experience next-level performance with the {selectedProduct.name}. Designed for elite enthusiasts who demand the best in {selectedProduct.category.toLowerCase()} technology.
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-4xl font-black">${selectedProduct.price}</span>
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