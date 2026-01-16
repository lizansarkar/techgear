"use client";
import React, { useState, useRef } from "react";
import { Upload, Plus, X, Image as ImageIcon, Mail, Tag, DollarSign, Package } from "lucide-react";
import { motion } from "framer-motion";

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    oldPrice: "",
    email: "", // ইউনিক ইমেইল ফিল্ড
    category: "Mobile Phone",
    stock: "In Stock",
    description: "",
    images: [], 
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ইমেজ ফাইল হ্যান্ডলার
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result], // এখানে বেস৬৪ স্ট্রিং হিসেবে সেভ হবে
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) return alert("Please upload at least one image");
    
    setLoading(true);
    try {
      const res = await fetch("/api/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product Added Successfully!");
        setFormData({ name: "", brand: "", price: "", oldPrice: "", email: "", images: [], description: "", category: "Mobile Phone", stock: "In Stock" });
      }
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] text-white min-h-screen pt-[120px] pb-20 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            List Your Item
          </h1>
          <p className="text-zinc-500">Share your product with the world. Please fill in the details below.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/30 backdrop-blur-xl p-6 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl">
          
          {/* User Email Section (For tracking) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyan-500 uppercase tracking-[0.2em] ml-2">Seller Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@example.com"
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Product Name</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. iPhone 15 Pro"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Brand</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input
                  type="text"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Apple"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Selling Price (৳)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-cyan-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Category</label>
              <select 
                name="category" 
                onChange={handleChange} 
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-500 cursor-pointer appearance-none"
              >
                <option value="Mobile Phone">Mobile Phone</option>
                <option value="Laptop">Laptop</option>
                <option value="Smart Watch">Smart Watch</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Product Images</label>
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-white/10 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all cursor-pointer group"
            >
              <div className="p-4 bg-zinc-800 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="text-cyan-500" size={30} />
              </div>
              <p className="text-zinc-400 font-medium">Click to upload images from your device</p>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden" 
              />
            </div>

            {/* Preview Thumbnails */}
            <div className="flex flex-wrap gap-4 mt-4">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 group">
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, images: formData.images.filter((_, i) => i !== idx)})}
                    className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-2">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us more about the product features..."
              className="w-full bg-black/50 border border-white/10 rounded-[2rem] p-6 focus:border-cyan-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-[2rem] font-bold text-xl transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-orange-500/20 ${
              loading ? "bg-zinc-700" : "bg-gradient-to-r from-orange-500 to-orange-600 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {loading ? "Processing..." : <><Plus size={24} /> List Product Now</>}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddItemPage;