import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isCmsAuthorized(req: Request) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCmsAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body   = await req.json();
  const notice = await prisma.notice.update({
    where: { id },
    data: {
      title:     body.title,
      body:      body.body,
      type:      body.type,
      region:    body.region,
      active:    body.active,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
    },
  });
  return NextResponse.json({ notice });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCmsAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.notice.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
