"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  ImageIcon,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postUser } from "@/actions/auth";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", // আপনার postUser এর সাথে মিল রেখে
    email: "",
    password: "",
    image: "", // ইমেজ URL এর জন্য
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // আপনার অ্যাকশন অনুযায়ী ডেটা সাজানো
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      image: formData.image, // ইউজারের দেওয়া ইমেজ URL
    };

    try {
      const response = await postUser(payload); // আপনার server action কল
      if (response.success) {
        // সফল হলে SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.message,
        });
        router.push("/");
      } else {
        Swal.fire({ icon: "error", title: "Oops...", text: response.message });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ডিজাইনের পার্ট (আগের মতই থাকবে) */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/30 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem]"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Register
          </h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
            Create your tech identity
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={17}
              />
              <input
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none text-sm"
                placeholder="Ex: John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={17}
              />
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Profile Image URL */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Profile Image URL
            </label>
            <div className="relative">
              <ImageIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={17}
              />
              <input
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:border-orange-500/50 outline-none text-sm"
                placeholder="https://image-url.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                size={17}
              />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-3.5 pl-12 pr-12 text-white focus:border-orange-500/50 outline-none text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-white hover:text-black text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 cursor-pointer disabled:opacity-50 mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                INITIALIZE ACCESS <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-zinc-500 text-xs">
          Already in the system?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-black uppercase tracking-tighter hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default RegisterPage;
