import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Versioned key evicts the stale HMR-cached client from globalThis after
// a schema change without needing a full process restart. Bump suffix after
// each `prisma migrate dev`.
const g = globalThis as unknown as { prisma_v3?: PrismaClient };

function makeClient(): PrismaClient {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient = g.prisma_v3 ?? makeClient();

if (process.env.NODE_ENV !== "production") g.prisma_v3 = prisma;
