import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding annual reports and corporate documents…");

  await prisma.annualReport.deleteMany();
  await prisma.corporateDocument.deleteMany();

  const reports = [
    {
      title:       "Integrated Annual Report 2023/2024",
      year:        "2023/2024",
      type:        "Integrated Annual Report",
      description: "Comprehensive report covering financial performance, operations, sustainability, governance and stakeholder engagement for the 2023/24 financial year.",
      pages:       184,
      pdfUrl:      null,
      viewUrl:     null,
      isLatest:    true,
      order:       1,
    },
    {
      title:       "Integrated Annual Report 2022/2023",
      year:        "2022/2023",
      type:        "Integrated Annual Report",
      description: "Full-year performance report covering all operational areas, financial statements, and strategic milestones achieved during the 2022/23 year.",
      pages:       176,
      pdfUrl:      null,
      viewUrl:     null,
      isLatest:    false,
      order:       2,
    },
    {
      title:       "Integrated Annual Report 2021/2022",
      year:        "2021/2022",
      type:        "Integrated Annual Report",
      description: "Annual performance and governance report for the financial year ending 30 June 2022, including Covid-19 recovery and fleet modernisation progress.",
      pages:       168,
      pdfUrl:      null,
      viewUrl:     null,
      isLatest:    false,
      order:       3,
    },
    {
      title:       "Integrated Annual Report 2020/2021",
      year:        "2020/2021",
      type:        "Integrated Annual Report",
      description: "Annual report covering the full 2020/21 financial year, including the impact of the Covid-19 pandemic on waste management operations.",
      pages:       160,
      pdfUrl:      null,
      viewUrl:     null,
      isLatest:    false,
      order:       4,
    },
  ];

  for (const r of reports) {
    await prisma.annualReport.create({ data: r });
  }
  console.log(`  ✓ ${reports.length} annual reports`);

  const docs = [
    {
      title:       "Corporate Governance Framework",
      description: "Pikitup's governance structure, board charter and committee mandates.",
      category:    "Governance",
      fileUrl:     null,
      order:       1,
    },
    {
      title:       "Quarterly Performance Reports",
      description: "Q1–Q4 operational performance reports submitted to the Shareholder.",
      category:    "Operational",
      fileUrl:     null,
      order:       2,
    },
    {
      title:       "Strategic Plan 2024–2028",
      description: "Five-year strategic plan setting out Pikitup's objectives and targets.",
      category:    "Strategic",
      fileUrl:     null,
      order:       3,
    },
    {
      title:       "Tariff Schedules",
      description: "Current approved tariff schedules for all Pikitup services.",
      category:    "Financial",
      fileUrl:     null,
      order:       4,
    },
  ];

  for (const d of docs) {
    await prisma.corporateDocument.create({ data: d });
  }
  console.log(`  ✓ ${docs.length} corporate documents`);

  console.log("✅ Annual reports seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
