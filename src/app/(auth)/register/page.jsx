"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Chrome, ShieldCheck, Zap, Eye, EyeOff, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // SweetAlert2 ইম্পোর্ট

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- ফর্ম স্টেট ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: "", // নতুন ইমেজ ফিল্ড
  });

  // --- ইনপুট হ্যান্ডলার ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- রেজিস্ট্রেশন হ্যান্ডলার ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* // --- কাস্টম ভ্যালিডেশন (প্রয়োজনে কমেন্ট আউট করুন) ---
    if (formData.password.length < 6) {
      return Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password must be at least 6 characters!' });
    }
    if (!formData.image.includes('http')) {
      return Swal.fire({ icon: 'warning', title: 'Image URL', text: 'Please provide a valid image link!' });
    }
    */

    setLoading(true);

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // --- সফল হলে SweetAlert2 এলার্ট ---
        Swal.fire({
          title: "Legacy Started!",
          text: "Your account has been created successfully.",
          icon: "success",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
        
        router.push("/login");
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorData.message || "Something went wrong!",
          background: "#18181b",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-20 relative overflow-hidden font-sans">
      
      {/* --- ব্যাকগ্রাউন্ড (অক্ষুণ্ণ) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f9731608,transparent_50%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16">
        
        {/* --- বাম পাশ (ব্র্যান্ডিং) --- */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase">
              Join the Elite
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mt-6 uppercase">
              START YOUR <br /> <span className="text-zinc-800 italic">LEGACY.</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-md mt-6 font-medium">
              Create an account to access premium tech drops and personalized experiences.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale">
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-xs"><ShieldCheck className="text-orange-500" /> SECURE</div>
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-xs"><Zap className="text-orange-500" /> FAST</div>
            <div className="flex items-center gap-2 text-white font-bold tracking-widest text-xs"><User className="text-orange-500" /> TRUSTED</div>
          </div>
        </div>

        {/* --- ডান পাশ (রেজিস্টার ফর্ম) --- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-zinc-900/30 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-2xl relative">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Registration</h2>
            <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-bold">Initialize your profile</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={17} />
                <input name="name" type="text" required value={formData.name} onChange={handleChange} className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-zinc-700" placeholder="John Doe" />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={17} />
                <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-zinc-700" placeholder="name@example.com" />
              </div>
            </div>

            {/* Profile Image URL (New Field) */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Profile Image URL</label>
              <div className="relative group">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={17} />
                <input name="image" type="text" value={formData.image} onChange={handleChange} className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-zinc-700" placeholder="https://image-link.com" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={17} />
                <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-white focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-zinc-700" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-orange-500 transition-colors cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-orange-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-500 shadow-xl shadow-orange-500/10 mt-6 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <>CREATE ACCOUNT <ArrowRight size={20} /></>}
            </motion.button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#121214] px-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Quick Entry</span>
          </div>

          <button className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 cursor-pointer">
            <Chrome size={20} /> GOOGLE
          </button>

          <p className="text-center mt-6 text-zinc-500 text-xs font-medium">
            Already a member? 
            <Link href="/login" className="ml-2 text-orange-500 font-black hover:underline uppercase tracking-tighter cursor-pointer">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPage;