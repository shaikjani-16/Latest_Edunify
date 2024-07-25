// src/app/api/schools/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  // Set CORS headers to allow any origin
  const response = NextResponse.json(await prisma.school.findMany());
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(req) {
  // Set CORS headers to allow any origin
  const { name, address, city, state, contact, email, image } =
    await req.json();
  const data = { name, address, city, state, contact, email, image };
  const response = NextResponse.json(
    await prisma.school.create({
      data: data,
    }),
    { status: 201 }
  );

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
