import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ChevronRight, Tag, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "News & Notices | Pikitup Johannesburg",
  description:
    "Latest news, service notices, disruption alerts and announcements from Pikitup Johannesburg.",
};

export const dynamic = "force-dynamic";

const CATEGORY_COLOURS: Record<string, string> = {
  "Service Notice":  "bg-red-100 text-red-700",
  "Public Holiday":  "bg-yellow-100 text-yellow-700",
  Campaign:          "bg-purple-100 text-purple-700",
  "Facility Notice": "bg-orange-100 text-orange-700",
  News:              "bg-blue-100 text-blue-700",
  "Scam Alert":      "bg-red-100 text-red-800",
  Initiative:        "bg-green-100 text-green-700",
  Corporate:         "bg-slate-100 text-slate-700",
  Infrastructure:    "bg-cyan-100 text-cyan-700",
  Environment:       "bg-emerald-100 text-emerald-700",
  Report:            "bg-indigo-100 text-indigo-700",
  Operations:        "bg-amber-100 text-amber-700",
  Alert:             "bg-red-100 text-red-700",
  default:           "bg-gray-100 text-gray-700",
};

export default async function NewsPage() {
  const [articles, notices] = await Promise.all([
    prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 20,
    }),
    prisma.notice.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>News & Notices</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">News & Notices</h1>
          <p className="text-green-100 text-xl max-w-2xl">
            Service disruptions, public holiday updates, campaigns, media statements and
            important announcements from Pikitup Johannesburg.
          </p>
        </div>
      </section>

      {/* Active service notices banner */}
      {notices.length > 0 && (
        <section className="bg-amber-50 border-y border-amber-200 py-4 px-4">
          <div className="max-w-7xl mx-auto space-y-2">
            {notices.map((n) => (
              <div key={n.id} className="flex items-start gap-3 text-sm">
                <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                  n.type === "urgent"  ? "bg-red-100 text-red-700" :
                  n.type === "warning" ? "bg-yellow-100 text-yellow-700" :
                  n.type === "success" ? "bg-green-100 text-green-700" :
                                         "bg-blue-100 text-blue-700"
                }`}>{n.type.toUpperCase()}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800">{n.title}</span>
                  {" — "}
                  <span className="text-gray-600">{n.body}</span>
                </div>
                <span className="shrink-0 text-[11px] text-gray-400 whitespace-nowrap">{n.region}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category filter (static — categories derived from DB) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <span key={cat}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  cat === "All" ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600"
                }`}>
                {cat}
              </span>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold mb-2">No articles published yet.</p>
              <p className="text-sm">Check back soon for news and updates.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((article) => {
                const colour = CATEGORY_COLOURS[article.category] ?? CATEGORY_COLOURS.default;
                return (
                  <Link key={article.id} href={`/news/${article.slug}`} className="group block">
                    <div className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition-all bg-white">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${colour}`}>
                              {article.category}
                            </span>
                            {article.region && article.region !== "All" && (
                              <span className="flex items-center gap-1 text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                <MapPin className="w-2.5 h-2.5" />{article.region}
                              </span>
                            )}
                            {article.tags && (
                              <span className="flex items-center gap-1 text-[11px] text-gray-400">
                                <Tag className="w-2.5 h-2.5" />{article.tags.split(",")[0]?.trim()}
                              </span>
                            )}
                          </div>
                          <h2 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-green-700 transition-colors">
                            {article.title}
                          </h2>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{article.excerpt}</p>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                          {article.publishedAt && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(article.publishedAt).toLocaleDateString("en-ZA", {
                                day: "numeric", month: "long", year: "numeric",
                              })}
                            </div>
                          )}
                          <span className="text-xs text-green-700 font-medium group-hover:underline">Read more →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <div className="text-center mt-8">
            <p className="text-xs text-gray-400">{articles.length} article{articles.length !== 1 ? "s" : ""} published</p>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Stay Informed</h2>
          <p className="text-gray-600 text-sm mb-5">
            Subscribe to receive service notices and updates for your area directly to your inbox.
          </p>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email address" aria-label="Email address"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="button" className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
