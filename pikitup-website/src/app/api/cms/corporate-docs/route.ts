import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuth(req: Request) {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export async function GET() {
  const docs = await prisma.corporateDocument.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ docs });
}

export async function POST(req: Request) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const doc = await prisma.corporateDocument.create({
    data: {
      title:       body.title       ?? "",
      description: body.description ?? "",
      category:    body.category    ?? "Corporate",
      fileUrl:     body.fileUrl     ?? null,
      order:       Number(body.order ?? 99),
    },
  });
  return NextResponse.json({ doc }, { status: 201 });
}
