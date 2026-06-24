# Pikitup — Digital Clean City Platform

Official web presence for **Pikitup Johannesburg SOC**, the City of Johannesburg's integrated waste management entity.

Live: [amprodution.co.za/pikitup](https://amprodution.co.za/pikitup)

---

## Overview

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL 18 + Prisma 7 |
| Process manager | PM2 |
| Web server | Apache (XAMPP on Windows) — reverse proxy |
| Maps | Google Maps JavaScript API |

The site runs as a subpath app at `/pikitup` on the same server as the main AM Prodution platform.

---

## Repository Structure

```
pikitup/
├── pikitup-website/        # Next.js application
│   ├── src/
│   │   ├── app/            # App Router pages & API routes
│   │   │   ├── (public)/   # Public-facing pages
│   │   │   ├── api/        # REST API handlers
│   │   │   ├── cms-portal/ # Content Studio (CMS)
│   │   │   ├── career-portal/
│   │   │   ├── resident-portal/
│   │   │   └── staff-portal/
│   │   ├── components/     # Shared React components
│   │   └── lib/            # Utilities, Prisma client
│   ├── prisma/
│   │   ├── schema.prisma   # Database models
│   │   ├── migrations/     # SQL migration history
│   │   └── seed.ts         # Leadership data seeder
│   ├── data/
│   │   └── leadership.json # Source of truth for leadership data
│   ├── public/             # Static assets (pikitup-logo.png, etc.)
│   ├── ecosystem.config.js # PM2 process config
│   ├── next.config.ts      # Next.js config (basePath, images)
│   └── prisma.config.ts    # Prisma datasource config
└── pikitup-cms/            # (Legacy) CMS exploration notes
```

---

## Deployment Architecture

```
Internet → Apache (XAMPP, port 80/443)
             │
             ├─ /pikitup  → PM2: pikitup  (port 3002)  ← this app
             └─ /         → PM2: platform (port 3001)  ← AM Prodution main site
```

### Apache vhost (`C:/xampp/apache/conf/extra/httpd-vhosts.conf`)

```apache
ProxyPass /errors/ !
ProxyPass        /pikitup  http://127.0.0.1:3002/pikitup
ProxyPassReverse /pikitup  http://127.0.0.1:3002/pikitup
ProxyPass        /  http://127.0.0.1:3001/
ProxyPassReverse /  http://127.0.0.1:3001/
```

### PM2 (`pikitup-website/ecosystem.config.js`)

```js
module.exports = {
  apps: [{
    name: "pikitup",
    script: "node_modules/next/dist/bin/next",
    args: "start --port 3002",
    cwd: "C:/Users/ampadmin/Documents/GitHub/pikitup/pikitup-website",
    interpreter: "node",
    env: {
      NODE_ENV: "production",
      PORT: "3002",
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "<key>",
      DATABASE_URL: "postgresql://postgres:<pass>@localhost:5432/pikitup_prod",
    },
  }],
};
```

> **Windows note:** PM2 on Windows cannot use `npm.cmd` as the script interpreter. Always point `script` directly at `node_modules/next/dist/bin/next` with `interpreter: "node"`.

---

## Local Development

```bash
cd pikitup-website
npm install

# Copy and fill in environment variables
cp .env.example .env.local

npm run dev        # starts on http://localhost:3000/pikitup
```

### Environment variables (`.env.local`)

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
DATABASE_URL="postgresql://postgres:password@localhost:5432/pikitup_dev"
NEXT_PUBLIC_CMS_TOKEN=pikitup2026
ADMIN_PASSWORD=pikitup2026
```

---

## Database Setup

PostgreSQL 18 is installed at `F:\Program Files\PostgreSQL\18\` on the production server.

```bash
# Create the production database
createdb -U postgres pikitup_prod

# Apply all migrations
cd pikitup-website
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed leadership data from data/leadership.json
npx tsx prisma/seed.ts
```

### Prisma notes (v7)

Prisma 7 moves the datasource URL out of `schema.prisma` and into `prisma.config.ts`:

```ts
// prisma.config.ts
import { defineConfig } from "prisma/config";
export default defineConfig({
  migrations: { seed: "tsx prisma/seed.ts" },
  datasource: { url: process.env.DATABASE_URL },
});
```

The `schema.prisma` datasource block has **no `url` field** — that's intentional.

---

## Database Models

| Model | Description |
|---|---|
| `Executive` | MD, CFO and other C-suite leaders |
| `GeneralManager` | General managers by cluster |
| `DepotManager` | Regional / operations managers per depot |
| `Depot` | Depot names (used as foreign reference) |
| `Article` | News & articles (CMS-managed) |
| `Notice` | Service notices (CMS-managed) |
| `AnnualReport` | Annual report entries (CMS-managed) |
| `CorporateDocument` | Corporate document library |

---

## Key Configuration

### basePath

The app is served under `/pikitup`. This is set in `next.config.ts`:

```ts
basePath: "/pikitup",
env: { NEXT_PUBLIC_BASE_PATH: "/pikitup" },
```

All client-side API fetch calls must use the `apiUrl()` helper from `src/lib/base-path.ts` so the basePath prefix is applied:

```ts
import { apiUrl } from "@/lib/base-path";
fetch(apiUrl("/api/cms/articles"));  // → /pikitup/api/cms/articles
```

### Images

`unoptimized: true` is set in `next.config.ts` to avoid the Next.js image optimisation API breaking under the subpath deployment. Static image paths must include the full basePath prefix, e.g. `/pikitup/pikitup-logo.png`.

---

## Production Workflow

```bash
# 1. Pull latest code
cd C:/Users/ampadmin/Documents/GitHub/pikitup
git pull

# 2. Install dependencies (if package.json changed)
cd pikitup-website && npm install

# 3. Run any new migrations
npx prisma migrate deploy

# 4. Build
npm run build

# 5. Restart
pm2 restart pikitup
```

---

## CMS Portal

Available at `/pikitup/cms-portal` — a built-in Content Studio backed by PostgreSQL.

| Section | URL |
|---|---|
| Dashboard | `/pikitup/cms-portal` |
| News & Articles | `/pikitup/cms-portal/articles` |
| Service Notices | `/pikitup/cms-portal/notices` |
| Leadership | `/pikitup/cms-portal/leadership` |
| Annual Reports | `/pikitup/cms-portal/annual-reports` |

Default credentials: `pikitup2026` (set via `ADMIN_PASSWORD` env var).

---

## Leadership Data

The canonical leadership data lives in `data/leadership.json` and is seeded into the database via `prisma/seed.ts`. The seed script clears all leadership tables and re-inserts from the JSON file.

To update leadership data:
1. Edit `data/leadership.json`
2. Run `npx tsx prisma/seed.ts`

Or use the CMS portal at `/pikitup/cms-portal/leadership` to manage records directly through the UI.
