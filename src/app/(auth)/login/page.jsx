"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Chrome, LogIn, Eye, EyeOff, Sparkle } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-40 relative overflow-hidden">
      
      {/* --- ব্যাকগ্রাউন্ড ডেকোরেশন (Futuristic Grid) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" 
        />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* --- হেডার সেকশন --- */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6"
          >
            <Sparkle size={12} fill="currentColor" /> Authorized Personnel Only
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl font-black text-white tracking-tighter uppercase italic"
          >
            ACCESS <span className="text-orange-500 not-italic">VAULT.</span>
          </motion.h1>
          <p className="text-zinc-500 text-sm mt-3 font-medium tracking-wide">Enter your digital signature to proceed.</p>
        </div>

        {/* --- লগইন কার্ড --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative"
        >
          {/* টপ গ্লো বার */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-all font-medium placeholder:text-zinc-800"
                  placeholder="name@nexus.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Access Key</label>
                <a href="#" className="text-[9px] font-bold text-orange-500 hover:text-white uppercase transition-colors cursor-pointer">Forgot Key?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-orange-500/50 transition-all font-medium placeholder:text-zinc-800"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-orange-500 transition-colors cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-orange-500/20 mt-4 cursor-pointer"
            >
              AUTHENTICATE <LogIn size={20} />
            </motion.button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#131315] px-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Quick Scan</span>
          </div>

          {/* Google Login */}
          <button className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <Chrome size={20} /> GOOGLE
          </button>

          <p className="text-center mt-8 text-zinc-500 text-xs font-medium">
            New to the network? 
            <Link href="/register" className="ml-2 text-orange-500 font-black hover:underline uppercase tracking-tighter cursor-pointer">
              Initialize Account
            </Link>
          </p>
        </motion.div>

        {/* --- ফুটনোট --- */}
        <p className="text-center mt-10 text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] opacity-50">
          Encrypted Connection &bull; AES-256 Bit Security
        </p>
      </div>
    </section>
  );
};

export default LoginPage;