# Pikitup CMS — Strapi Setup

## Requirement
Strapi requires Node.js >=20.0.0 and <=24.x.x.
Your current environment has Node 26, so run this on a machine with Node 20 or 22 LTS.

## Quick Setup (fresh machine)

```bash
# 1. Install nvm (Node version manager)
# https://github.com/nvm-sh/nvm

# 2. Install Node 22 LTS
nvm install 22
nvm use 22

# 3. Scaffold Strapi in this directory
cd pikitup-cms
npx create-strapi-app@latest . --quickstart

# Or for PostgreSQL (recommended for production):
npx create-strapi-app@latest . --dbclient=postgres --dbhost=localhost --dbport=5432 --dbname=pikitup_cms --dbusername=pikitup --dbpassword=yourpassword
```

## Planned Content Types

| Content Type   | Fields                                                                         |
|----------------|--------------------------------------------------------------------------------|
| Article        | title, slug, body (rich text), category, region, publishedAt, author, featured |
| ServiceNotice  | title, type (critical/warning/info), region, depot, body, publishedAt, active  |
| Facility       | name, type, region, address, gps, hours, accepts[], status, phone, notice       |
| Tender         | ref, title, type (Tender/RFQ), description, value, closingDate, status, docs[] |
| Vacancy        | ref, title, department, type, location, closingDate, description, requirements  |
| CollectionArea | suburb, region, depot, collectionDay, recyclingDay, gardenDay, notes           |
| FaqItem        | question, answer, category, order                                              |
| Homepage       | heroTitle, heroSubtitle, statItems[], featuredNoticeId                         |

## CMS User Roles (configure in Strapi admin)

- Super Admin — full access
- Content Editor — create/edit drafts
- Communications Manager — publish articles and notices
- Supply Chain Officer — manage tenders
- HR Officer — manage vacancies
- Facility Manager — manage facilities
- Read-only — view only

## API Integration (Next.js side)

Set in `pikitup-website/.env.local`:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

Then fetch in Next.js:
```ts
const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=*`, {
  headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  next: { revalidate: 60 },
});
const { data } = await res.json();
```
