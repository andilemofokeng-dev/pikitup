import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

interface SeedData {
  executives: Array<{
    id: string; name: string; title: string; abbreviation: string;
    department: string; bio: string; imageUrl?: string | null; email?: string; order: number;
  }>;
  generalManagers: Array<{
    id: string; name: string; cluster: string; imageUrl?: string | null; order: number;
  }>;
  depotManagers: Array<{
    id: string; name: string; depot: string; role: string; imageUrl?: string | null; order: number;
  }>;
  depots: string[];
}

async function main() {
  const jsonPath = path.join(__dirname, "../data/leadership.json");
  const seed: SeedData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  console.log("🌱 Seeding database from data/leadership.json ...");

  await prisma.depotManager.deleteMany();
  await prisma.generalManager.deleteMany();
  await prisma.executive.deleteMany();
  await prisma.depot.deleteMany();

  for (const e of seed.executives) {
    await prisma.executive.create({
      data: {
        id:           e.id,
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
  }
  console.log(`  ✓ ${seed.executives.length} executives`);

  for (const gm of seed.generalManagers) {
    await prisma.generalManager.create({
      data: {
        id:       gm.id,
        name:     gm.name,
        cluster:  gm.cluster,
        imageUrl: gm.imageUrl ?? null,
        order:    gm.order,
      },
    });
  }
  console.log(`  ✓ ${seed.generalManagers.length} general managers`);

  for (const dm of seed.depotManagers) {
    await prisma.depotManager.create({
      data: {
        id:       dm.id,
        name:     dm.name,
        depot:    dm.depot,
        role:     dm.role,
        imageUrl: dm.imageUrl ?? null,
        order:    dm.order,
      },
    });
  }
  console.log(`  ✓ ${seed.depotManagers.length} depot managers`);

  for (let i = 0; i < seed.depots.length; i++) {
    await prisma.depot.create({
      data: { name: seed.depots[i], order: i + 1 },
    });
  }
  console.log(`  ✓ ${seed.depots.length} depots`);

  console.log("✅ Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
