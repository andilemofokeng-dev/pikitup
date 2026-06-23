import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password } = await req.json() as { password: string };
    const correct = process.env.ADMIN_PASSWORD ?? "pikitup2026";
    if (password === correct) {
      return NextResponse.json({ success: true, token: correct });
    }
    return NextResponse.json({ success: false, error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: "Bad request" }, { status: 400 });
  }
}
