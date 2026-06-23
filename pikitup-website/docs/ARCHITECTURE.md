# Architecture — Pikitup Digital Clean City Platform

## 1. High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER / CLIENT                        │
│  Public Site  │  Resident  │  Business  │  Career  │  Portals  │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS
┌───────────────────────────────▼─────────────────────────────────┐
│              NEXT.JS 16  —  App Router (Turbopack)              │
│                                                                 │
│  ┌──────────────────┐   ┌──────────────────────────────────┐   │
│  │  Server Components│   │   API Route Handlers             │   │
│  │  (RSC — no bundle)│   │   /api/cms/*  /api/admin/*       │   │
│  └────────┬─────────┘   └──────────────┬───────────────────┘   │
│           │ direct import              │ fetch / Bearer token   │
│  ┌────────▼─────────────────────────── ▼───────────────────┐   │
│  │                   Prisma v7 Client                       │   │
│  │          (PrismaPg adapter — @prisma/adapter-pg)         │   │
│  └─────────────────────────┬────────────────────────────────┘   │
└────────────────────────────┼────────────────────────────────────┘
                             │ TCP / TLS
┌────────────────────────────▼────────────────────────────────────┐
│                   PostgreSQL 15+  (pikitup DB)                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Application Layers

### 2.1 Routing — Next.js App Router

The application uses **route groups** to isolate concerns while sharing the same Next.js runtime:

```
src/app/
 ├── (public)/          ← Public website — no authentication required
 ├── resident-portal/   ← Auth-gated: registered residents
 ├── business-portal/   ← Auth-gated: commercial customers
 ├── career-portal/     ← Auth-gated: job applicants
 ├── cms-portal/        ← Auth-gated: comms / admin roles
 ├── staff-portal/      ← Auth-gated: operations staff
 ├── admin-portal/      ← Auth-gated: system administrators
 └── api/               ← Next.js route handlers (REST-style)
```

Each portal has its own:
- `login/page.tsx` — Unauthenticated login page
- `(portal)/layout.tsx` — Protected layout with sidebar, auth guard (`useEffect` redirect)
- `(portal)/**/page.tsx` — Feature pages

### 2.2 Server vs Client Components

| Pattern | Used For |
|---|---|
| **Server Component** (default) | Data-fetching pages (`annual-reports`, `news`, `about`) — zero JS bundle cost |
| **`"use client"`** | Any page/component with `useState`, event handlers, `useEffect`, Framer Motion, Recharts |
| **Server Component + Client sub-component** | Page fetches data on server, passes to a client component for interactivity |

**Key rule:** Prisma is only called from Server Components or API Route Handlers — never from client components directly.

### 2.3 API Routes

All CMS and admin mutations go through Next.js API routes which apply bearer token authentication:

```
POST   /api/cms/articles          ← create article
GET    /api/cms/articles          ← list articles (public)
PUT    /api/cms/articles/[id]     ← update article
DELETE /api/cms/articles/[id]     ← delete article

POST   /api/cms/notices
GET    /api/cms/notices
PUT    /api/cms/notices/[id]
DELETE /api/cms/notices/[id]

POST   /api/cms/annual-reports
GET    /api/cms/annual-reports
PUT    /api/cms/annual-reports/[id]
DELETE /api/cms/annual-reports/[id]

POST   /api/cms/corporate-docs
GET    /api/cms/corporate-docs
PUT    /api/cms/corporate-docs/[id]
DELETE /api/cms/corporate-docs/[id]

GET    /api/admin/leadership      ← executives, GMs, depot managers
POST   /api/admin/leadership
PUT    /api/admin/leadership/[id]
DELETE /api/admin/leadership/[id]
```

**Auth pattern:**
```ts
function isAuth(req: Request): boolean {
  const token = req.headers.get("authorization")?.replace("Bearer ", "").trim();
  return token === process.env.ADMIN_PASSWORD;
}
```

---

## 3. Data Layer

### 3.1 Prisma v7 Singleton

```ts
// src/lib/prisma.ts
const g = globalThis as unknown as { prisma_v3?: PrismaClient };

function makeClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

export const prisma = g.prisma_v3 ?? makeClient();
if (process.env.NODE_ENV !== "production") g.prisma_v3 = prisma;
```

The versioned global key (`prisma_v3`) prevents stale Prisma clients from persisting across Turbopack hot-module replacement cycles. Increment the suffix after each `prisma migrate dev`.

### 3.2 Database Models

| Model | Table | Purpose |
|---|---|---|
| `Executive` | `executives` | C-suite and senior leadership profiles |
| `GeneralManager` | `general_managers` | General Manager cluster assignments |
| `DepotManager` | `depot_managers` | Depot-level manager assignments |
| `Depot` | `depots` | Depot name registry |
| `Article` | `articles` | News and press release content |
| `Notice` | `notices` | Service notices and alerts |
| `AnnualReport` | `annual_reports` | Integrated annual report metadata |
| `CorporateDocument` | `corporate_documents` | Policy and governance documents |

---

## 4. Authentication Architecture

### 4.1 Portal Auth (Client-side)

Portals use a lightweight **AuthContext** pattern:

```
AuthContext (React Context)
  └── stores: { user, isLoading, login(), logout() }
  └── persisted to: localStorage / sessionStorage
  └── consumed by: all portal layout components via useAuth()

Portal Layout (e.g. CmsLayout)
  └── useEffect: if (!user || !allowedRoles.includes(user.role)) → redirect to login
```

This is a **client-side auth guard** — suitable for internal portals. For production, replace with server-side session validation (NextAuth, Clerk, or JWT middleware).

### 4.2 CMS API Auth (Bearer Token)

CMS Portal pages call API routes with a bearer token:

```ts
const res = await fetch("/api/cms/articles", {
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN}` }
});
```

The API route validates the token against `ADMIN_PASSWORD` server-side env var.

---

## 5. Component Architecture

### 5.1 Layout Components

```
src/app/layout.tsx          ← Root layout (fonts, global CSS, AuthProvider)
src/app/(public)/layout.tsx ← Public layout wraps Header + Footer
src/components/layout/
  ├── Header.tsx            ← Sticky nav, services dropdown, portals dropdown, mobile menu
  └── Footer.tsx            ← Emergency hotline band, links, stats, CoJ bottom bar
```

### 5.2 Shared UI Components

```
src/components/ui/
  ├── button.tsx            ← CVA-based button with variants (default, outline, white, ghost)
  └── animate.tsx           ← FadeIn, StaggerContainer, StaggerItem (Framer Motion wrappers)
```

### 5.3 Feature Components

```
src/components/home/
  ├── Hero.tsx              ← Full-bleed homepage hero with CTAs
  ├── QuickActions.tsx      ← Icon grid of quick links
  ├── PortalCTA.tsx         ← Portal sign-in cards
  ├── RecyclingCTA.tsx      ← Recycling programme call to action
  └── ImpactInfographic.tsx ← Animated stats band

src/components/about/
  ├── AboutNavBar.tsx       ← Sticky sub-navigation (Overview/Leadership/Governance/Annual Reports)
  └── AnnualReportCharts.tsx← Recharts 4-panel performance dashboard (client component)
```

---

## 6. Public Pages Map

```
/                           → Homepage
/about                      → About Pikitup (overview)
/about/leadership           → Executive team, GMs, Depot Managers
/about/governance           → Governance, Board of Directors, IAC
/about/annual-reports       → Annual reports + corporate docs + Recharts charts
/services                   → Services overview grid
/services/[slug]            → Dynamic service detail (household, business, street-sweeping, garden-refuse, recycling, landfill)
/news                       → News articles and service notices
/collection-schedule        → Waste collection schedule lookup
/find-facility              → Interactive facility finder map
/report                     → Report a waste problem
/tenders                    → Tenders and RFQ listing
/careers                    → Job vacancies
/recycling-education        → Recycling guides and education
/contact                    → Contact form and office information
/privacy-policy             → Privacy policy
/terms                      → Terms of service
/accessibility              → Accessibility statement
```

---

## 7. Environment & Configuration

### 7.1 Next.js Config (`next.config.ts`)

```ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "pikitup.co.za" },
      { protocol: "https", hostname: "ui-avatars.com" },
    ],
  },
};
```

### 7.2 Prisma Config (`prisma.config.ts`)

Separate config file used by Prisma CLI to resolve the database URL without requiring `.env` file naming conventions.

---

## 8. Key Architectural Decisions

| Decision | Rationale |
|---|---|
| Next.js App Router (RSC) | Server-rendered pages, SEO-friendly, zero client JS for data-only pages |
| Prisma v7 + PrismaPg adapter | Edge-ready adapter; no native binary required at runtime |
| Bearer token API auth | Zero dependency lightweight auth for internal CMS — avoids full auth library overhead |
| Tailwind CSS v4 | Utility-first, no runtime CSS-in-JS, excellent with Next.js RSC |
| Framer Motion | Best-in-class React animation library; used client-side only |
| Recharts over Chart.js | React-native, TypeScript-first, smaller bundle than Chart.js |
| Versioned `globalThis` Prisma key | Prevents stale HMR-cached client from persisting between schema migrations in dev |
| Client-side portal auth | Sufficient for internal portals; replace with NextAuth/Clerk for public-facing auth |
