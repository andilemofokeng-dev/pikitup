# Pikitup Digital Clean City Platform

**Pikitup Johannesburg** — City-owned waste management entity serving 5.8 million residents across 7 regions of Greater Johannesburg.

This repository contains the full-stack web platform built to modernise Pikitup's digital presence, streamline resident and business engagement, and enable staff and CMS teams to manage content and operations without developer intervention.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Portals](#portals)
- [Key Features](#key-features)

---

## Overview

The Pikitup Digital Platform is a Next.js 16 App Router application with:

- **Public website** — Service pages, news, governance, annual reports, collection schedules, facility finder, recycling education
- **Resident Portal** — Authenticated residents can track waste collection, report problems and manage service cases
- **Business Portal** — Commercial customers manage business waste accounts, report issues and view invoices
- **Career Portal** — Job seekers browse vacancies and submit applications
- **CMS Portal** — Communications team manages news articles, service notices, leadership profiles and annual reports
- **Staff Portal** — Operations team manages incoming complaints, facility data and depot assignments
- **Admin Portal** — System-level administration and user management

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router | 16.2.7 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 | ^4 |
| Animation | Framer Motion | ^12 |
| Charts | Recharts | ^3 |
| Icons | Lucide React | ^1.17 |
| Component Primitives | Radix UI | Various |
| Maps | Vis.gl React Google Maps + Leaflet | ^1.8 / ^5 |
| ORM | Prisma v7 | ^7.8 |
| DB Adapter | @prisma/adapter-pg (PrismaPg) | ^7.8 |
| Database | PostgreSQL | 15+ |
| Runtime | Node.js | 24 LTS |
| Package Manager | npm | 11+ |

---

## Project Structure

```
pikitup-website/
├── prisma/
│   ├── schema.prisma              # Database schema (7 models)
│   ├── migrations/                # 3 applied migration files
│   ├── seed.ts                    # Leadership & core seed data
│   └── seed-annual-reports.ts     # Annual reports seed
│
├── src/
│   ├── app/
│   │   ├── (public)/              # Public-facing website (no auth)
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── about/             # About, Leadership, Governance, Annual Reports
│   │   │   ├── services/          # Services overview + [slug] dynamic detail pages
│   │   │   ├── news/              # News & notices listing
│   │   │   ├── contact/           # Contact page
│   │   │   ├── collection-schedule/
│   │   │   ├── find-facility/
│   │   │   ├── report/
│   │   │   ├── tenders/
│   │   │   ├── careers/
│   │   │   ├── recycling-education/
│   │   │   ├── privacy-policy/
│   │   │   ├── terms/
│   │   │   └── accessibility/
│   │   │
│   │   ├── api/                   # Next.js API route handlers
│   │   │   ├── admin/leadership/  # Leadership CRUD (GET/POST/PUT/DELETE)
│   │   │   └── cms/
│   │   │       ├── articles/      # Articles CRUD
│   │   │       ├── notices/       # Notices CRUD
│   │   │       ├── annual-reports/# Annual reports CRUD
│   │   │       └── corporate-docs/# Corporate documents CRUD
│   │   │
│   │   ├── resident-portal/       # Resident auth + dashboard + cases + report
│   │   ├── business-portal/       # Business auth + dashboard + cases + invoices
│   │   ├── career-portal/         # Career auth + vacancies + applications
│   │   ├── cms-portal/            # CMS auth + articles + notices + leadership + reports
│   │   ├── staff-portal/          # Staff auth + complaints + facilities + depots
│   │   └── admin-portal/          # Admin auth + system dashboard
│   │
│   ├── components/
│   │   ├── layout/                # Header (pill nav + icons + Framer Motion), Footer (green gradient, icon links, scroll animations)
│   │   ├── home/                  # Hero (bouncing logo), QuickActions (spring cards), ImpactInfographic, RecyclingCTA
│   │   ├── about/                 # AboutNavBar, AnnualReportCharts (Recharts)
│   │   └── ui/                    # Button, animate (FadeIn/Stagger), shared primitives
│   │
│   ├── lib/
│   │   ├── prisma.ts              # Prisma singleton (versioned globalThis key)
│   │   ├── api-client.ts          # Typed fetch helpers for portal API calls
│   │   ├── mock-data.ts           # Static data for non-DB features
│   │   └── types.ts               # Shared TypeScript interfaces
│   │
│   ├── context/
│   │   └── AuthContext.tsx        # Auth state provider (used by all portals)
│   │
│   └── data/                      # Static JSON/TS data files
│
├── public/                        # Static assets (logos, favicons, images)
├── .env.local                     # Environment variables (not committed)
├── next.config.ts                 # Next.js configuration
├── prisma.config.ts               # Prisma datasource adapter config
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 24 LTS
- PostgreSQL 15+ running locally or remote
- npm 11+

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
#    Create .env.local with values from the Environment Variables section below

# 3. Create the database
createdb pikitup

# 4. Run all migrations
npm run db:migrate

# 5. Seed initial data
npm run db:seed
npx tsx prisma/seed-annual-reports.ts

# 6. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create `.env.local` in the project root:

```env
# PostgreSQL — encode special characters: @ → %40
DATABASE_URL=postgresql://postgres:yourpassword%40@localhost:5432/pikitup

# CMS / Admin bearer token auth
ADMIN_PASSWORD=your-cms-secret

# Exposed to browser — must match ADMIN_PASSWORD
NEXT_PUBLIC_CMS_TOKEN=your-cms-secret

# Google Maps (Facility Finder map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

> Never commit `.env.local` to version control.

---

## Database Setup

```bash
# Apply pending migrations
npm run db:migrate

# Seed leadership, depot and article data
npm run db:seed

# Seed annual reports and corporate documents
npx tsx prisma/seed-annual-reports.ts

# Open Prisma Studio (data browser GUI)
npm run db:studio
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Turbopack dev server on port 3000 |
| `npm run build` | Production Next.js build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Apply pending Prisma migrations |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:push` | Push schema without a migration (dev only) |

---

## Portals

| Portal | Path | Intended Users |
|---|---|---|
| Public Website | `/` | All residents & businesses |
| Resident Portal | `/resident-portal` | Registered Johannesburg residents |
| Business Portal | `/business-portal` | Registered commercial customers |
| Career Portal | `/career-portal` | Job applicants |
| CMS Portal | `/cms-portal` | Communications / Admin / Super Admin |
| Staff Portal | `/staff-portal` | Pikitup operations staff |
| Admin Portal | `/admin-portal` | System administrators |

---

## Key Features

- **RSC-first** — Server Components by default; client components only where state/interactivity is needed
- **Prisma v7 + PrismaPg adapter** — Edge-compatible PostgreSQL via `@prisma/adapter-pg`
- **Bearer token CMS auth** — Lightweight stateless auth for all CMS/admin API routes
- **Turbopack** — Sub-2-second hot module replacement in development
- **Recharts** — Interactive 4-panel performance trend charts (Annual Reports page)
- **Framer Motion** — Component animations: pill stagger, spring cards, scroll-triggered reveals, hover variant propagation
- **Radix UI** — Accessible, headless component primitives (Accordion, Dialog, Tabs, Select)
- **Google Maps + Leaflet** — Dual-map strategy for facility finder

---

*Pikitup SOC Ltd — A City of Johannesburg entity*
