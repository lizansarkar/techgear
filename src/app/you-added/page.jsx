"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit3,
  X,
  Loader2,
  Package,
  Save,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import AddedItemsSkeleton from "@/components/skeletons/AddedItemsSkeleton";

const YouAddedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userEmail = "lizansarkar16@gmail.com";

  // ১. ইউজারের ইমেইল অনুযায়ী সব ডাটা আনা
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/added-items/user/${userEmail}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ২. আইডি অনুযায়ী ডিলিট (Specific ID route)
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This item will be permanently removed from DB!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#18181b",
      confirmButtonText: "Yes, Delete it!",
      background: "#050505",
      color: "#fff",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/added-items/action/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setItems(items.filter((item) => item._id !== id));
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: "#050505",
            color: "#fff",
          });
        }
      } catch (err) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  // ৩. আইডি অনুযায়ী আপডেট (Specific ID route)
  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/added-items/action/${selectedItem._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedItem),
      });

      if (res.ok) {
        await fetchItems(); // ডাটাবেস থেকে ফ্রেশ ডাটা আনা
        Swal.fire({
          title: "Database Updated!",
          text: "Your changes are saved permanently.",
          icon: "success",
          background: "#050505",
          color: "#fff",
          confirmButtonColor: "#f97316",
        });
        setIsModalOpen(false);
        setIsEditing(false);
      }
    } catch (err) {
      Swal.fire("Error", "Could not save to database", "error");
    }
  };

  if (loading) {
    return (
    <div className="bg-[#050505] min-h-screen">
      <AddedItemsSkeleton />
    </div>
  );
  }


  return (
    <main className="bg-[#050505] min-h-screen pt-[120px] pb-20 px-6 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-12 h-[2px] bg-orange-500"></span>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">
                Seller Archive
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
              My <span className="text-orange-500 not-italic">Vault</span>
            </h1>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl backdrop-blur-xl">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Inventory Status
            </p>
            <h2 className="text-3xl font-black text-white">
              {items.length}{" "}
              <span className="text-sm text-zinc-600 uppercase">
                Live Products
              </span>
            </h2>
          </div>
        </motion.header>

        {items.length === 0 ? (
          <div className="py-40 text-center border border-white/5 rounded-[4rem] bg-zinc-900/10">
            <Package className="mx-auto text-zinc-800 mb-6" size={80} />
            <h3 className="text-2xl text-zinc-500 font-bold">
              Your database is empty.
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                key={item._id}
                className="group bg-zinc-900/30 border border-white/5 rounded-[2rem] p-5 flex flex-col md:flex-row items-center gap-8 hover:bg-orange-500/5 transition-all duration-500"
              >
                <div className="w-24 h-24 bg-black rounded-2xl overflow-hidden p-2">
                  <img
                    src={item.images?.[0]}
                    className="w-full h-full object-contain"
                    alt={item.name}
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                </div>
                <div className="text-2xl font-black">৳{item.price}</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                      setIsEditing(false);
                    }}
                    className="h-12 w-12 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-xl hover:bg-white hover:text-black transition-all cursor-pointer"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="h-12 w-12 bg-zinc-900 border border-white/10 flex items-center justify-center rounded-xl hover:bg-red-600 transition-all cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* আরও গাঢ় ব্লার ব্যাকগ্রাউন্ড */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-[40px]"
            ></motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-zinc-950 w-full max-w-5xl rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 z-50 h-10 w-10 bg-white/5 hover:bg-red-500 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-black p-10 flex items-center justify-center">
                  <img
                    src={selectedItem.images?.[0]}
                    className="max-h-[400px] object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="p-10 md:p-16 overflow-y-auto max-h-[85vh] custom-scrollbar">
                  {isEditing ? (
                    <div className="space-y-5">
                      <h2 className="text-2xl font-black uppercase flex items-center gap-3">
                        <Save className="text-orange-500" /> Update Details
                      </h2>
                      <div className="space-y-4 pt-4">
                        <input
                          className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-orange-500"
                          value={selectedItem.name}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              name: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-orange-500"
                            value={selectedItem.price}
                            onChange={(e) =>
                              setSelectedItem({
                                ...selectedItem,
                                price: e.target.value,
                              })
                            }
                            placeholder="Price"
                          />
                          <input
                            className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-orange-500"
                            value={selectedItem.category}
                            onChange={(e) =>
                              setSelectedItem({
                                ...selectedItem,
                                category: e.target.value,
                              })
                            }
                            placeholder="Category"
                          />
                        </div>
                        <textarea
                          className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-orange-500 h-32 resize-none"
                          value={selectedItem.description}
                          onChange={(e) =>
                            setSelectedItem({
                              ...selectedItem,
                              description: e.target.value,
                            })
                          }
                          placeholder="Description"
                        />
                        <button
                          onClick={handleUpdate}
                          className="w-full bg-orange-500 text-black py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-all cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <span className="text-orange-500 font-bold uppercase text-xs tracking-widest">
                        {selectedItem.brand}
                      </span>
                      <h2 className="text-4xl font-black leading-tight">
                        {selectedItem.name}
                      </h2>
                      <p className="text-3xl font-light text-zinc-400">
                        ৳{selectedItem.price}
                      </p>
                      <div className="h-[1px] bg-white/5 w-full"></div>
                      <p className="text-zinc-500 leading-relaxed">
                        {selectedItem.description}
                      </p>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full border border-white/10 py-5 rounded-2xl font-bold uppercase flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all cursor-pointer"
                      >
                        <Edit3 size={18} /> Edit Product
                      </button>
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
