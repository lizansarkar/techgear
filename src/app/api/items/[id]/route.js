import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    // ১. আপনার সঠিক কালেকশন নাম এখানে দিন (যেমন: "items")
    const collection = await dbConnect("items"); 

    const { id } = await params; // Next.js এর নতুন ভার্সনে params await করতে হয়

    // ২. আইডি চেক করুন (ভুল আইডি ফরম্যাট হলে এরর হ্যান্ডেল করবে)
    if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // ৩. ডাটাবেসে খোঁজা
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      console.log("product not found in this id", id);
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}