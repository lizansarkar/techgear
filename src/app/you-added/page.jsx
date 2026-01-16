"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Edit3, X, Loader2, Package, Save, Info, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const YouAddedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const userEmail = "lizansarkar16@gmail.com"; 

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/added-items/${userEmail}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // SweetAlert2 Delete Confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#18181b",
      color: "#fff"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/added-items/${id}`, { method: "DELETE" });
          if (res.ok) {
            setItems(items.filter(item => item._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Product has been removed.",
              icon: "success",
              background: "#18181b",
              color: "#fff"
            });
          }
        } catch (err) {
          Swal.fire("Error", "Delete failed", "error");
        }
      }
    });
  };

  // SweetAlert2 Update Logic
  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/added-items/${selectedItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedItem),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product updated successfully",
          timer: 2000,
          showConfirmButton: false,
          background: "#18181b",
          color: "#fff"
        });
        setIsEditing(false);
        setIsModalOpen(false);
        fetchItems(); 
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="text-orange-500" size={60} />
      </motion.div>
      <p className="text-zinc-500 mt-4 tracking-widest uppercase text-xs">Synchronizing Inventory...</p>
    </div>
  );

  return (
    <main className="bg-[#050505] min-h-screen pt-[120px] pb-20 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-12 h-[2px] bg-orange-500"></span>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Seller Dashboard</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">
              MY <span className="text-orange-500 not-italic">COLLECTION</span>
            </h1>
          </div>
          <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
            <p className="text-zinc-500 text-sm font-medium">Active Inventory</p>
            <h2 className="text-3xl font-black text-white">{items.length} <span className="text-sm text-zinc-600">Items</span></h2>
          </div>
        </motion.header>

        {/* Product Grid */}
        {items.length === 0 ? (
          <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
            <Package className="mx-auto text-zinc-800 mb-6" size={80} />
            <h3 className="text-2xl text-zinc-500 font-bold">No products found in your database.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={item._id}
                className="group relative bg-zinc-900/20 border border-white/5 rounded-[2.5rem] p-6 flex flex-col md:flex-row items-center gap-8 hover:bg-zinc-900/40 transition-all duration-500 hover:border-orange-500/50"
              >
                <div className="relative w-32 h-32 bg-black rounded-3xl overflow-hidden p-4 group-hover:scale-105 transition-transform duration-500">
                  <img src={item.images?.[0]} className="w-full h-full object-contain" alt={item.name} />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                  <h3 className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors">{item.name}</h3>
                  <p className="text-zinc-500 text-sm italic">{item.brand}</p>
                </div>

                <div className="text-3xl font-black text-white">৳{item.price}</div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {setSelectedItem(item); setIsModalOpen(true); setIsEditing(false);}}
                    className="cursor-pointer h-14 w-14 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-2xl hover:bg-orange-500 hover:scale-110 transition-all duration-300"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="cursor-pointer h-14 w-14 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- LARGE PREMIUM MODAL --- */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            ></motion.div>

            <motion.div 
              initial={{ scale: 0.9, y: 100, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 100, opacity: 0 }}
              className="relative bg-[#0d0d0d] w-full max-w-6xl rounded-[4rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.1)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 z-50 h-12 w-12 bg-white/5 hover:bg-red-500 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="bg-black p-12 flex items-center justify-center min-h-[400px]">
                  <motion.img 
                    layoutId={selectedItem._id}
                    src={selectedItem.images?.[0]} 
                    className="max-h-[500px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                  />
                </div>

                {/* Content Section */}
                <div className="p-12 md:p-20 overflow-y-auto max-h-[90vh]">
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-orange-500 rounded-full flex items-center justify-center"><Save size={20}/></div>
                        <h2 className="text-3xl font-black uppercase">Edit Item</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-500 ml-4 mb-2 block">Product Identity</label>
                          <input className="w-full bg-zinc-900 border border-white/5 p-5 rounded-3xl outline-none focus:border-orange-500 transition-all" value={selectedItem.name} onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})} placeholder="Product Name" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-500 ml-4 mb-2 block">Pricing (BDT)</label>
                            <input className="w-full bg-zinc-900 border border-white/5 p-5 rounded-3xl outline-none focus:border-orange-500 transition-all" value={selectedItem.price} onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})} placeholder="Price" />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-zinc-500 ml-4 mb-2 block">Category</label>
                            <input className="w-full bg-zinc-900 border border-white/5 p-5 rounded-3xl outline-none focus:border-orange-500 transition-all" value={selectedItem.category} onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})} placeholder="Category" />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-zinc-500 ml-4 mb-2 block">Description</label>
                          <textarea className="w-full bg-zinc-900 border border-white/5 p-5 rounded-3xl outline-none focus:border-orange-500 transition-all h-40 resize-none" value={selectedItem.description} onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})} placeholder="Description" />
                        </div>

                        <button 
                          onClick={handleUpdate}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-black py-6 rounded-[2rem] font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-orange-500/20"
                        >
                          Confirm & Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <span className="bg-orange-500/10 text-orange-500 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-tighter mb-4 inline-block">{selectedItem.brand}</span>
                        <h2 className="text-5xl md:text-6xl font-black leading-none mb-4">{selectedItem.name}</h2>
                        <p className="text-4xl font-light text-zinc-400">৳{selectedItem.price}</p>
                      </div>

                      <div className="flex gap-10 border-y border-white/5 py-8">
                        <div>
                          <p className="text-zinc-600 text-[10px] font-bold uppercase mb-1">Stock Status</p>
                          <p className="text-green-500 font-bold">In Stock</p>
                        </div>
                        <div>
                          <p className="text-zinc-600 text-[10px] font-bold uppercase mb-1">Category</p>
                          <p className="text-white font-bold">{selectedItem.category}</p>
                        </div>
                      </div>

                      <p className="text-zinc-500 leading-relaxed text-lg">{selectedItem.description}</p>

                      <div className="pt-8">
                        <button 
                          onClick={() => setIsEditing(true)}
                          className="w-full border-2 border-white/10 hover:border-orange-500 hover:text-orange-500 py-6 rounded-[2rem] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-3"
                        >
                          <Edit3 size={18} /> Modify This Product
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default YouAddedItems;