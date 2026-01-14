"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "Are the products genuine and official?",
    answer: "Absolutely. Every product we sell is 100% authentic, sourced directly from official brand distributors. We provide official warranty cards with every purchase.",
  },
  {
    id: 2,
    question: "Do you offer international shipping?",
    answer: "Yes, we ship worldwide! Shipping costs and delivery times vary depending on your location. Standard international delivery takes 7-14 business days.",
  },
  {
    id: 3,
    question: "What is your replacement policy?",
    answer: "We offer a 7-day hassle-free replacement policy if the product has any manufacturing defects. The item must be in its original packaging.",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a tracking ID via email and SMS. You can use this on our tracking page to see real-time updates.",
  },
  {
    id: 5,
    question: "Are there any EMI facilities available?",
    answer: "Yes! We support 0% interest EMI for up to 12 months with selected credit cards from major banks.",
  },
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-black max-w-7xl mx-auto py-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 bg-orange-500/5 blur-[120px] rounded-full -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-orange-500 text-[10px] font-black tracking-[0.3em] uppercase"
          >
            <HelpCircle size={14} /> Questions & Answers
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
            HAVE <span className="text-zinc-800 italic">DOUBTS?</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div 
              key={faq.id}
              className={`group transition-all duration-500 rounded-[2rem] border ${
                activeId === faq.id 
                ? "bg-zinc-900/50 border-orange-500/50" 
                : "bg-zinc-900/20 border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-8 text-left cursor-pointer"
              >
                <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                  activeId === faq.id ? "text-orange-500" : "text-zinc-300"
                }`}>
                  {faq.question}
                </span>
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  activeId === faq.id ? "bg-orange-500 text-white rotate-180" : "bg-zinc-800 text-zinc-500"
                }`}>
                  {activeId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-zinc-400 leading-relaxed font-medium">
                      <div className="h-px w-full bg-white/5 mb-6" />
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Support Link */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-[11px] md:text-sm font-black tracking-widest uppercase">
            Still have questions? 
            <a href="#" className="ml-2 text-orange-500 hover:text-white transition-colors underline decoration-2 underline-offset-4">
              Contact Tech Support
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;