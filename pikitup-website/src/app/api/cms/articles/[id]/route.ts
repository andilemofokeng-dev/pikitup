import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isCmsAuthorized(req: Request) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

// ── GET single article ─────────────────────────────────────────────────────
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // increment view count for public reads
  await prisma.article.update({ where: { id }, data: { views: { increment: 1 } } });
  return NextResponse.json({ article });
}

// ── PUT: update article ────────────────────────────────────────────────────
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCmsAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id }  = await params;
  const body    = await req.json();

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // set publishedAt when first publishing
  let publishedAt = existing.publishedAt;
  if (body.status === "published" && !publishedAt) publishedAt = new Date();

  const article = await prisma.article.update({
    where: { id },
    data: {
      title:       body.title,
      slug:        body.slug,
      category:    body.category,
      excerpt:     body.excerpt,
      body:        body.body,
      status:      body.status,
      author:      body.author,
      imageUrl:    body.imageUrl ?? null,
      region:      body.region ?? "All",
      tags:        body.tags ?? null,
      publishedAt,
    },
  });
  return NextResponse.json({ article });
}

// ── DELETE ─────────────────────────────────────────────────────────────────
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isCmsAuthorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.article.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
