# Release Notes — Pikitup Digital Clean City Platform

---

## v1.0.0 — Initial Platform Release

**Release Date:** 23 June 2026
**Environment:** Development / Staging
**Branch:** `main`

---

### Overview

First complete release of the Pikitup Digital Clean City Platform — a full-stack Next.js 16 web application replacing the legacy WordPress site. Delivers a public-facing website, 6 authenticated portals, a database-driven CMS, and comprehensive content covering all Pikitup service lines.

---

### New Features

#### Public Website

- **Homepage** — Full-bleed hero, quick action grid, portal CTA cards, recycling CTA, impact infographic stats band
- **About section**
  - Overview page with Pikitup history and mandate
  - Leadership page — Executives, General Managers, Depot Managers (database-driven via CMS)
  - Governance page — 3-tab layout (Governance overview, Board of Directors with portraits, Independent Audit Committee)
  - Annual Reports page — Featured latest report card, archived reports grid, corporate documents grid, 4-panel Recharts performance dashboard
- **Services** — Overview grid + 6 dynamic detail pages:
  - Household Waste Collection (9 Council sub-services)
  - Business Waste Services (7 Commercial sub-services)
  - Street Sweeping & Area Cleaning
  - Garden Refuse Services (42 sites)
  - Recycling Services (400+ drop-off points)
  - Landfill Disposal (4 named sites)
- **News & Notices** — Articles and service notices listing
- **Collection Schedule** — Suburb-based schedule lookup
- **Find a Facility** — Interactive map (Google Maps + Leaflet)
- **Report a Problem** — Service complaint submission form
- **Tenders & RFQs** — Tender listing page
- **Careers** — Vacancy listings
- **Recycling Education** — Educational content and guides
- **Contact** — Contact form and office information
- **Legal pages** — Privacy Policy, Terms of Service, Accessibility Statement
- **Footer** — Emergency hotline band, deep forest green, stats band, City of Johannesburg acknowledgment
- **Header** — Sticky nav, Services and Portals dropdowns, Framer Motion animations, mobile hamburger menu

#### Portals

- **Resident Portal** — Login, register, dashboard, cases (list + detail), report problem, collection schedule, notifications, profile
- **Business Portal** — Login, register, dashboard, cases, report, services, invoices, profile
- **Career Portal** — Login, register, dashboard, browse vacancies, view job detail, apply, track applications, profile
- **Staff Portal** — Login, dashboard, complaints (list + detail), facilities, depots, users, audit log
- **Admin Portal** — Login, system dashboard
- **CMS Portal** — Login, dashboard, articles (list + edit), notices, leadership management, annual reports, tenders, vacancies, FAQs, facilities

#### CMS & Content Management

- **Articles** — Full CRUD with draft/published workflow, category, region, author, scheduled publish
- **Service Notices** — Active/inactive notices with expiry dates and region targeting
- **Leadership** — Executive, General Manager and Depot Manager profiles with image URL and ordering
- **Annual Reports** — Integrated annual report metadata with PDF/view URLs, `isLatest` flag (auto-exclusive)
- **Corporate Documents** — Policy and governance document catalogue

#### Database

- PostgreSQL 15 database `pikitup`
- 3 Prisma migrations applied:
  - `20260622155502_init` — Initial schema (Executive, GeneralManager, DepotManager, Depot)
  - `20260622163512_add_articles_notices` — Article and Notice models
  - `20260623082941_add_annual_reports` — AnnualReport and CorporateDocument models
- Seed data: Leadership team, depots, 4 annual reports, 4 corporate documents

#### Charts & Data Visualisation

- Recharts integration on Annual Reports page:
  - Waste Collected trend (Area chart — 2020/21 to 2023/24)
  - Recycling Rate (Bar chart)
  - Fleet Availability (Line chart)
  - Complaints Resolved (Bar chart)

---

### Technical Details

- **Next.js** 16.2.7 with Turbopack dev server
- **React** 19.2.4 with Server Components by default
- **Prisma** v7.8.0 with `@prisma/adapter-pg` (PrismaPg) adapter
- **Tailwind CSS** v4 with Radix UI primitives
- **Framer Motion** v12 for page and component animations
- **Recharts** v3.8.1 for interactive charts
- **Lucide React** v1.17 for iconography

---

### Bug Fixes

| Issue | Fix |
|---|---|
| Turbopack HMR caching stale Prisma client | Versioned `globalThis` key (`prisma_v3`) forces fresh client after schema migrations |
| `turbopack.root` config breaking module resolution | Removed `turbopack.root` from `next.config.ts` — default resolution is correct |
| Footer social icon hover using JS event handlers in Server Component | Replaced `onMouseEnter/Leave` with Tailwind `hover:` arbitrary value classes |
| Governance page parse error (unclosed JSX div) | Corrected JSX nesting in `DirectorCard` component |
| Database URL `%40` corruption in cmd.exe `set` command | Replaced cmd.exe launch with PowerShell — `%40` is not expanded |
| Annual Reports `prisma.annualReport` undefined | Stale Prisma singleton resolved by versioned global key + server restart |
| Next.js workspace root detection warning | Suppressed by fixing stale node processes; root detected correctly from project `package.json` |

---

### Known Limitations (v1.0.0)

- Portal authentication is client-side only (AuthContext + localStorage) — sufficient for internal portals but should be replaced with server-side sessions (NextAuth / Clerk) before public launch
- Annual report PDF/view URLs are placeholders — real documents need to be uploaded and URLs updated via CMS
- Collection schedule lookup is static — integration with live scheduling system is a future enhancement
- Facility finder uses Google Maps API with embedded key — key must be restricted to production domain in Google Cloud Console before go-live
- No email notifications on form submissions — SMTP integration is a future enhancement

---

### Migration Notes

If upgrading from a development instance:

1. Run `npx prisma migrate deploy` to apply any pending migrations
2. Increment Prisma global key to `prisma_v4` in `src/lib/prisma.ts` if new models were added
3. Clear `.next` cache (`Remove-Item .next -Recurse -Force`) before restarting

---

### Contributors

- Platform architecture and development: Intellehub SA
- Content and brand: Pikitup Communications
- Governance content: Pikitup Executive Office

---

## v1.1.0 — UI/UX Overhaul

**Release Date:** 25 June 2026
**Environment:** Development / Staging
**Branch:** `main`

---

### Summary

Comprehensive visual and interaction redesign of the public-facing layout. Focus areas: world-class animated header navigation, hero section clarity, quick-actions polish, homepage decluttering, and a premium footer.

---

### Changes

#### Header (`src/components/layout/Header.tsx`)

- Replaced plain text links with **coloured pill badges** — each nav item has its own Tailwind colour palette (blue for About, green for Services, emerald for Schedule, violet for Facilities, red for Report, orange for News, amber for Tenders, sky for Careers, rose for Contact, indigo for Portals dropdown)
- Added **Lucide icons** inside each pill
- **Framer Motion stagger animations** — pills slide in sequentially on mount; hover triggers lift + scale on the pill and a rotate-wobble on the icon via variant propagation
- Desktop breakpoint moved from `lg:` (1024 px) to `xl:` (1280 px) to prevent nav crowding at 10 pills
- "Find a Facility" shortened to **"Facilities"** to save horizontal space
- Removed top utility bar (portal quick-links) — portals are now accessible via the Portals dropdown pill
- Removed gold "Report Issue" button from right actions
- Active page detection via `usePathname()` adds `ring-2 ring-current/20` to the current pill
- Mobile hamburger menu breakpoint updated to `xl:hidden`; mobile items animate in with `blockSize` transition to avoid linter warnings

#### Hero (`src/components/home/Hero.tsx`)

- Removed CTA button row (Report a Problem / Find a Facility / Resident Portal)
- Removed statistics strip (4,500+ Employees, 200+ Trucks, etc.)
- **Enlarged main logo** — `h-36 sm:h-48 md:h-60`, card padding expanded
- Added **bouncing `pikitup-logo-3.png`** animation: multi-keyframe y-bounce with squish shadow, ambient glow ring, and `repeatDelay` gap so it feels playful not frantic
- Added "Recycle with Pikitup / Join 1.2M+ households making a difference" text beside the bouncing logo

#### QuickActions (`src/components/home/QuickActions.tsx`)

- Full rewrite — removed broken 3D transform animations (`rotateX/Y`, `perspective` on wrong element, `boxShadow` flash)
- New `cardVariants`: simple y + scale spring entrance with per-card stagger delay; hover = lift + scale; tap = compress
- `iconVariants`: rotate-wobble keyframe array propagated from parent `whileHover="hover"` — no separate event handler needed
- **CSS shimmer** (`group-hover:translate-x-full`) replaces Framer Motion `translateX` percentage approach — reliable cross-browser
- Scroll-triggered entrance via `useInView` with `margin: "-60px"`

#### Homepage (`src/app/(public)/page.tsx`)

- Removed `<NewsSection />` — avoids content duplication with the dedicated News & Notices page
- Removed `<PortalCTA />` — portal entry is handled by the header Portals dropdown

#### Footer (`src/components/layout/Footer.tsx`)

- **Background**: changed from near-black `#070f0a` to `bg-gradient-to-b from-green-800 via-green-900 to-green-950` — visibly rich forest green
- **Link icons**: every link in all three columns (Our Services, Quick Links, Portals & Info) now has a small coloured icon pill matching the link's category colour
- **Scroll-triggered stagger animations** via `useInView` — each column and stat card fades and slides in as the user scrolls down
- **Stat cards**: spring-pop entrance animation; amber value text on glass cards with hover glow
- Social icons: enlarged to 40 × 40 px with branded hover background + shadow-glow per platform (Facebook blue, X black, YouTube red, WhatsApp green)
- Emergency hotline band retained; URGENT badge pulsing amber
- Dot pattern overlay converted from inline `style` prop to Tailwind arbitrary-value classes (`[background-image:...]`)
- `<motion.li>` replaced with native `<li>` + inner `<motion.div>` to satisfy HTML linter

---

### Fixes

| Issue | Resolution |
| --- | --- |
| QuickActions 3D animations looked broken | Removed rotateX/Y + perspective, boxShadow flash — replaced with simple y+scale spring variants |
| Mobile menu height linter warning | Switched from `height` to the CSS logical `blockSize` property in Framer Motion |
| Footer dark near-black background | Replaced hex `#070f0a` with Tailwind green gradient |
| Inline style prop on footer dot pattern | Moved to Tailwind `[background-image:...]` arbitrary value classes |
| Footer motion.li HTML lint warning | Changed to native `<li>` + inner `<motion.div>` wrapper |

---

## Upcoming — v1.2.0 (Planned)

- Live collection schedule integration
- SMTP email on contact/report form submissions
- Server-side session authentication (NextAuth)
- Staff portal complaint workflow with status updates
- PDF upload for Annual Reports
- Performance monitoring (Sentry / Vercel Analytics)
