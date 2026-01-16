"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Scale,
  Share2,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ItemsDtailsSkeleton from "@/components/skeletons/ItemsDtailsSkeleton";
import { useParams } from "next/navigation"; // আইডি ধরার জন্য

const ItemsDtails = () => {
  const { id } = useParams(); // URL থেকে আইডি নেওয়া হচ্ছে
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  // Magnifying Zoom State
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const imgRef = useRef(null);

  // ব্যাকএন্ড থেকে ডাটা ফেচ করা
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/items/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setProduct(data);
          // ডিফল্ট ভ্যালু সেট করা
          if (data.colors?.length > 0) setSelectedColor(data.colors[0].name);
          if (data.storage?.length > 0) setSelectedStorage(data.storage[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Zoom Logic
  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  if (loading) return <ItemsDtailsSkeleton />;
  if (!product) return <div className="text-white text-center py-20">Product not found!</div>;

  // ইমেজ হ্যান্ডলিং (যদি অ্যারে না থাকে তবে সিঙ্গেল ইমেজকে অ্যারে বানিয়ে নেওয়া)
  const productImages = Array.isArray(product.images) ? product.images : [product.image];

  return (
    <main className="bg-black text-white min-h-screen pt-[140px] pb-20 selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8 overflow-hidden">
          <span className="hover:text-white cursor-pointer transition-colors">
            Home
          </span>
          <ChevronRight size={14} />
          <span className="hover:text-white cursor-pointer transition-colors">
            {product.category || "Gadgets"}
          </span>
          <ChevronRight size={14} />
          <span className="text-cyan-500 font-medium">{product.brand}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery & Zoom */}
          <div className="space-y-6">
            <div
              className="relative aspect-square bg-zinc-900/50 rounded-[2.5rem] overflow-hidden border border-white/10 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
              ref={imgRef}
            >
              <Image
                src={productImages[selectedImg]}
                alt={product.name}
                fill
                className={`object-contain p-10 transition-opacity duration-300 ${
                  zoomPos.show ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Magnifying Lens Effect */}
              {zoomPos.show && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url(${productImages[selectedImg]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: "250%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              )}

              {/* Floating Action Buttons */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-orange-500 transition-all cursor-pointer group">
                  <Heart size={20} className="group-hover:fill-white" />
                </button>
                <button className="p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 hover:bg-orange-500 transition-all cursor-pointer">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 px-2">
              {productImages.map((img, idx) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImg === idx
                      ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      : "border-white/5 bg-zinc-900"
                  }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    fill
                    className="object-cover opacity-80 hover:opacity-100"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className="text-cyan-500 font-black tracking-widest text-xl italic">
                {product.brand}
              </span>
              <button className="flex items-center gap-2 text-sm text-cyan-500 font-bold hover:text-cyan-400 transition-colors cursor-pointer">
                <Scale size={18} /> Add to Compare
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 bg-zinc-900/50 border border-white/5 p-5 rounded-[2rem] w-fit">
              <span className="text-4xl font-black text-white">
                ৳{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-zinc-500 line-through">
                  ৳{product.oldPrice}
                </span>
              )}
              <div className="hidden md:block h-8 w-[1px] bg-white/10 mx-2" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
                  {product.stock || "In Stock"}
                </span>
                <span className="text-xs text-zinc-500">
                  Code: {product.code || product._id.slice(-6).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4">
                  <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs">
                    Select Color
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? "border-cyan-500 bg-cyan-500/10 text-white"
                            : "border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/30"
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.storage && product.storage.length > 0 && (
                <div className="space-y-4">
                  <p className="font-bold text-zinc-400 uppercase tracking-widest text-xs">
                    Select Storage
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {product.storage.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedStorage(size)}
                        className={`px-4 py-2 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                          selectedStorage === size
                            ? "border-cyan-500 bg-cyan-500/10 text-white"
                            : "border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/30"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-8">
              <div className="flex items-center gap-6">
                <p className="font-bold text-zinc-400 text-sm">QUANTITY</p>
                <div className="flex items-center bg-zinc-900 border border-white/10 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-[2rem] font-bold text-xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all cursor-pointer"
                >
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-2 border-white/10 hover:border-orange-500 hover:text-orange-500 py-5 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 transition-all cursor-pointer group"
                >
                  <ShoppingCart
                    size={24}
                    className="group-hover:animate-bounce"
                  />{" "}
                  Add To Cart
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ItemsDtails;