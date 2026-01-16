"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Items", path: "/items" },
    { name: "Add Item", path: "/add-items" },
    { name: "You Added Items", path: "/you-added" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(249,115,22,0.15)]"
          : "bg-transparent"
      }`}
    >
      {/* --- TOP LAYER (অরিজিনাল ডিজাইন অক্ষুণ্ণ) --- */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative flex items-center gap-2"
            >
              <img
                src="/img/tech-gear-logo.png"
                alt="Logo"
                className="h-12 w-auto object-contain brightness-110"
              />
            </motion.div>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  // এখানে একটু 'px-4' বা 'px-5' বাড়িয়েছি যাতে ডটগুলো টেক্সটের গায়ে না লেগে থাকে
                  className="relative group py-2 px-5 flex items-center justify-center"
                >
                  <span
                    className={`text-[11px] uppercase tracking-[0.2em] font-black transition-colors duration-300 ${
                      isActive
                        ? "text-orange-500"
                        : "text-zinc-400 group-hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>

                  {isActive && (
                    <>
                      {/* ১. বাম পাশের ডট (Start) */}
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        // left-0 দিয়ে একদম শুরুতে রাখা হয়েছে
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316]"
                      />

                      {/* ২. ডান পাশের ডট (End) */}
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5, // অল্টারনেটিং জ্বলজ্বল ইফেক্টের জন্য ডিলে
                        }}
                        // right-0 দিয়ে একদম শেষে রাখা হয়েছে
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_#f97316]"
                      />
                    </>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-zinc-400 hover:text-orange-500 transition group">
              <ShoppingCart size={22} />
              <AnimatePresence>
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-4 h-4 bg-orange-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black"
                >
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </button>

            {status === "authenticated" ? (
              <div className="relative cursor-pointer">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1 pr-3 border border-white/10 rounded-full hover:border-orange-500 transition-all bg-white/5 cursor-pointer"
                >
                  <img
                    src={
                      session.user?.image ||
                      `https://ui-avatars.com/api/?name=${session.user?.name}`
                    }
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                    alt="User"
                  />
                  <ChevronDown
                    size={14}
                    className={`text-zinc-500 transition-transform ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl z-40"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-[10px] font-black text-orange-500 tracking-widest">
                          {session.user?.email || "No Email Provided"}
                        </p>
                        <p className="text-sm font-bold text-white truncate">
                          {session.user?.name}
                        </p>
                      </div>
                      <div className="py-2">
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                          <LayoutDashboard size={16} /> Dashboard
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                          <Settings size={16} /> Settings
                        </button>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-500/10 rounded-xl transition-all mt-1 cursor-pointer"
                      >
                        <LogOut size={16} /> Terminate Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/register" className="hidden md:block">
                <div className="px-5 py-2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all">
                  Register
                </div>
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM LAYER (ক্যাটাগরি ও অ্যানিমেটেড সার্চ) --- */}
      <div className="hidden md:block bg-white/[0.06] backdrop-blur-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 hover:text-orange-500 transition-colors uppercase tracking-widest group cursor-pointer"
              >
                <span className="text-zinc-500 group-hover:text-orange-500">
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* অ্যানিমেটেড সার্চ অপশন */}
          <div className="relative group flex items-center">
            <Search
              className="absolute left-3 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
              size={16}
            />
            <motion.input
              whileFocus={{ width: 550 }}
              transition={{ type: "spring", stiffness: 650, damping: 30 }}
              type="text"
              placeholder="Search gadgets..."
              className="w-[350px] bg-white/5 border border-white/60 rounded-full py-1.5 pl-10 pr-4 text-[11px] text-white focus:outline-none focus:border-orange-500/50 placeholder:text-zinc-600 shadow-2xl transition-colors"
            />
          </div>
        </div>
      </div>

      {/* --- আধুনিক মোবাইল মেনু --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[60] flex flex-col md:hidden"
          >
            {/* --- Header (Logo & Close) --- */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/50 backdrop-blur-sm">
              <img src="/img/logo.png" className="h-7 w-auto" alt="Logo" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-orange-500 transition-all border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* --- Main Navigation Links --- */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">
                  Main Menu
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      onClick={() => setIsOpen(false)}
                      href={link.path}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        pathname === link.path
                          ? "bg-orange-500/10 border-orange-500/50 text-orange-500"
                          : "bg-white/5 border-white/5 text-zinc-300"
                      }`}
                    >
                      <span className="text-sm font-bold uppercase tracking-widest">
                        {link.name}
                      </span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          pathname === link.path
                            ? "bg-orange-500"
                            : "bg-zinc-700"
                        }`}
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* --- Categories Grid (Quick Access) --- */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      className="flex flex-col items-start gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-orange-500/30 transition-all group"
                    >
                      <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </div>
                      <span className="text-xs font-bold text-zinc-400">
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Footer (Profile & Auth) --- */}
            <div className="p-6 bg-black/50 border-t border-white/5 backdrop-blur-xl">
              {session ? (
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        session.user?.image ||
                        `https://ui-avatars.com/api/?name=${session.user?.name}`
                      }
                      className="w-10 h-10 rounded-xl border border-white/10"
                      alt="User"
                    />
                    <div>
                      <p className="text-xs font-bold text-white truncate w-32">
                        {session.user?.name}
                      </p>
                      <p className="text-[9px] text-zinc-500 uppercase font-black">
                        Operator
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 transition-colors"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link
                  onClick={() => setIsOpen(false)}
                  href="/register"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-orange-500 text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(249,115,22,0.2)]"
                >
                  <User size={18} /> Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
