"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Camera, Loader2, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { postUser } from "@/actions/auth";

const RegisterPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ইমেজ আপলোড হ্যান্ডলার (ImgBB ব্যবহার করে) ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // প্রিভিউ সেট করা
    setPreview(URL.createObjectURL(file));
    setUploadingImage(true);

    const data = new FormData();
    data.append("image", file);

    try {
      // ImgBB API Key এখানে আপনারটা বসাবেন, আপাতত ফ্রি কি ব্যবহার করছি
      const res = await fetch(`https://api.imgbb.com/1/upload?key=a2c09b23de6e5fac7609482be431ca74`, {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.data.url }));
        setUploadingImage(false);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image && !uploadingImage) {
      return Swal.fire({ icon: "warning", title: "Image Required", text: "Please upload a profile picture." });
    }
    
    setLoading(true);

    try {
      const response = await postUser(formData);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Access Granted",
          text: response.message,
          background: "#121214",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
        router.push("/");
      } else {
        Swal.fire({ icon: "error", title: "Error", text: response.message });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 py-20 relative overflow-hidden font-sans">
      {/* Background Polish */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f9731605,transparent_50%)] z-0" />
      <div className="absolute -top-[10%] -left-[10%] w-[400px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full z-0" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg bg-zinc-900/20 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Create Legacy</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-2">Personalize your elite profile</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Avatar Upload Design */}
          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="relative w-24 h-24 rounded-3xl overflow-hidden bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-orange-500/50 transition-all cursor-pointer group"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 group-hover:text-orange-500">
                  <Camera size={24} />
                </div>
              )}
              {uploadingImage && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" size={20} /></div>}
              {formData.image && !uploadingImage && <div className="absolute top-1 right-1 text-green-500 bg-black rounded-full p-0.5"><CheckCircle2 size={16} fill="currentColor" className="text-black" /></div>}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-3">Upload Identity Image</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                <input name="fullName" type="text" required value={formData.fullName} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-white focus:bg-white/10 focus:border-orange-500/40 transition-all outline-none text-sm placeholder:text-zinc-700" placeholder="John Doe" />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
                <input name="email" type="email" required value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-11 pr-4 text-white focus:bg-white/10 focus:border-orange-500/40 transition-all outline-none text-sm placeholder:text-zinc-700" placeholder="name@legacy.com" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors" size={16} />
              <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-11 pr-12 text-white focus:bg-white/10 focus:border-orange-500/40 transition-all outline-none text-sm placeholder:text-zinc-700" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-orange-500 transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            disabled={loading || uploadingImage} 
            className="w-full bg-orange-500 hover:bg-white hover:text-black text-white font-black py-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all duration-500 cursor-pointer disabled:opacity-50 mt-6 shadow-xl shadow-orange-500/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>FINALIZE REGISTRATION <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-zinc-500 text-xs font-medium italic">
            Part of the system? <Link href="/login" className="text-orange-500 font-black uppercase ml-1 hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default RegisterPage;