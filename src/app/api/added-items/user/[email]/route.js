import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Next.js 15+ এ params কে await করতে হয়
    const { email } = await params; 
    const collection = await dbConnect("added-items");

    // এখানে একটি বিষয় নিশ্চিত হোন: আপনার ডাটাবেসে ইমেইল কি 'email' নামে আছে? 
    // যদি আপনি ডাটা এড করার সময় 'userEmail' লিখে থাকেন, তবে এখানে { userEmail: email } দিতে হবে।
    // আপাতত আমি 'email' দিয়ে দিচ্ছি যেহেতু আপনি আগের কোডে এটাই লিখেছিলেন।
    const items = await collection.find({ email: email }).toArray(); 
    
    console.log("Found items for:", email, items.length); // এটি আপনার টার্মিনালে দেখাবে কয়টা ডাটা পেল

    return NextResponse.json(items);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Data Load Failed" }, { status: 500 });
  }
}