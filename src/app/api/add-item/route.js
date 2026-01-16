import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    const body = await request.json();
    const collection = await dbConnect("added-items");

    const result = await collection.insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Item Added Successfully", result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add item", error: error.message }, { status: 500 });
  }
}