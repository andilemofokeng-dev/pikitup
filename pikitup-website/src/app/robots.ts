import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/staff-portal/",
          "/admin-portal/",
          "/cms-portal/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.pikitup.co.za/sitemap.xml",
    host: "https://www.pikitup.co.za",
  };
}
