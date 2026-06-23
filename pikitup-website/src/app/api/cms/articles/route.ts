import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function isCmsAuthorized(req: Request) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

// ── GET: list articles ─────────────────────────────────────────────────────
// Public: ?status=published   CMS: all statuses (with auth header)
export async function GET(req: Request) {
  const url    = new URL(req.url);
  const status = url.searchParams.get("status");
  const limit  = parseInt(url.searchParams.get("limit") ?? "100");

  const where = status ? { status } : {};
  const articles = await prisma.article.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  return NextResponse.json({ articles });
}

// ── POST: create article ───────────────────────────────────────────────────
export async function POST(req: Request) {
  if (!isCmsAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const article = await prisma.article.create({
    data: {
      title:       body.title,
      slug:        body.slug,
      category:    body.category ?? "News",
      excerpt:     body.excerpt ?? "",
      body:        body.body ?? "",
      status:      body.status ?? "draft",
      author:      body.author ?? "CMS Admin",
      imageUrl:    body.imageUrl ?? null,
      region:      body.region ?? "All",
      tags:        body.tags ?? null,
      publishedAt: body.status === "published" ? new Date() : null,
    },
  });
  return NextResponse.json({ article }, { status: 201 });
}
