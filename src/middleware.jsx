import { NextResponse } from 'next/server';

export function middleware(request) {
  // ১. কুকি থেকে টোকেন বা ইউজার ডাটা চেক করা
  const token = request.cookies.get('user-credentials'); // তুমি লগইনের সময় যে নাম দিবে

  const { pathname } = request.nextUrl;

  // ২. প্রোটেক্টড রাউট চেক করা (যেমন: /add-item)
  if (pathname.startsWith('/add-item')) {
    if (!token) {
      // লগইন করা না থাকলে লগইন পেজে পাঠিয়ে দিবে
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // ৩. সব ঠিক থাকলে রিকোয়েস্ট সামনে আগাবে
  return NextResponse.next();
}

// কোন পেজগুলোতে এই মিডলওয়্যার কাজ করবে তা বলে দেওয়া
export const config = {
  matcher: ['/add-item/:path*'],
};