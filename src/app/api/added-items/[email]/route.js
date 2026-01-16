import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET Data
export async function GET(request, { params }) {
  try {
    const { email } = params;
    const collection = await dbConnect("added-items");
    const items = await collection.find({ email: email }).toArray();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

// UPDATE Data
export async function PATCH(request, { params }) {
  try {
    const id = params.email; 
    const body = await request.json();
    const { _id, ...updateData } = body; 

    const collection = await dbConnect("added-items");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// DELETE Data
export async function DELETE(request, { params }) {
  try {
    const id = params.email; 
    const collection = await dbConnect("added-items");
    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}