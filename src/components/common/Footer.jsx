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
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* TOP SECTION: Branding & Big Call to Action */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20">
          <div className="space-y-4">
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
            <p className="text-zinc-500 max-w-sm text-lg">
              Redefining the digital frontier with gadgets that inspire.
            </p>
          </div>

          {/* Styled Search/Newsletter Box from your reference */}
          <div className="w-full lg:w-auto">
            <div className="relative group min-w-[300px] md:min-w-[450px]">
              <input
                type="email"
                placeholder="Join the newsletter..."
                className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl py-5 pl-6 pr-16 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-xl transition-all shadow-lg active:scale-95">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
              Products
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="/items" className="hover:text-white transition">
                iPhones
              </Link>
              <Link href="/items" className="hover:text-white transition">
                MacBooks
              </Link>
              <Link href="/items" className="hover:text-white transition">
                Accessories
              </Link>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
              Company
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="#" className="hover:text-white transition">
                Our Story
              </Link>
              <Link href="#" className="hover:text-white transition">
                Global Stores
              </Link>
              <Link href="#" className="hover:text-white transition">
                Contact
              </Link>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-500">
              Support
            </h4>
            <ul className="flex flex-col gap-4 text-zinc-400">
              <Link href="#" className="hover:text-white transition">
                Warranty
              </Link>
              <Link href="#" className="hover:text-white transition">
                Refunds
              </Link>
              <Link href="#" className="hover:text-white transition">
                FAQ
              </Link>
            </ul>
          </div>

          {/* Professional Credentials & Apps */}
          <div className="space-y-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500">
                Get the App
              </h4>
              <div className="flex gap-3">
                <div className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 cursor-pointer border border-white/5 transition">
                  <Apple size={22} className="text-zinc-300" />
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 cursor-pointer border border-white/5 transition">
                  <Play size={20} className="text-zinc-300" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -5 }}
                href="https://linkedin.com"
                className="text-zinc-500 hover:text-cyan-400 transition"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href="https://github.com"
                className="text-zinc-500 hover:text-white transition"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                href="#"
                className="text-zinc-500 hover:text-cyan-400 transition"
              >
                <Globe size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Trust & Legal */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-zinc-600 text-sm">
              © {currentYear} TechGear. All Rights Reserved.
            </p>
            <div className="hidden md:flex items-center gap-2 text-zinc-600 text-xs">
              <ShieldCheck size={14} className="text-cyan-500/50" />
              <span>Encrypted & Secure</span>
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span className="hover:text-zinc-400 cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-zinc-400 cursor-pointer transition">
              Terms
            </span>
            <span className="text-cyan-500/50">Assignment 9 • SCIC-12</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
