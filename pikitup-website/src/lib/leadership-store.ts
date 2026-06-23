import { prisma } from "./prisma";

export interface Executive {
  id: string;
  name: string;
  title: string;
  abbreviation: string;
  department: string;
  bio: string;
  imageUrl: string | null;
  email?: string;
  order: number;
}

export interface GeneralManager {
  id: string;
  name: string;
  cluster: string;
  imageUrl?: string | null;
  order: number;
}

export interface DepotManager {
  id: string;
  name: string;
  depot: string;
  role: "Regional Manager" | "Operations Manager";
  imageUrl?: string | null;
  order: number;
}

export interface LeadershipData {
  executives: Executive[];
  generalManagers: GeneralManager[];
  depotManagers: DepotManager[];
  depots: string[];
}

export async function readLeadership(): Promise<LeadershipData> {
  const [executives, generalManagers, depotManagers, depots] = await Promise.all([
    prisma.executive.findMany({ orderBy: { order: "asc" } }),
    prisma.generalManager.findMany({ orderBy: { order: "asc" } }),
    prisma.depotManager.findMany({ orderBy: { order: "asc" } }),
    prisma.depot.findMany({ orderBy: { order: "asc" } }),
  ]);

  return {
    executives: executives.map((e) => ({
      id:           e.id,
      name:         e.name,
      title:        e.title,
      abbreviation: e.abbreviation,
      department:   e.department,
      bio:          e.bio,
      imageUrl:     e.imageUrl,
      email:        e.email ?? undefined,
      order:        e.order,
    })),
    generalManagers: generalManagers.map((gm) => ({
      id:       gm.id,
      name:     gm.name,
      cluster:  gm.cluster,
      imageUrl: gm.imageUrl,
      order:    gm.order,
    })),
    depotManagers: depotManagers.map((dm) => ({
      id:       dm.id,
      name:     dm.name,
      depot:    dm.depot,
      role:     dm.role as "Regional Manager" | "Operations Manager",
      imageUrl: dm.imageUrl,
      order:    dm.order,
    })),
    depots: depots.map((d) => d.name),
  };
}

export function isAdminAuthorized(req: Request): boolean {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "").trim();
  return token === (process.env.ADMIN_PASSWORD ?? "pikitup2026");
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
