import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL, // এটি আপনার .env ফাইল থেকে ইউআরএল নিবে
  },
});