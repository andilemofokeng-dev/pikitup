"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type TenderStatus = "open" | "closing-soon" | "awarded" | "cancelled";

interface Tender {
  id: string; refNumber: string; title: string; type: "Tender" | "RFQ";
  description: string; value: string; closingDate: string;
  status: TenderStatus;
}

const MOCK_TENDERS: Tender[] = [
  { id:"t1", refNumber:"PKT-T-2026-019", title:"Provision of Compactor Trucks — Fleet Expansion", type:"Tender", description:"Supply and delivery of 12 × 10-tonne rear-loader compactor trucks.", value:"R 48,000,000", closingDate:"2026-07-15", status:"open" },
  { id:"t2", refNumber:"PKT-RFQ-2026-047", title:"Supply of 240L Wheelie Bins", type:"RFQ", description:"Supply of 10,000 units of 240-litre HDPE wheelie bins in two colours.", value:"R 2,800,000", closingDate:"2026-06-20", status:"closing-soon" },
  { id:"t3", refNumber:"PKT-T-2026-011", title:"Provision of Mobile Hazardous Waste Units", type:"Tender", description:"Design, supply and operation of 4 mobile HHW collection units.", value:"R 12,000,000", closingDate:"2026-04-30", status:"awarded" },
  { id:"t4", refNumber:"PKT-RFQ-2026-039", title:"Supply of PPE for Field Teams", type:"RFQ", description:"Annual supply of PPE for 1,200 field operatives.", value:"R 1,200,000", closingDate:"2026-06-30", status:"open" },
];

const STATUS_CONFIG: Record<TenderStatus, string> = {
  "open":          "bg-green-900/30 text-green-400 border-green-800/30",
  "closing-soon":  "bg-yellow-900/30 text-yellow-400 border-yellow-800/30",
  "awarded":       "bg-blue-900/30 text-blue-400 border-blue-800/30",
  "cancelled":     "bg-gray-800 text-gray-400 border-gray-700",
};

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>(MOCK_TENDERS);
  const [search, setSearch]   = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ refNumber:"", title:"", type:"RFQ" as "Tender"|"RFQ", description:"", value:"", closingDate:"", status:"open" as TenderStatus });

  const filtered = tenders.filter((t) =>
    !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.refNumber.toLowerCase().includes(search.toLowerCase())
  );

  function save() {
    if (!form.title || !form.refNumber) return;
    setTenders([{ id:`t${Date.now()}`, ...form }, ...tenders]);
    setForm({ refNumber:"", title:"", type:"RFQ", description:"", value:"", closingDate:"", status:"open" });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tenders…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <button type="button" onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> New Tender / RFQ
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-violet-800/40 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">New Tender / RFQ</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.refNumber} onChange={(e) => setForm({...form,refNumber:e.target.value})} placeholder="Reference number…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
            <select value={form.type} onChange={(e) => setForm({...form,type:e.target.value as "Tender"|"RFQ"})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
            >
              <option>Tender</option><option>RFQ</option>
            </select>
          </div>
          <input value={form.title} onChange={(e) => setForm({...form,title:e.target.value})} placeholder="Title…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
          <textarea value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} rows={2} placeholder="Description…"
            className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 resize-none transition-colors"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.value} onChange={(e) => setForm({...form,value:e.target.value})} placeholder="Estimated value (R)…"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
            <input type="date" value={form.closingDate} onChange={(e) => setForm({...form,closingDate:e.target.value})}
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={save} className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">Publish</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {["Reference","Type","Title","Value","Closing Date","Status",""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-5 py-3.5 text-xs font-mono text-violet-400 whitespace-nowrap">{t.refNumber}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{t.type}</span>
                  </td>
                  <td className="px-5 py-3.5 max-w-64">
                    <p className="font-medium text-white line-clamp-1">{t.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-300 whitespace-nowrap font-medium">{t.value || "—"}</td>
                  <td className="px-5 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-slate-600" />{t.closingDate || "—"}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize", STATUS_CONFIG[t.status])}>
                      {t.status.replace("-"," ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button type="button" className="p-1.5 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
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
