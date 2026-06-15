"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type VacancyStatus = "open" | "closing-soon" | "filled" | "cancelled";

interface Vacancy {
  id: string; title: string; department: string; type: "Permanent" | "Fixed-Term" | "Contract";
  region: string; grade: string; closingDate: string; status: VacancyStatus; posted: string;
}

const MOCK_VACANCIES: Vacancy[] = [
  { id:"v1", title:"Regional Manager — Johannesburg South", department:"Operations", type:"Permanent", region:"Region C", grade:"M3", closingDate:"2026-06-30", status:"open", posted:"2026-06-02" },
  { id:"v2", title:"Fleet Controller", department:"Fleet Management", type:"Permanent", region:"All Regions", grade:"C5", closingDate:"2026-06-18", status:"closing-soon", posted:"2026-06-04" },
  { id:"v3", title:"Communication Officer", department:"Communications", type:"Fixed-Term", region:"Head Office", grade:"C3", closingDate:"2026-07-10", status:"open", posted:"2026-06-08" },
  { id:"v4", title:"Supply Chain Specialist", department:"Supply Chain", type:"Permanent", region:"Head Office", grade:"C4", closingDate:"2026-05-31", status:"filled", posted:"2026-05-01" },
];

const STATUS_CONFIG: Record<VacancyStatus, string> = {
  open:          "bg-green-900/30 text-green-400 border-green-800/30",
  "closing-soon":"bg-yellow-900/30 text-yellow-400 border-yellow-800/30",
  filled:        "bg-blue-900/30 text-blue-400 border-blue-800/30",
  cancelled:     "bg-gray-800 text-gray-400 border-gray-700",
};

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>(MOCK_VACANCIES);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title:"", department:"Operations", type:"Permanent" as Vacancy["type"], region:"", grade:"", closingDate:"", status:"open" as VacancyStatus });

  const filtered = vacancies.filter((v) => !search || v.title.toLowerCase().includes(search.toLowerCase()));

  function save() {
    if (!form.title) return;
    setVacancies([{ id:`v${Date.now()}`, ...form, posted: new Date().toISOString().slice(0,10) }, ...vacancies]);
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vacancies…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> Post Vacancy
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-violet-800/40 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">Post New Vacancy</h3>
          <input value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} placeholder="Job title…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
          <div className="grid sm:grid-cols-3 gap-3">
            <input value={form.department} onChange={(e) => setForm({...form,department:e.target.value})} placeholder="Department…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
            <select value={form.type} onChange={(e) => setForm({...form,type:e.target.value as Vacancy["type"]})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
            >
              <option>Permanent</option><option>Fixed-Term</option><option>Contract</option>
            </select>
            <input value={form.grade} onChange={(e) => setForm({...form,grade:e.target.value})} placeholder="Grade / band…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.region} onChange={(e) => setForm({...form,region:e.target.value})} placeholder="Region / location…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
            <input type="date" value={form.closingDate} onChange={(e) => setForm({...form,closingDate:e.target.value})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">Publish Vacancy</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((v) => (
          <div key={v.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-white">{v.title}</h3>
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", STATUS_CONFIG[v.status])}>{v.status.replace("-"," ")}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="font-medium text-slate-400">{v.department}</span>
                  <span>{v.type}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{v.region}</span>
                  <span>Grade {v.grade}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Closes {v.closingDate || "—"}</span>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button type="button" className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1.5 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
