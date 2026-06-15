"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, AlertCircle, Bell, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type NoticeType = "urgent" | "info" | "success" | "warning";

interface Notice {
  id: string; title: string; body: string; type: NoticeType;
  region: string; active: boolean; createdAt: string; expiresAt?: string;
}

const MOCK_NOTICES: Notice[] = [
  { id:"n1", title:"Youth Day 16 June — Collection Schedule Changes", body:"All Tuesday collections in Regions A, B, and E will move to Wednesday 17 June due to the public holiday.", type:"warning", region:"All Regions", active:true, createdAt:"2026-06-05", expiresAt:"2026-06-17" },
  { id:"n2", title:"Northcliff Garden Refuse Site — Temporary Closure", body:"The Northcliff Garden Refuse site is temporarily closed for major repair works and will reopen on 30 June 2026.", type:"urgent", region:"Region A", active:true, createdAt:"2026-06-01", expiresAt:"2026-06-30" },
  { id:"n3", title:"Separation at Source Bags — Delivery Schedule", body:"Separation at Source bags will be delivered to all registered households in Region A between 12–16 June.", type:"info", region:"Region A", active:true, createdAt:"2026-06-08" },
  { id:"n4", title:"Public Holiday Collection — Freedom Day", body:"Collections that fell on 27 April moved to Saturday 28 April.", type:"info", region:"All Regions", active:false, createdAt:"2026-04-20", expiresAt:"2026-04-30" },
];

const TYPE_CONFIG: Record<NoticeType, { label: string; icon: React.ElementType; color: string }> = {
  urgent:  { label:"Urgent",  icon:AlertCircle, color:"bg-red-900/30 text-red-400 border-red-800/30" },
  warning: { label:"Warning", icon:Bell,        color:"bg-yellow-900/30 text-yellow-400 border-yellow-800/30" },
  info:    { label:"Info",    icon:Info,        color:"bg-blue-900/30 text-blue-400 border-blue-800/30" },
  success: { label:"Success", icon:CheckCircle, color:"bg-green-900/30 text-green-400 border-green-800/30" },
};

export default function NoticesPage() {
  const [notices, setNotices]   = useState<Notice[]>(MOCK_NOTICES);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody]   = useState("");
  const [newType, setNewType]   = useState<NoticeType>("info");
  const [newRegion, setNewRegion] = useState("All Regions");

  function addNotice() {
    if (!newTitle || !newBody) return;
    setNotices([{
      id:`n${Date.now()}`, title: newTitle, body: newBody, type: newType,
      region: newRegion, active: true, createdAt: new Date().toISOString().slice(0,10),
    }, ...notices]);
    setNewTitle(""); setNewBody(""); setNewType("info"); setShowForm(false);
  }

  function toggleActive(id: string) {
    setNotices(notices.map((n) => n.id === id ? { ...n, active: !n.active } : n));
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button type="button" onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" /> New Notice
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-violet-800/40 p-5 space-y-4">
          <h3 className="font-bold text-white text-sm">Create Service Notice</h3>
          <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Notice title…"
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
          <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={3} placeholder="Notice body…"
            className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 resize-none transition-colors"
          />
          <div className="flex gap-3">
            <select value={newType} onChange={(e) => setNewType(e.target.value as NoticeType)}
              className="flex-1 bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
            >
              {Object.entries(TYPE_CONFIG).map(([v,{label}]) => <option key={v} value={v}>{label}</option>)}
            </select>
            <select value={newRegion} onChange={(e) => setNewRegion(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors"
            >
              {["All Regions","Region A","Region B","Region C","Region D","Region E","Region F","Region G"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={addNotice} className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">Publish Notice</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {notices.map((n) => {
          const cfg  = TYPE_CONFIG[n.type];
          const Icon = cfg.icon;
          return (
            <div key={n.id} className={cn("bg-slate-900 rounded-2xl border p-5", n.active ? "border-slate-800" : "border-slate-800 opacity-60")}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className={cn("flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 mt-0.5", cfg.color)}>
                    <Icon className="w-3 h-3" />{cfg.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{n.title}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.body}</p>
                    <div className="flex gap-4 mt-2 text-[11px] text-slate-600">
                      <span>{n.region}</span>
                      <span>Created {n.createdAt}</span>
                      {n.expiresAt && <span>Expires {n.expiresAt}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", n.active ? "bg-green-900/30 text-green-400" : "bg-slate-800 text-slate-500")}>
                    {n.active ? "Active" : "Inactive"}
                  </span>
                  <button type="button" onClick={() => toggleActive(n.id)} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Toggle">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
