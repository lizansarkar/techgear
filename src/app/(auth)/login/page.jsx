"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Chrome, LogIn, Eye, EyeOff, Sparkle, Loader2, UserCheck } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // --- ইনপুট হ্যান্ডলার ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "lizan@gmail.com", // আপনার ডাটাবেসের ডাটা অনুযায়ী
      password: "123456Aa", // আপনার পাসওয়ার্ডটি এখানে বসান
    });
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: 'Demo Credentials Applied! Successfully',
      showConfirmButton: false,
      timer: 1500,
      background: "#18181b",
      color: "#fff"
    });
  };

  // --- রিয়েল লগইন হ্যান্ডলার ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.ok) {
        Swal.fire({
          icon: "success",
          title: "Access Granted!",
          text: "Welcome back to the Vault.",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
        router.push("/");
        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Invalid email or access key!",
          background: "#18181b",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-40 relative overflow-hidden">
      
      {/* Background Decorations (আগের মতই থাকবে) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            <Sparkle size={12} fill="currentColor" /> Authorized Personnel Only
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic">ACCESS <span className="text-orange-500 not-italic">VAULT.</span></h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-zinc-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          
          {/* --- DEMO LOGIN BUTTON (Special feature for Engineers) --- */}
          <button 
            type="button"
            onClick={handleDemoLogin}
            className="w-full mb-6 bg-zinc-800/50 border border-zinc-700 hover:border-orange-500/50 py-3 rounded-xl flex items-center justify-center gap-3 transition-all group"
          >
            <UserCheck className="text-orange-500 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">Load Demo Credentials</span>
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#131315] px-4 text-[8px] font-black text-zinc-700 uppercase tracking-widest">OR USE YOURS</span>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500" size={18} />
                <input name="email" required value={formData.email} onChange={handleChange} type="email" className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-orange-500/50 transition-all text-sm outline-none" placeholder="name@nexus.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500" size={18} />
                <input name="password" required value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-white focus:border-orange-500/50 transition-all text-sm outline-none" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-orange-500 transition-colors cursor-pointer p-1">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-orange-500/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>AUTHENTICATE <LogIn size={20} /></>}
            </motion.button>
          </form>

          <p className="text-center mt-8 text-zinc-500 text-[10px] font-medium italic">
            Need access? <Link href="/register" className="ml-2 text-orange-500 font-black hover:underline uppercase">Initialize Account</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoginPage;