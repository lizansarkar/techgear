import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// Plus Jakarta Sans ফন্ট কনফিগারেশন
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-jakarta", // CSS ভেরিয়েবল হিসেবে ব্যবহারের জন্য
});

export const metadata = {
  title: "TechGear | Next-Gen Gadget Marketplace", // প্রজেক্টের নাম অনুযায়ী টাইটেল
  description: "Explore the latest and greatest in technology at TechGear Hub.", // প্রফেশনাল ডেসক্রিপশন
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="black"> 
      <body
        className={`${jakarta.className} antialiased bg-black text-white`}
      >
        <Navbar></Navbar>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}