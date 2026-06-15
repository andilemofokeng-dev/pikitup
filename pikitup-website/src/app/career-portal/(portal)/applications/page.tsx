"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_APPLICATIONS, MOCK_CAREER_VACANCIES } from "@/lib/mock-data";
import { APPLICATION_STATUS_LABELS } from "@/lib/types";
import type { ApplicationStatus } from "@/lib/types";
import { Search, Filter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  submitted:           "bg-slate-800 text-slate-300",
  screening:           "bg-blue-900/40 text-blue-400",
  shortlisted:         "bg-emerald-900/40 text-emerald-400",
  interview_scheduled: "bg-violet-900/40 text-violet-400",
  interviewed:         "bg-teal-900/40 text-teal-400",
  offer_made:          "bg-yellow-900/40 text-yellow-400",
  hired:               "bg-green-900/40 text-green-400",
  rejected:            "bg-red-900/40 text-red-400",
  withdrawn:           "bg-slate-800 text-slate-500",
};

const ALL_STATUSES = Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[];

export default function HRApplicationsPage() {
  const [search, setSearch]   = useState("");
  const [vacancyFilter, setVacancyFilter] = useState("");
  const [statusFilter, setStatusFilter]   = useState<ApplicationStatus | "">("");

  const apps = MOCK_APPLICATIONS.filter((a) => {
    const matchSearch  = !search || a.applicantName.toLowerCase().includes(search.toLowerCase()) || a.applicantEmail.toLowerCase().includes(search.toLowerCase());
    const matchVacancy = !vacancyFilter || a.vacancyId === vacancyFilter;
    const matchStatus  = !statusFilter  || a.status === statusFilter;
    return matchSearch && matchVacancy && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applicants…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)} aria-label="Filter by vacancy"
            className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
          >
            <option value="">All Vacancies</option>
            {MOCK_CAREER_VACANCIES.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "")} aria-label="Filter by status"
            className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => <option key={s} value={s}>{APPLICATION_STATUS_LABELS[s]}</option>)}
          </select>
        </div>
      </div>

      <div className="text-xs text-slate-500">{apps.length} application{apps.length !== 1 ? "s" : ""}</div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Position</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Applied</th>
                <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {apps.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-slate-500">No applications match your filters.</td></tr>
              ) : apps.map((a) => (
                <tr key={a.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-white">{a.applicantName.split(" ").map((n) => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{a.applicantName}</p>
                        <p className="text-xs text-slate-500">{a.applicantEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <p className="text-slate-300 line-clamp-1">{a.vacancyTitle}</p>
                    <p className="text-xs text-slate-500">{a.department}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell text-slate-400 text-xs">
                    {new Date(a.appliedAt).toLocaleDateString("en-ZA")}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full", STATUS_COLORS[a.status])}>
                      {APPLICATION_STATUS_LABELS[a.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link href={`/career-portal/applications/${a.id}`} className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-400 hover:bg-emerald-900/20 transition-colors inline-flex">
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
