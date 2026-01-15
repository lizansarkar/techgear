"use server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, fullName } = payload;

  if (!email || !password) {
    return { success: false, message: "Email and Password are required" };
  }

  try {
    const collection = await dbConnect("users");
    const isExist = await collection.findOne({ email: payload.email });
    if (isExist) {
      return { success: false, message: "User already exists!" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      ...payload,
      name: fullName,
      image: payload.image || "",
      createdAt: new Date().toISOString(),
      role: "user",
      password: hashPassword,
    };

    const result = await collection.insertOne(newUser);

    if (result.acknowledged) {
      return { success: true, message: "Register Successful!" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
