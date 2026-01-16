import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    // ১. টোকেন গেট করা
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    // ২. বর্তমান পাথ (URL) চেক করা
    const { pathname } = req.nextUrl;

    // ৩. কোন কোন রুটগুলো প্রাইভেট তা ডিফাইন করা
    const isPrivateRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/private') || 
                           pathname.startsWith('/my-vault'); // আপনার My Vault পেজটি

    // ৪. যদি ইউজার লগইন না থাকে এবং প্রাইভেট রুটে যাওয়ার চেষ্টা করে
    if (isPrivateRoute && !token) {
        // তাকে লগইন পেজে পাঠিয়ে দেওয়া
        const loginUrl = new URL('/login', req.url);
        // লগইন করার পর যেন আবার এই পেজেই ফিরে আসে সেজন্য callbackUrl যোগ করা
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ৫. যদি ইউজার লগইন থাকে কিন্তু রোল অনুযায়ী পারমিশন না থাকে (ঐচ্ছিক)
    // if (pathname.startsWith('/admin') && token?.role !== 'admin') {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }

    return NextResponse.next();
}

// আপনার কোন কোন রুটে এই মিডলওয়্যার চলবে তা এখানে বলে দিন
export const config = {
    matcher: [
        '/dashboard/:path*', 
        '/private/:path*', 
        '/my-vault/:path*', 
        '/add-item/:path*'
    ],
};