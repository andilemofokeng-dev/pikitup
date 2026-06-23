import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding articles and notices…");

  await prisma.article.deleteMany();
  await prisma.notice.deleteMany();

  // Articles from CMS mock data + public news mock data
  const articles = [
    {
      id: "a1",
      title: "Separation at Source Initiative Expanded to Region B",
      slug: "separation-source-region-b",
      category: "Initiative",
      excerpt: "Pikitup is proud to announce the expansion of the Separation at Source programme into Region B — Johannesburg East, starting 1 July 2026.",
      body: "Pikitup is rolling out the Separation at Source initiative to Region B (Johannesburg East) starting 1 July 2026. Residents will receive colour-coded bags and a comprehensive sorting guide. This programme aims to divert 30% of household waste from landfill.\n\nResidents in the pilot areas — including Bedfordview, Edenvale and Germiston — will receive their starter kits during the week of 28 June 2026.\n\nFor more information, contact your local depot or visit our website.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "Region B",
      tags: "separation-at-source,recycling,region-b",
      views: 1243,
      publishedAt: new Date("2026-06-08"),
    },
    {
      id: "a2",
      title: "Pikitup Celebrates 25 Years of Waste Management Excellence",
      slug: "25-years",
      category: "Corporate",
      excerpt: "This year marks a significant milestone — 25 years of Pikitup serving the residents of Greater Johannesburg with integrated waste management services.",
      body: "Pikitup Johannesburg SOC Limited celebrates its 25th anniversary this year, having served over 1.2 million households across Greater Johannesburg since its establishment in 2001.\n\nOver the past 25 years, Pikitup has grown from a small municipal entity to a world-class waste management company, processing over 1,500 tonnes of waste daily across 12 operational depots.\n\nThe milestone will be celebrated with community events across all seven regions throughout June and July 2026.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "anniversary,corporate,milestone",
      views: 3891,
      publishedAt: new Date("2026-06-01"),
    },
    {
      id: "a3",
      title: "New Drop-off Centres Opening in Soweto This Month",
      slug: "new-dropoff-soweto",
      category: "Infrastructure",
      excerpt: "Three new recycling drop-off centres will open in Soweto during June 2026, bringing the total to 47 drop-off points across Greater Johannesburg.",
      body: "Pikitup is pleased to announce the opening of three new recycling drop-off centres in Soweto this month. The centres, located in Meadowlands, Zola and Dlamini, will accept paper, plastic, glass and tin for recycling.\n\nThe new facilities are part of Pikitup's Infrastructure Investment Programme and represent a R12 million investment in the Soweto community.\n\nOperating hours: Monday to Saturday, 07:00 to 17:00.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "Region D",
      tags: "infrastructure,recycling,soweto",
      views: 876,
      publishedAt: new Date("2026-05-28"),
    },
    {
      id: "a4",
      title: "World Environment Day: Pikitup Recycling Campaign Highlights",
      slug: "world-env-day",
      category: "Environment",
      excerpt: "Pikitup marked World Environment Day with a city-wide recycling drive, collecting over 45 tonnes of recyclable material across all seven regions.",
      body: "On 5 June 2026, Pikitup joined municipalities worldwide in celebrating World Environment Day with a special city-wide recycling drive.\n\nIn partnership with local schools, NGOs and community organisations, Pikitup collected 45.7 tonnes of recyclable material — the largest single-day recycling collection in the company's history.\n\n'This achievement demonstrates what is possible when communities come together with a shared purpose,' said the Managing Director Ms Bukelwa Njingolo.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "environment,recycling,world-environment-day",
      views: 2109,
      publishedAt: new Date("2026-06-05"),
    },
    {
      id: "a5",
      title: "Q2 2026 Service Delivery Report",
      slug: "q2-2026-report",
      category: "Report",
      excerpt: "The Q2 2026 service delivery report highlights operational performance, complaint resolution rates and fleet availability across all depots.",
      body: "Draft content for Q2 report…",
      status: "draft",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "report,service-delivery",
      views: 0,
      publishedAt: null,
    },
    {
      id: "a6",
      title: "Winter Collection Schedule Adjustments 2026",
      slug: "winter-schedule",
      category: "Operations",
      excerpt: "From 1 July 2026, collection times in certain areas will be adjusted to accommodate shorter daylight hours and increased waste volumes during winter.",
      body: "Pikitup will implement winter collection schedule adjustments effective 1 July 2026. The changes affect early-morning and late-afternoon collection rounds in Regions A, C and E.\n\nResidents are encouraged to place bins out the night before their scheduled collection day during the winter months.",
      status: "scheduled",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "operations,winter,schedule",
      views: 0,
      publishedAt: new Date("2026-06-15"),
    },
    {
      id: "a7",
      title: "Pikitup Wins National Waste Management Excellence Award 2026",
      slug: "excellence-award",
      category: "News",
      excerpt: "Pikitup Johannesburg has been recognised for innovation in urban waste reduction at the 2026 National Waste Summit in Cape Town.",
      body: "Pikitup Johannesburg has received the National Waste Management Excellence Award at the 2026 National Waste Summit held in Cape Town on 1 June 2026.\n\nThe award recognises outstanding performance in community recycling programmes and innovation in integrated waste management.\n\nThis is Pikitup's third national award in five years, cementing its position as a leader in the South African waste management sector.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "award,excellence,news",
      views: 542,
      publishedAt: new Date("2026-06-01"),
    },
    {
      id: "a8",
      title: "Procurement Scam Warning — Fake Pikitup Tender Emails",
      slug: "scam-alert",
      category: "Alert",
      excerpt: "Pikitup has been made aware of fraudulent emails claiming to offer tender opportunities. These emails are NOT from Pikitup. All official tenders are published only on this website.",
      body: "Pikitup Johannesburg SOC Limited wishes to warn the public about fraudulent emails claiming to be from Pikitup offering tender or procurement opportunities.\n\nThese emails are NOT from Pikitup. All official tenders are published exclusively on this website under the Tenders section.\n\nIf you receive a suspicious email, do not respond or pay any money. Report fraudulent emails to fraud@pikitup.co.za or call the fraud hotline: 0800 002 587.",
      status: "published",
      author: "Ayanda Mahlangu",
      region: "All",
      tags: "scam,fraud,alert,tenders",
      views: 1876,
      publishedAt: new Date("2026-05-30"),
    },
  ];

  for (const a of articles) {
    await prisma.article.create({ data: a });
  }
  console.log(`  ✓ ${articles.length} articles`);

  // Notices from CMS mock data
  const notices = [
    {
      id: "n1",
      title: "Youth Day 16 June — Collection Schedule Changes",
      body: "All Tuesday collections in Regions A, B, and E will move to Wednesday 17 June due to the public holiday.",
      type: "warning",
      region: "All Regions",
      active: true,
      expiresAt: new Date("2026-06-17"),
    },
    {
      id: "n2",
      title: "Northcliff Garden Refuse Site — Temporary Closure",
      body: "The Northcliff Garden Refuse site is temporarily closed for major repair works and will reopen on 30 June 2026.",
      type: "urgent",
      region: "Region A",
      active: true,
      expiresAt: new Date("2026-06-30"),
    },
    {
      id: "n3",
      title: "Separation at Source Bags — Delivery Schedule",
      body: "Separation at Source bags will be delivered to all registered households in Region A between 12–16 June.",
      type: "info",
      region: "Region A",
      active: true,
      expiresAt: null,
    },
    {
      id: "n4",
      title: "Public Holiday Collection — Freedom Day",
      body: "Collections that fell on 27 April moved to Saturday 28 April.",
      type: "info",
      region: "All Regions",
      active: false,
      expiresAt: new Date("2026-04-30"),
    },
  ];

  for (const n of notices) {
    await prisma.notice.create({ data: n });
  }
  console.log(`  ✓ ${notices.length} notices`);

  console.log("✅ Content seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
