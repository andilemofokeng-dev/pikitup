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
  if (body.isLatest) await prisma.annualReport.updateMany({ where: { id: { not: id } }, data: { isLatest: false } });
  const report = await prisma.annualReport.update({
    where: { id },
    data: {
      title:       body.title,
      year:        body.year,
      type:        body.type,
      description: body.description,
      pages:       body.pages ? Number(body.pages) : null,
      pdfUrl:      body.pdfUrl  ?? null,
      viewUrl:     body.viewUrl ?? null,
      isLatest:    body.isLatest ?? false,
      order:       Number(body.order ?? 99),
    },
  });
  return NextResponse.json({ report });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.annualReport.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
