import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Notices",
  description:
    "Latest news, service notices, disruption alerts and announcements from Pikitup Johannesburg.",
};

const articles = [
  {
    id: 1,
    category: "Service Notice",
    badge: "destructive" as const,
    title: "Collection delays affecting Region D — Soweto (Zones 4-7)",
    excerpt:
      "Due to fleet maintenance, refuse collection in parts of Soweto will be delayed by 1 day. Affected areas: Meadowlands, Dobsonville, Dlamini. Collections will resume normal schedule from Thursday 11 June.",
    date: "8 June 2026",
    region: "Region D",
    href: "/news/collection-delay-region-d",
  },
  {
    id: 2,
    category: "Public Holiday",
    badge: "warning" as const,
    title: "Youth Day — 16 June 2026 Collection Notice",
    excerpt:
      "All refuse collection scheduled for Monday 16 June will be shifted to Tuesday 17 June 2026. Garden refuse collection is suspended for the week of 15 June. Residents are requested to leave bins/bags out on Tuesday.",
    date: "5 June 2026",
    region: "All Regions",
    href: "/news/youth-day-notice",
  },
  {
    id: 3,
    category: "Campaign",
    badge: "secondary" as const,
    title: "Pikitup Launches City-Wide Separation at Source Programme",
    excerpt:
      "Pikitup is rolling out separation at source collection across all 7 regions, starting with Region A (Johannesburg North). Residents in the pilot areas will receive colour-coded bags and a guide.",
    date: "6 June 2026",
    region: "Region A",
    href: "/news/separation-launch",
  },
  {
    id: 4,
    category: "Facility Notice",
    badge: "warning" as const,
    title: "Midrand Garden Refuse Site — Temporary Capacity Reduction",
    excerpt:
      "The Midrand Garden Refuse Site is operating at reduced capacity from 9 June 2026 due to infrastructure maintenance works. Residents are encouraged to use the Halfway House site alternatively.",
    date: "4 June 2026",
    region: "Region E",
    href: "/news/midrand-capacity",
  },
  {
    id: 5,
    category: "News",
    badge: "default" as const,
    title: "Pikitup Wins National Waste Management Excellence Award 2026",
    excerpt:
      "Pikitup Johannesburg has been recognised for innovation in urban waste reduction at the 2026 National Waste Summit in Cape Town. The award recognises outstanding performance in community recycling programmes.",
    date: "1 June 2026",
    region: "All",
    href: "/news/excellence-award",
  },
  {
    id: 6,
    category: "Scam Alert",
    badge: "destructive" as const,
    title: "Procurement Scam Warning — Fake Pikitup Tender Emails",
    excerpt:
      "Pikitup has been made aware of fraudulent emails claiming to offer tender opportunities. These emails are NOT from Pikitup. All official tenders are published only on this website. Do not pay any money.",
    date: "30 May 2026",
    region: "All",
    href: "/news/scam-alert",
  },
];

const categories = [
  "All",
  "Service Notice",
  "Public Holiday",
  "Campaign",
  "Facility Notice",
  "News",
  "Scam Alert",
  "Media Statement",
];

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
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

      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              Filter:
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    cat === "All"
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="space-y-4">
            {articles.map((article) => (
              <Link key={article.id} href={article.href} className="group block">
                <Card className="hover:shadow-md hover:border-green-200 transition-all">
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={article.badge}>{article.category}</Badge>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {article.region}
                          </span>
                        </div>
                        <h2 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-green-700 transition-colors">
                          {article.title}
                        </h2>
                        <p className="text-xs text-gray-500 leading-relaxed">{article.excerpt}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </div>
                        <span className="text-xs text-green-700 font-medium group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors">
              Load more articles
            </button>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-12 px-4 bg-green-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Stay Informed
          </h2>
          <p className="text-gray-600 text-sm mb-5">
            Subscribe to receive service notices and updates for your area directly to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
