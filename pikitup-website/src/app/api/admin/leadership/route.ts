import { NextResponse } from "next/server";
import {
  readLeadership, isAdminAuthorized, generateId,
  type Executive, type GeneralManager, type DepotManager,
} from "@/lib/leadership-store";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// ── GET (public) ─────────────────────────────────────────────────────────────
export async function GET() {
  const data = await readLeadership();
  return NextResponse.json(data);
}

// ── POST: add a record ────────────────────────────────────────────────────────
export async function POST(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as { section: string; item: unknown };
  const { section, item } = body;

  if (section === "executives") {
    const e = item as Omit<Executive, "id">;
    await prisma.executive.create({
      data: {
        id:           generateId("exec"),
        name:         e.name,
        title:        e.title,
        abbreviation: e.abbreviation,
        department:   e.department,
        bio:          e.bio,
        imageUrl:     e.imageUrl ?? null,
        email:        e.email ?? null,
        order:        e.order ?? 99,
      },
    });
  } else if (section === "generalManagers") {
    const gm = item as Omit<GeneralManager, "id">;
    await prisma.generalManager.create({
      data: {
        id:       generateId("gm"),
        name:     gm.name,
        cluster:  gm.cluster,
        imageUrl: gm.imageUrl ?? null,
        order:    gm.order ?? 99,
      },
    });
  } else if (section === "depotManagers") {
    const dm = item as Omit<DepotManager, "id">;
    await prisma.depotManager.create({
      data: {
        id:       generateId("dm"),
        name:     dm.name,
        depot:    dm.depot,
        role:     dm.role,
        imageUrl: dm.imageUrl ?? null,
        order:    dm.order ?? 99,
      },
    });
  } else if (section === "depots") {
    const name = item as string;
    await prisma.depot.upsert({
      where:  { name },
      update: {},
      create: { name, order: 99 },
    });
  } else {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const data = await readLeadership();
  return NextResponse.json({ success: true, data });
}

// ── PUT: update a record ──────────────────────────────────────────────────────
export async function PUT(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json() as { section: string; item: { id: string } };
  const { section, item } = body;

  if (section === "executives") {
    const e = item as Executive;
    await prisma.executive.update({
      where: { id: e.id },
      data: {
        name:         e.name,
        title:        e.title,
        abbreviation: e.abbreviation,
        department:   e.department,
        bio:          e.bio,
        imageUrl:     e.imageUrl ?? null,
        email:        e.email ?? null,
        order:        e.order,
      },
    });
  } else if (section === "generalManagers") {
    const gm = item as GeneralManager;
    await prisma.generalManager.update({
      where: { id: gm.id },
      data: {
        name:     gm.name,
        cluster:  gm.cluster,
        imageUrl: gm.imageUrl ?? null,
        order:    gm.order,
      },
    });
  } else if (section === "depotManagers") {
    const dm = item as DepotManager;
    await prisma.depotManager.update({
      where: { id: dm.id },
      data: {
        name:     dm.name,
        depot:    dm.depot,
        role:     dm.role,
        imageUrl: dm.imageUrl ?? null,
        order:    dm.order,
      },
    });
  } else {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const data = await readLeadership();
  return NextResponse.json({ success: true, data });
}

// ── DELETE ────────────────────────────────────────────────────────────────────
export async function DELETE(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { section, id } = await req.json() as { section: string; id: string };

  if (section === "executives") {
    await prisma.executive.delete({ where: { id } });
  } else if (section === "generalManagers") {
    await prisma.generalManager.delete({ where: { id } });
  } else if (section === "depotManagers") {
    await prisma.depotManager.delete({ where: { id } });
  } else if (section === "depots") {
    await prisma.depot.delete({ where: { name: id } });
  } else {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const data = await readLeadership();
  return NextResponse.json({ success: true, data });
}
