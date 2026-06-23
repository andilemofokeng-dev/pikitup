# Deployment Guide — Pikitup Digital Clean City Platform

## 1. Prerequisites

| Requirement | Minimum Version |
|---|---|
| Node.js | 24 LTS |
| npm | 11+ |
| PostgreSQL | 15+ |
| Hosting | Vercel / Ubuntu 22.04+ VPS / Docker |

---

## 2. Environment Variables

All environments require the following variables. Never commit these to source control.

```env
# PostgreSQL connection — URL-encode special chars (@ → %40)
DATABASE_URL=postgresql://postgres:password%40@host:5432/pikitup

# CMS authentication (server-side secret)
ADMIN_PASSWORD=strong-secret-here

# CMS token exposed to browser (must match ADMIN_PASSWORD)
NEXT_PUBLIC_CMS_TOKEN=strong-secret-here

# Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
```

---

## 3. Option A — Vercel (Recommended)

Vercel has native Next.js support with zero-config deployment.

### 3.1 Initial Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from project root
cd pikitup-website
vercel
```

### 3.2 Environment Variables in Vercel

In the Vercel dashboard → Project → Settings → Environment Variables, add:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_CMS_TOKEN`
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### 3.3 Database

Use a managed PostgreSQL provider accessible from Vercel's network:

- **Neon** (recommended — serverless PostgreSQL, free tier)
- **Supabase**
- **Railway**
- **Render PostgreSQL**

```bash
# After setting DATABASE_URL to production DB, run migrations
npx prisma migrate deploy

# Seed initial data
npx tsx prisma/seed.ts
npx tsx prisma/seed-annual-reports.ts
```

### 3.4 Production Deploy

```bash
vercel --prod
```

---

## 4. Option B — VPS / Ubuntu Server

### 4.1 Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 24 LTS via NodeSource
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2 (process manager)
npm install -g pm2
```

### 4.2 PostgreSQL Setup

```bash
# Switch to postgres user
sudo -i -u postgres

# Create database and user
psql
CREATE DATABASE pikitup;
CREATE USER pikitup_user WITH ENCRYPTED PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE pikitup TO pikitup_user;
\q
exit
```

### 4.3 Application Deployment

```bash
# Clone repository
git clone <repo-url> /var/www/pikitup
cd /var/www/pikitup/pikitup-website

# Install dependencies
npm ci --omit=dev

# Create .env.local
nano .env.local
# (add all environment variables)

# Run migrations
npx prisma migrate deploy

# Seed data
npx tsx prisma/seed.ts
npx tsx prisma/seed-annual-reports.ts

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "pikitup" -- start
pm2 save
pm2 startup
```

### 4.4 Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name pikitup.co.za www.pikitup.co.za;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable config
sudo ln -s /etc/nginx/sites-available/pikitup /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d pikitup.co.za -d www.pikitup.co.za
```

---

## 5. Option C — Docker

### 5.1 Dockerfile

```dockerfile
FROM node:24-alpine AS base

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

### 5.2 Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: pikitup
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourpassword
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: ./pikitup-website
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:yourpassword@postgres:5432/pikitup
      ADMIN_PASSWORD: your-secret
      NEXT_PUBLIC_CMS_TOKEN: your-secret
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: AIza...
    depends_on:
      - postgres

volumes:
  postgres_data:
```

```bash
# Start
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx tsx prisma/seed.ts
```

---

## 6. Database Migrations in Production

**Never use `prisma migrate dev` in production.** Use `migrate deploy` which applies pending migrations without prompting.

```bash
# Apply all pending migrations
npx prisma migrate deploy

# Verify migration status
npx prisma migrate status
```

### Migration Workflow

```
Local Development          Staging / Production
─────────────────          ────────────────────
prisma migrate dev    →    git push
(creates migration)        CI/CD runs: prisma migrate deploy
(updates schema.prisma)
```

---

## 7. Post-Deployment Checklist

```
□ DATABASE_URL points to production database
□ ADMIN_PASSWORD is strong and unique
□ NEXT_PUBLIC_CMS_TOKEN matches ADMIN_PASSWORD
□ All migrations applied (prisma migrate status shows no pending)
□ Seed data present (check /about/leadership and /about/annual-reports)
□ Homepage loads at production URL
□ /cms-portal/login accessible
□ /about/annual-reports shows charts and report cards
□ All 6 service pages return 200 (/services/household, /services/business, etc.)
□ SSL certificate active (https://)
□ PM2 / Docker container set to restart on boot
□ Database backups scheduled
```

---

## 8. Scaling Considerations

| Concern | Recommendation |
|---|---|
| Database connection pooling | Use PgBouncer or Neon's built-in pooling |
| Static assets | Serve via CDN (Vercel Edge Network or Cloudflare) |
| Session state | Currently client-side only — add Redis for server sessions at scale |
| Image optimisation | Next.js Image component handles it; ensure `remotePatterns` covers all domains |
| Monitoring | Add Sentry for error tracking; Vercel Analytics for performance |
