"use client";
import { useState } from "react";
import Link from "next/link";
import { MOCK_CAREER_VACANCIES } from "@/lib/mock-data";
import type { CareerVacancy } from "@/lib/types";
import { Plus, Search, Edit2, Users, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  open:          { label: "Open",         color: "bg-emerald-900/30 text-emerald-400 border-emerald-800/30" },
  "closing-soon":{ label: "Closing Soon", color: "bg-yellow-900/30 text-yellow-400 border-yellow-800/30" },
  filled:        { label: "Filled",       color: "bg-blue-900/30 text-blue-400 border-blue-800/30" },
  cancelled:     { label: "Cancelled",    color: "bg-slate-800 text-slate-500 border-slate-700" },
};

export default function HRVacanciesPage() {
  const [vacancies, setVacancies] = useState<CareerVacancy[]>(MOCK_CAREER_VACANCIES);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", department: "Operations", type: "Permanent" as CareerVacancy["type"],
    region: "", grade: "", salary: "", closingDate: "", description: "", status: "open" as CareerVacancy["status"],
  });

  const filtered = vacancies.filter((v) =>
    !search || v.title.toLowerCase().includes(search.toLowerCase()) || v.department.toLowerCase().includes(search.toLowerCase())
  );

  function saveVacancy() {
    if (!form.title) return;
    setVacancies([{
      id: `vac-${Date.now()}`, ...form, posted: new Date().toISOString().slice(0,10),
      requirements: [], responsibilities: [], applicationCount: 0,
    }, ...vacancies]);
    setShowForm(false);
    setForm({ title:"", department:"Operations", type:"Permanent", region:"", grade:"", salary:"", closingDate:"", description:"", status:"open" });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vacancies…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Post Vacancy
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-emerald-800/40 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">New Vacancy</h3>
          <input value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} placeholder="Job title…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
          />
          <div className="grid sm:grid-cols-3 gap-3">
            <input value={form.department} onChange={(e) => setForm({...form,department:e.target.value})} placeholder="Department…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            />
            <select value={form.type} onChange={(e) => setForm({...form,type:e.target.value as CareerVacancy["type"]})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
            >
              <option>Permanent</option><option>Fixed-Term</option><option>Contract</option>
            </select>
            <input value={form.grade} onChange={(e) => setForm({...form,grade:e.target.value})} placeholder="Grade…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.region} onChange={(e) => setForm({...form,region:e.target.value})} placeholder="Region / location…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            />
            <input value={form.salary} onChange={(e) => setForm({...form,salary:e.target.value})} placeholder="Salary range (CTC)…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="date" value={form.closingDate} onChange={(e) => setForm({...form,closingDate:e.target.value})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} rows={3} placeholder="Job description…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none transition-colors"
          />
          <div className="flex gap-3">
            <button type="button" onClick={saveVacancy} className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors">Publish Vacancy</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((v) => {
          const cfg = STATUS_CONFIG[v.status];
          return (
            <div key={v.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-white">{v.title}</h3>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", cfg.color)}>{cfg.label}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{v.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    <span className="font-medium text-slate-400">{v.department}</span>
                    <span>{v.region}</span>
                    <span>Grade {v.grade}</span>
                    {v.salary && <span className="text-emerald-400">{v.salary}</span>}
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Closes {v.closingDate}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{v.description}</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-center">
                    <div className="text-xl font-black text-white">{v.applicationCount}</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" />applicants</div>
                  </div>
                  <div className="flex gap-1">
                    <button type="button" className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit"><Edit2 className="w-3.5 h-3.5" /></button>
                    <Link href={`/career-portal/vacancies/${v.id}`} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="View applications"><ArrowRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
