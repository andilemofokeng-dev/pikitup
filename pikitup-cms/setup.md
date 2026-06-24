# Pikitup CMS

The CMS is built directly into the Next.js application — no separate Strapi installation is needed.

Access it at: `https://amprodution.co.za/pikitup/cms-portal`

---

## What's included

| Section | Path | Description |
|---|---|---|
| Dashboard | `/cms-portal` | Overview and quick stats |
| News & Articles | `/cms-portal/articles` | Create, edit, publish articles |
| Service Notices | `/cms-portal/notices` | Active service disruption notices |
| Leadership | `/cms-portal/leadership` | Executives, GMs, depot managers |
| Annual Reports | `/cms-portal/annual-reports` | Report library and corporate docs |

---

## Authentication

The CMS uses a shared token set via the `ADMIN_PASSWORD` environment variable (default: `pikitup2026`).

Set the token in `.env.local` and `ecosystem.config.js`:

```env
ADMIN_PASSWORD=pikitup2026
NEXT_PUBLIC_CMS_TOKEN=pikitup2026
```

---

## API Routes

All CMS API routes live under `src/app/api/`:

```
api/
├── admin/
│   ├── auth/route.ts           # Auth check
│   └── leadership/route.ts     # Leadership CRUD
└── cms/
    ├── articles/route.ts
    ├── articles/[id]/route.ts
    ├── notices/route.ts
    ├── notices/[id]/route.ts
    ├── annual-reports/route.ts
    ├── annual-reports/[id]/route.ts
    ├── corporate-docs/route.ts
    └── corporate-docs/[id]/route.ts
```

---

## Database

All CMS content is stored in PostgreSQL via Prisma. See the root `README.md` for database setup instructions.
