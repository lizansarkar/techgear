import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // ১. ফ্রন্টএন্ড থেকে পাঠানো কুয়েরি প্যারামিটারগুলো ধরা
    const { searchParams } = new URL(request.url);
    const sortOrder = searchParams.get("sort"); // 'lowToHigh' বা 'highToLow'
    const limit = parseInt(searchParams.get("limit")) || 20; // কতটুকু ডেটা দেখাবে (ডিফল্ট ২০)

    await client.connect();
    const database = client.db("techGear");
    const items = database.collection("items");

    // ২. সর্টিং লজিক সেট করা
    let mongoSort = {};
    if (sortOrder === "lowToHigh") {
      mongoSort = { price: 1 }; // ১ মানে ছোট থেকে বড় (Ascending)
    } else if (sortOrder === "highToLow") {
      mongoSort = { price: -1 }; // -1 মানে বড় থেকে ছোট (Descending)
    }

    // ৩. ডাটাবেস থেকে সর্ট এবং লিমিট অনুযায়ী ডেটা আনা
    // এটি অনেক ফাস্ট কারণ ডাটাবেস লেভেলে ইনডেক্সিং কাজ করে
    const allItems = await items
      .find({})
      .sort(mongoSort) // ডাটাবেস সর্ট করছে
      .limit(limit)   // ডাটাবেস শুধু ২০টি ডেটা পাঠাচ্ছে
      .toArray();

    return NextResponse.json(allItems);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    // প্রফেশনাল অ্যাপে কানেকশন ক্লোজ না করে কানেকশন পুলিং ব্যবহার করা ভালো, 
    // তবে আপনার বর্তমান স্ট্রাকচারে এটি ঠিক আছে।
    await client.close();
  }
}