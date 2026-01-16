"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Github,
  Send,
  Apple,
  Play,
  ShieldCheck,
  Globe,
  Zap,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] text-white pt-24 pb-8 overflow-hidden border-t border-white/5">
      {/* Background Decorative Element - এখন কমলা গ্রেডিয়েন্ট */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* TOP SECTION: Branding & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20">
          <div className="space-y-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center p-1"
              >
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <img
                    src="/img/tech-gear-logo.png"
                    alt="TechGear Logo"
                    className="h-16 w-auto object-contain brightness-110 group-hover:brightness-125 transition-all duration-300"
                  />
                </span>
              </motion.div>
            </Link>
            <p className="text-zinc-500 max-w-sm text-lg leading-relaxed">
              Redefining the <span className="text-zinc-300">digital frontier</span> with gadgets that inspire and empower.
            </p>
          </div>

          {/* Newsletter Box - অরেঞ্জ থিম টাচ */}
          <div className="w-full lg:w-auto">
            <div className="relative group min-w-[300px] md:min-w-[450px]">
              <input
                type="email"
                placeholder="Join the elite newsletter..."
                className="w-full bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-black p-3 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] active:scale-95">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 font-medium">
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Products
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="/items" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1 group">
                 <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300"></span> iPhones
              </Link>
              <Link href="/items" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1 group">
                 <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300"></span> MacBooks
              </Link>
              <Link href="/items" className="hover:text-orange-400 transition-colors inline-flex items-center gap-1 group">
                 <span className="w-0 group-hover:w-2 h-px bg-orange-500 transition-all duration-300"></span> Audio Gear
              </Link>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="#" className="hover:text-orange-400 transition-colors">Our Story</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">Global Stores</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">Careers</Link>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">
              Support
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="#" className="hover:text-orange-400 transition-colors">Warranty</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">Refunds</Link>
              <Link href="#" className="hover:text-orange-400 transition-colors">Help Center</Link>
            </ul>
          </div>

          {/* Apps & Socials */}
          <div className="space-y-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                Get the App
              </h4>
              <div className="flex gap-3">
                <motion.div whileHover={{ y: -3 }} className="p-3 bg-zinc-900/50 rounded-xl hover:bg-orange-500/10 cursor-pointer border border-white/5 hover:border-orange-500/30 transition">
                  <Apple size={22} className="text-zinc-300 hover:text-orange-500 transition-colors" />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="p-3 bg-zinc-900/50 rounded-xl hover:bg-orange-500/10 cursor-pointer border border-white/5 hover:border-orange-500/30 transition">
                  <Play size={20} className="text-zinc-300 hover:text-orange-500 transition-colors" />
                </motion.div>
              </div>
            </div>
            <div className="flex gap-4">
              {[
                { icon: <Linkedin size={20} />, href: "#" },
                { icon: <Github size={20} />, href: "#" },
                { icon: <Globe size={20} />, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={social.href}
                  className="text-zinc-500 hover:text-orange-500 transition-colors bg-zinc-900/30 p-2 rounded-lg border border-white/5"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Legal */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-sm font-medium">
              © {currentYear} <span className="text-zinc-400">TechGear</span>. All Rights Reserved.
            </p>
            <div className="hidden md:flex items-center gap-2 text-zinc-600 text-xs bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <ShieldCheck size={14} className="text-orange-500" />
              <span>Encrypted & Secure</span>
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Terms</span>
            <span className="text-orange-500/60 flex items-center gap-1">
              <Zap size={10} className="fill-current" /> Powered by @lizansarkar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;