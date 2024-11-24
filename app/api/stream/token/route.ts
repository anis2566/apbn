import { auth } from "@/auth";
import streamServerClient from "@/lib/stream";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;

    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamServerClient.createToken(
      session.userId,
      expirationTime,
      issuedAt
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
