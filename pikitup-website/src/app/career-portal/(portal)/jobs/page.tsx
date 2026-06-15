"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_CAREER_VACANCIES } from "@/lib/mock-data";
import { Search, MapPin, Briefcase, Calendar, ArrowRight, Clock } from "lucide-react";

const TYPE_OPTIONS = ["All Types", "Permanent", "Fixed-Term", "Contract"];
const DEPT_OPTIONS = ["All Departments", ...Array.from(new Set(MOCK_CAREER_VACANCIES.map((v) => v.department)))];

export default function BrowseJobsPage() {
  const [search, setSearch] = useState("");
  const [type, setType]     = useState("All Types");
  const [dept, setDept]     = useState("All Departments");

  const jobs = MOCK_CAREER_VACANCIES.filter((v) => {
    if (v.status === "filled" || v.status === "cancelled") return false;
    const matchSearch = !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.department.toLowerCase().includes(search.toLowerCase());
    const matchType   = type === "All Types"        || v.type       === type;
    const matchDept   = dept === "All Departments"  || v.department === dept;
    return matchSearch && matchType && matchDept;
  });

  const closingSoon = jobs.filter((v) => v.status === "closing-soon");

  return (
    <div className="space-y-6">
      {/* Alert strip for closing-soon positions */}
      {closingSoon.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-2xl px-5 py-3 flex items-center gap-2 text-sm text-yellow-400">
          <Clock className="w-4 h-4 shrink-0" />
          <span><strong>{closingSoon.length}</strong> position{closingSoon.length !== 1 ? "s" : ""} closing soon — apply before the deadline!</span>
        </div>
      )}

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search positions…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by contract type"
          className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
        >
          {TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department"
          className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
        >
          {DEPT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <p className="text-xs text-slate-500">{jobs.length} open position{jobs.length !== 1 ? "s" : ""}</p>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Briefcase className="w-10 h-10 mx-auto mb-3 text-slate-700" />
          <p>No positions match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((v) => (
            <Link key={v.id} href={`/career-portal/jobs/${v.id}`}
              className="block bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{v.title}</h3>
                    {v.status === "closing-soon" && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-900/30 text-yellow-400 border border-yellow-800/30">Closing Soon</span>
                    )}
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{v.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-slate-600" />{v.department}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-600" />{v.region}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-600" />Closes {v.closingDate}</span>
                    {v.salary && <span className="text-emerald-400 font-medium">{v.salary}</span>}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{v.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
