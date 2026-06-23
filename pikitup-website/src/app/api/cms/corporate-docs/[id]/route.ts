import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAuth(req: Request) {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const doc = await prisma.corporateDocument.update({
    where: { id },
    data: {
      title:       body.title,
      description: body.description,
      category:    body.category,
      fileUrl:     body.fileUrl ?? null,
      order:       Number(body.order ?? 99),
    },
  });
  return NextResponse.json({ doc });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.corporateDocument.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
