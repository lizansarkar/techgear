import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // ডাটাবেসে আপডেট করার সময় _id পাঠানো যায় না, তাই ওটা বাদ দিয়ে বাকিটা নিচ্ছি
    const { _id, ...updateData } = body; 

    const collection = await dbConnect("added-items");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.modifiedCount === 0) {
       return NextResponse.json({ message: "No changes made" }, { status: 400 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Update Failed" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const collection = await dbConnect("added-items");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Delete Failed" }, { status: 500 });
  }
}