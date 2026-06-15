"use client";
import Link from "next/link";
import { Newspaper, Bell, Briefcase, FileText, HelpCircle, MapPin, Plus, ArrowRight, Eye } from "lucide-react";

const CONTENT_TYPES = [
  { href: "/cms-portal/articles",   label: "News & Articles",  icon: Newspaper,  count: 24, draft: 3, color: "from-blue-700 to-blue-900",    border: "border-blue-800/30" },
  { href: "/cms-portal/notices",    label: "Service Notices",  icon: Bell,        count: 8,  draft: 1, color: "from-yellow-600 to-yellow-800", border: "border-yellow-800/30" },
  { href: "/cms-portal/tenders",    label: "Tenders & RFQs",   icon: Briefcase,   count: 12, draft: 2, color: "from-green-700 to-green-900",   border: "border-green-800/30" },
  { href: "/cms-portal/vacancies",  label: "Vacancies",        icon: FileText,    count: 5,  draft: 0, color: "from-purple-700 to-purple-900", border: "border-purple-800/30" },
  { href: "/cms-portal/faqs",       label: "FAQs",             icon: HelpCircle,  count: 18, draft: 0, color: "from-teal-700 to-teal-900",     border: "border-teal-800/30" },
  { href: "/cms-portal/facilities", label: "Facilities",       icon: MapPin,      count: 8,  draft: 0, color: "from-orange-700 to-orange-900", border: "border-orange-800/30" },
];

const RECENT = [
  { type: "Article",  title: "Separation at Source Initiative Expanded to Region B", status: "Published", time: "2h ago", author: "Ayanda M." },
  { type: "Notice",   title: "Youth Day 16 June — Collection Schedule Changes",      status: "Published", time: "6h ago", author: "Ayanda M." },
  { type: "Tender",   title: "PKT-RFQ-2026-047: Supply of Collection Bins",         status: "Draft",     time: "1d ago", author: "Ayanda M." },
  { type: "Vacancy",  title: "Regional Manager — Johannesburg South",               status: "Published", time: "2d ago", author: "Ayanda M." },
];

export default function CmsDashboardPage() {
  return (
    <div className="space-y-7">
      {/* Content type grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTENT_TYPES.map(({ href, label, icon: Icon, count, draft, color, border }) => (
          <div key={href} className={`bg-slate-900 rounded-2xl border ${border} p-5 flex flex-col gap-4`}>
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1.5">
                <Link href={`${href}/new`}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title="New item"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Link>
                <Link href={href}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title="View all"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300">{label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-white">{count}</span>
                <span className="text-xs text-slate-500">published</span>
                {draft > 0 && <span className="text-xs text-yellow-400 font-semibold">{draft} draft{draft > 1?"s":""}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-sm">Recent Activity</h3>
          <span className="text-xs text-slate-500">{RECENT.length} items</span>
        </div>
        <div className="divide-y divide-slate-800">
          {RECENT.map((r) => (
            <div key={r.title} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full mt-0.5 whitespace-nowrap">{r.type}</span>
                <div>
                  <p className="text-sm font-medium text-white">{r.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.author} · {r.time}</p>
                </div>
              </div>
              <span className={`ml-4 shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${r.status === "Published" ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
