import type { MetadataRoute } from "next";

const BASE = "https://www.pikitup.co.za";

const SERVICE_SLUGS = [
  "household", "business", "street-sweeping", "garden-refuse",
  "recycling", "landfill", "illegal-dumping", "separation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                           lastModified: now, changeFrequency: "weekly",   priority: 1.0 },
    { url: `${BASE}/about`,                lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/about/annual-reports`, lastModified: now, changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE}/about/governance`,     lastModified: now, changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE}/services`,             lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/collection-schedule`,  lastModified: now, changeFrequency: "weekly",   priority: 0.95 },
    { url: `${BASE}/find-facility`,        lastModified: now, changeFrequency: "monthly",  priority: 0.85 },
    { url: `${BASE}/report`,               lastModified: now, changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE}/news`,                 lastModified: now, changeFrequency: "daily",    priority: 0.8 },
    { url: `${BASE}/recycling-education`,  lastModified: now, changeFrequency: "monthly",  priority: 0.75 },
    { url: `${BASE}/tenders`,              lastModified: now, changeFrequency: "weekly",   priority: 0.7 },
    { url: `${BASE}/careers`,              lastModified: now, changeFrequency: "weekly",   priority: 0.7 },
    { url: `${BASE}/contact`,              lastModified: now, changeFrequency: "yearly",   priority: 0.8 },
    { url: `${BASE}/privacy-policy`,       lastModified: now, changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE}/terms`,                lastModified: now, changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE}/accessibility`,        lastModified: now, changeFrequency: "yearly",   priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
