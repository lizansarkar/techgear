"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Smartphone,
  Laptop,
  Watch,
  Headphones,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    { name: "iPhone", icon: <Smartphone size={16} /> },
    { name: "MacBook", icon: <Laptop size={16} /> },
    { name: "Watch", icon: <Watch size={16} /> },
    { name: "Audio", icon: <Headphones size={16} /> },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      {/* --- TOP LAYER --- */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center p-1"
            >
              {/* লোগোর পেছনে একটা হালকা গ্লো ইফেক্ট (ঐচ্ছিক, চাইলে রাখতে পারেন) */}
              <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="relative z-10 flex items-center gap-2 text-white font-bold text-xl tracking-tighter">
                <img
                  src="/img/logo.png"
                  alt="TechGear Logo"
                  className="h-18 w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
                />
                {/* যদি লোগোর পাশে টেক্সট রাখতে চান তবে নিচের লাইনটি থাকবে, নয়তো কেটে দিন */}
                {/* <span className="hidden md:block uppercase tracking-[0.2em] text-[14px]">TechGear</span> */}
              </span>
            </motion.div>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Items", "Add Item"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-cyan-400 ${
                  pathname ===
                  (item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`)
                    ? "text-cyan-400"
                    : "text-zinc-400"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition group">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
                0
              </span>
            </button>

            <Link href="/login" className="hidden md:block">
              <div className="p-2 border border-white/10 rounded-full text-zinc-400 hover:text-cyan-400 hover:border-cyan-400 transition">
                <User size={22} />
              </div>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM LAYER (Search & Categories) --- */}
      <div className="hidden md:block bg-white/[0.02] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-10">
          {/* Search Bar - Apple Gadgets Style */}
          <div className="flex-1 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search your next gadget..."
              className="w-full bg-zinc-900/50 border border-white/5 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Categories Links */}
          <div className="flex items-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-2 text-[13px] font-medium text-zinc-400 hover:text-white transition"
              >
                <span className="text-cyan-500/70">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 flex flex-col p-6 gap-6 md:hidden backdrop-blur-3xl"
        >
          {/* Mobile Search */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-12 text-white"
            />
          </div>
          <div className="flex flex-col gap-4">
            {["Home", "Items", "Add Item"].map((link) => (
              <Link key={link} href="/" className="text-lg text-zinc-400">
                {link}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
