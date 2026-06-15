import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowUpRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/animate";

const featured = {
  id: 1,
  category: "Campaign",
  badge: "secondary" as const,
  title: "Pikitup Launches City-Wide Separation at Source Programme",
  excerpt:
    "Pikitup is rolling out a colour-coded separation at source programme across all 7 regions, starting with Region A (Johannesburg North). Residents will receive green, orange and black bags and a comprehensive waste guide.",
  date: "6 June 2026",
  readTime: "3 min read",
  seed: "city-green-1",
  href: "/news/separation-at-source-launch",
};

const secondary = [
  {
    id: 2,
    category: "Notice",
    badge: "warning" as const,
    title: "Midrand Garden Refuse Site — Temporary Capacity Reduction",
    excerpt: "The Midrand Garden Refuse Site is operating at reduced capacity from 9 June due to infrastructure maintenance.",
    date: "4 June 2026",
    seed: "nature-garden",
    href: "/news/midrand-capacity",
  },
  {
    id: 3,
    category: "News",
    badge: "default" as const,
    title: "Pikitup Wins National Waste Management Excellence Award 2026",
    excerpt: "Recognised for outstanding innovation in urban waste reduction at the 2026 National Waste Summit.",
    date: "1 June 2026",
    seed: "award-office",
    href: "/news/excellence-award",
  },
  {
    id: 4,
    category: "Scam Alert",
    badge: "destructive" as const,
    title: "Warning: Fraudulent Tender Emails Circulating",
    excerpt: "Pikitup does not request payment to participate in tenders. All official tenders are on this website only.",
    date: "30 May 2026",
    seed: "warning-alert",
    href: "/news/scam-alert",
  },
];

export default function NewsSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="section-label">Stay informed</span>
            <h2 className="section-heading">Latest News &amp; Notices</h2>
            <p className="section-subheading mb-0">
              Service updates, campaigns and critical announcements
            </p>
          </div>
          <Link
            href="/news"
            className="flex items-center gap-1.5 text-green-700 font-bold text-sm hover:text-green-900 shrink-0 group"
          >
            All news <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured article */}
          <SlideIn direction="left" className="lg:col-span-2">
            <Link href={featured.href} className="group block h-full">
              <div className="premium-card h-full overflow-hidden rounded-2xl">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${featured.seed}/900/400`}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant={featured.badge}>{featured.category}</Badge>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-black text-gray-900 mb-3 leading-snug group-hover:text-green-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {featured.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> {featured.readTime}
                      </span>
                    </div>
                    <span className="text-green-700 text-xs font-bold group-hover:underline flex items-center gap-1">
                      Read more <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SlideIn>

          {/* Secondary articles */}
          <SlideIn direction="right">
            <StaggerContainer className="flex flex-col gap-4 h-full" stagger={0.1}>
              {secondary.map((article) => (
                <StaggerItem key={article.id} className="flex-1">
                  <Link href={article.href} className="group block h-full">
                    <div className="premium-card h-full rounded-2xl overflow-hidden flex">
                      {/* Thumbnail */}
                      <div className="relative w-24 shrink-0">
                        <Image
                          src={`https://picsum.photos/seed/${article.seed}/200/200`}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="96px"
                        />
                      </div>
                      {/* Text */}
                      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <Badge variant={article.badge} className="mb-2 text-[10px]">
                            {article.category}
                          </Badge>
                          <h3 className="text-xs font-bold text-gray-900 leading-snug mb-1 group-hover:text-green-700 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 hidden sm:block">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
                          <Calendar className="w-3 h-3" /> {article.date}
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
