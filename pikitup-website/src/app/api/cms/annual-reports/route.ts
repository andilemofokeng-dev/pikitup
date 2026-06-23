import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isAuth(req: Request) {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export async function GET() {
  const reports = await prisma.annualReport.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json({ reports });
}

export async function POST(req: Request) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  if (body.isLatest) await prisma.annualReport.updateMany({ data: { isLatest: false } });
  const report = await prisma.annualReport.create({
    data: {
      title:       body.title       ?? "",
      year:        body.year        ?? "",
      type:        body.type        ?? "Integrated Annual Report",
      description: body.description ?? "",
      pages:       body.pages       ? Number(body.pages) : null,
      pdfUrl:      body.pdfUrl      ?? null,
      viewUrl:     body.viewUrl     ?? null,
      isLatest:    body.isLatest    ?? false,
      order:       body.order       ? Number(body.order) : 99,
    },
  });
  return NextResponse.json({ report }, { status: 201 });
}
