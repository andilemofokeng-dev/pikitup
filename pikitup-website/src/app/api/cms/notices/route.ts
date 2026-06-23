import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isCmsAuthorized(req: Request) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export async function GET(req: Request) {
  const url    = new URL(req.url);
  const active = url.searchParams.get("active");
  const where  = active === "true" ? { active: true } : {};
  const notices = await prisma.notice.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ notices });
}

export async function POST(req: Request) {
  if (!isCmsAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body   = await req.json();
  const notice = await prisma.notice.create({
    data: {
      title:     body.title,
      body:      body.body,
      type:      body.type ?? "info",
      region:    body.region ?? "All Regions",
      active:    body.active ?? true,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    },
  });
  return NextResponse.json({ notice }, { status: 201 });
}
