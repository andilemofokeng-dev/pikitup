"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, X, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notices = [
  {
    id: 1,
    type: "critical",
    title: "WARNING: Procurement Fraud — Pikitup Name Being Used Fraudulently",
    summary:
      "Pikitup is aware of scammers falsely representing themselves as Pikitup officials and issuing fake orders. Only emails from @pikitup.co.za are authentic. Report suspicious activity to the SAPS or Pikitup directly.",
    date: "2026",
    href: "/news/fraud-warning",
  },
  {
    id: 2,
    type: "warning",
    title: "Public Holiday Notice — Youth Day 16 June 2026",
    summary:
      "All refuse collection scheduled for Monday 16 June will shift to Tuesday 17 June. Garden refuse collection is suspended for that week.",
    date: "05 June 2026",
    href: "/news/youth-day-notice",
  },
  {
    id: 3,
    type: "info",
    title: "'A Re Sebetseng' Monthly Clean-Up Campaign",
    summary:
      "Join Pikitup's monthly volunteer clean-up campaign. Communities, schools and businesses are encouraged to participate in keeping Johannesburg clean.",
    date: "Monthly",
    href: "/news/a-re-sebetseng",
  },
];

const typeConfig = {
  critical: { badge: "destructive" as const, color: "border-red-200 bg-red-50" },
  warning: { badge: "warning" as const, color: "border-yellow-200 bg-yellow-50" },
  info: { badge: "info" as const, color: "border-blue-200 bg-blue-50" },
};

export default function NoticesBanner() {
  const [dismissed, setDismissed] = useState<number[]>([]);

  const visible = notices.filter((n) => !dismissed.includes(n.id));
  if (visible.length === 0) return null;

  return (
    <section className="bg-white px-4 py-6">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm font-semibold text-gray-700">Active Service Notices</span>
          <Link
            href="/news?category=notice"
            className="ml-auto text-xs text-green-700 hover:underline font-medium flex items-center gap-1"
          >
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        {visible.map((notice) => {
          const config = typeConfig[notice.type as keyof typeof typeConfig];
          return (
            <div
              key={notice.id}
              className={`flex items-start gap-3 p-4 rounded-xl border ${config.color}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant={config.badge}>{notice.type.toUpperCase()}</Badge>
                  <span className="text-xs text-gray-500">{notice.date}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{notice.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{notice.summary}</p>
                <Link
                  href={notice.href}
                  className="text-xs text-green-700 font-medium hover:underline mt-1 inline-block"
                >
                  Read more →
                </Link>
              </div>
              <button
                onClick={() => setDismissed((d) => [...d, notice.id])}
                className="p-1 hover:bg-black/5 rounded-lg transition-colors shrink-0"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
