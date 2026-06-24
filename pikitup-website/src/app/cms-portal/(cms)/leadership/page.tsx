"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { apiUrl } from "@/lib/base-path";
import {
  Plus, Edit2, Trash2, RefreshCw, X, Save,
  ChevronDown, ChevronRight, Users, Building2, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN ?? "";
const AUTH      = { Authorization: `Bearer ${CMS_TOKEN}` };
const JSON_HDR  = { "Content-Type": "application/json", ...AUTH };

interface Executive   { id:string; name:string; title:string; abbreviation:string; department:string; bio:string; imageUrl:string|null; email?:string; order:number }
interface GeneralMgr  { id:string; name:string; cluster:string; imageUrl?:string|null; order:number }
interface DepotMgr    { id:string; name:string; depot:string; role:"Regional Manager"|"Operations Manager"; imageUrl?:string|null; order:number }
interface Leadership  { executives:Executive[]; generalManagers:GeneralMgr[]; depotManagers:DepotMgr[]; depots:string[] }

type Section = "executives" | "generalManagers" | "depotManagers";

function initials(name:string){ const p=name.replace(/^(Ms|Mr|Dr)\.?\s/i,"").trim().split(" "); return (p[0]?.[0]??"")+(p[p.length-1]?.[0]??""); }

// ─── Modal form ────────────────────────────────────────────────────────────────
interface ModalProps {
  section: Section;
  initial?: Record<string,string|number>;
  depots: string[];
  onClose: ()=>void;
  onSave: (section:Section, item:Record<string,unknown>, id?:string)=>Promise<void>;
}
function Modal({ section, initial, depots, onClose, onSave }: ModalProps) {
  const isNew = !initial?.id;
  const [form, setForm] = useState<Record<string,string>>(
    section==="executives" ? {
      name:         String(initial?.name        ?? ""),
      title:        String(initial?.title       ?? ""),
      abbreviation: String(initial?.abbreviation?? ""),
      department:   String(initial?.department  ?? ""),
      bio:          String(initial?.bio         ?? ""),
      imageUrl:     String(initial?.imageUrl    ?? ""),
      email:        String(initial?.email       ?? ""),
      order:        String(initial?.order       ?? "99"),
    } : section==="generalManagers" ? {
      name:     String(initial?.name    ?? ""),
      cluster:  String(initial?.cluster ?? ""),
      imageUrl: String(initial?.imageUrl?? ""),
      order:    String(initial?.order   ?? "99"),
    } : {
      name:     String(initial?.name    ?? ""),
      depot:    String(initial?.depot   ?? depots[0] ?? ""),
      role:     String(initial?.role    ?? "Operations Manager"),
      imageUrl: String(initial?.imageUrl?? ""),
      order:    String(initial?.order   ?? "99"),
    }
  );
  const [saving, setSaving] = useState(false);

  function set(k:string, v:string){ setForm(f=>({...f,[k]:v})); }

  async function handleSubmit(e:React.FormEvent){ e.preventDefault(); setSaving(true); await onSave(section,{...form,order:Number(form.order)},initial?.id as string|undefined); setSaving(false); }

  const TITLES: Record<Section,string> = { executives:"Executive", generalManagers:"General Manager", depotManagers:"Depot Manager" };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h3 className="font-bold text-white text-sm">{isNew?"Add":"Edit"} {TITLES[section]}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          {/* Common: name */}
          <Field label="Full Name" value={form.name} onChange={v=>set("name",v)} required />

          {section==="executives" && <>
            <Field label="Title / Role" value={form.title} onChange={v=>set("title",v)} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Abbreviation (e.g. MD)" value={form.abbreviation} onChange={v=>set("abbreviation",v)} required />
              <Field label="Order" type="number" value={form.order} onChange={v=>set("order",v)} />
            </div>
            <Field label="Department" value={form.department} onChange={v=>set("department",v)} required />
            <Field label="Email" type="email" value={form.email} onChange={v=>set("email",v)} />
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Bio</label>
              <textarea value={form.bio} onChange={e=>set("bio",e.target.value)} rows={4} required
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 resize-none transition-colors" />
            </div>
            <Field label="Photo URL" value={form.imageUrl} onChange={v=>set("imageUrl",v)} placeholder="https://…" />
            {form.imageUrl && (
              <div className="relative h-24 rounded-xl overflow-hidden bg-slate-800">
                <Image src={form.imageUrl} alt="preview" fill className="object-cover object-top" unoptimized />
              </div>
            )}
          </>}

          {section==="generalManagers" && <>
            <Field label="Cluster" value={form.cluster} onChange={v=>set("cluster",v)} required />
            <Field label="Order" type="number" value={form.order} onChange={v=>set("order",v)} />
            <Field label="Photo URL" value={form.imageUrl} onChange={v=>set("imageUrl",v)} placeholder="https://…" />
          </>}

          {section==="depotManagers" && <>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Depot</label>
              <select value={form.depot} onChange={e=>set("depot",e.target.value)} aria-label="Depot"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
                {depots.map(d=><option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Role</label>
              <select value={form.role} onChange={e=>set("role",e.target.value)} aria-label="Role"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
                <option>Regional Manager</option>
                <option>Operations Manager</option>
              </select>
            </div>
            <Field label="Order" type="number" value={form.order} onChange={v=>set("order",v)} />
            <Field label="Photo URL" value={form.imageUrl} onChange={v=>set("imageUrl",v)} placeholder="https://…" />
          </>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
              <Save className="w-3.5 h-3.5"/>{saving?"Saving…":isNew?"Add":"Update"}
            </button>
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required=false, type="text", placeholder="" }: {
  label:string; value:string; onChange:(v:string)=>void; required?:boolean; type?:string; placeholder?:string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} required={required}
        placeholder={placeholder} aria-label={label}
        className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 transition-colors" />
    </div>
  );
}

// ─── Avatar chip ───────────────────────────────────────────────────────────────
function Avatar({ src, name, size=32, className="" }: { src?:string|null; name:string; size?:number; className?:string }) {
  if (src) return <Image src={src} alt={name} width={size} height={size} className={cn("rounded-full object-cover object-top",className)} unoptimized />;
  return (
    <div style={{width:size,height:size,fontSize:size*0.35}} className={cn("rounded-full bg-violet-800 flex items-center justify-center text-white font-bold shrink-0",className)}>
      {initials(name)}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function LeadershipCmsPage() {
  const [data, setData]         = useState<Leadership|null>(null);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState<Section>("executives");
  const [modal, setModal]       = useState<{section:Section;item?:Record<string,string|number>}|null>(null);
  const [expanded, setExpanded] = useState<Record<string,boolean>>({});
  const [toast, setToast]       = useState("");

  const load = useCallback(async ()=>{
    setLoading(true);
    try {
      const r = await fetch(apiUrl("/api/admin/leadership"));
      const j = await r.json() as Leadership;
      setData(j);
    } finally { setLoading(false); }
  },[]);

  useEffect(()=>{ load(); },[load]);

  function showToast(msg:string){ setToast(msg); setTimeout(()=>setToast(""),3000); }

  async function handleSave(section:Section, item:Record<string,unknown>, id?:string) {
    const method = id ? "PUT" : "POST";
    const body   = id ? JSON.stringify({section, item:{...item,id}}) : JSON.stringify({section, item});
    const res    = await fetch(apiUrl("/api/admin/leadership"), { method, headers:JSON_HDR, body });
    if (!res.ok) { showToast("Save failed."); return; }
    showToast(id ? "Updated!" : "Added!");
    setModal(null);
    load();
  }

  async function handleDelete(section:Section, id:string) {
    if (!confirm("Delete this person? This cannot be undone.")) return;
    await fetch(apiUrl("/api/admin/leadership"), {
      method:"DELETE", headers:JSON_HDR,
      body: JSON.stringify({section,id}),
    });
    showToast("Deleted.");
    load();
  }

  const TABS: {key:Section;label:string;icon:React.ElementType}[] = [
    {key:"executives",     label:"Executives",      icon:Star},
    {key:"generalManagers",label:"General Managers", icon:Users},
    {key:"depotManagers",  label:"Depot Managers",   icon:Building2},
  ];

  if (loading || !data) return (
    <div className="flex items-center justify-center py-20 text-slate-600 text-sm gap-2">
      <RefreshCw className="w-4 h-4 animate-spin"/> Loading leadership data…
    </div>
  );

  // Group depot managers by depot
  const byDepot = data.depotManagers.reduce<Record<string,DepotMgr[]>>((acc,m)=>{ (acc[m.depot]??=[]).push(m); return acc; },{});

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-violet-700 text-violet-300 text-sm px-4 py-2.5 rounded-xl shadow-xl transition-all">
          {toast}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <Modal
          section={modal.section}
          initial={modal.item}
          depots={data.depots}
          onClose={()=>setModal(null)}
          onSave={handleSave}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-lg">Leadership</h2>
          <p className="text-slate-500 text-xs mt-0.5">
            {data.executives.length} executives · {data.generalManagers.length} GMs · {data.depotManagers.length} depot managers · {data.depots.length} depots
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} title="Refresh" aria-label="Refresh"
            className="p-2.5 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors">
            <RefreshCw className="w-4 h-4"/>
          </button>
          <button type="button" onClick={()=>setModal({section:tab})}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">
            <Plus className="w-4 h-4"/> Add {tab==="executives"?"Executive":tab==="generalManagers"?"GM":"Manager"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl w-fit">
        {TABS.map(({key,label,icon:Icon})=>(
          <button key={key} type="button" onClick={()=>setTab(key)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              tab===key ? "bg-violet-700 text-white shadow" : "text-slate-400 hover:text-white hover:bg-white/5")}>
            <Icon className="w-3.5 h-3.5"/>{label}
          </button>
        ))}
      </div>

      {/* ── EXECUTIVES ── */}
      {tab==="executives" && (
        <div className="space-y-3">
          {[...data.executives].sort((a,b)=>a.order-b.order).map(exec=>(
            <div key={exec.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 group hover:border-violet-800/40 transition-all">
              <Avatar src={exec.imageUrl} name={exec.name} size={48} className="border-2 border-slate-700"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-bold text-sm">{exec.name}</span>
                  <span className="text-[10px] font-bold bg-green-900/30 text-green-400 border border-green-800/30 px-2 py-0.5 rounded-full">{exec.abbreviation}</span>
                </div>
                <p className="text-xs text-violet-400 font-medium">{exec.title}</p>
                <p className="text-[11px] text-slate-500">{exec.department}</p>
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={()=>setModal({section:"executives",item:exec as unknown as Record<string,string|number>})}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                  <Edit2 className="w-3.5 h-3.5"/>
                </button>
                <button type="button" onClick={()=>handleDelete("executives",exec.id)}
                  className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={()=>setModal({section:"executives"})}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-700 hover:border-violet-600 text-slate-500 hover:text-violet-400 text-sm rounded-2xl transition-colors">
            <Plus className="w-4 h-4"/> Add Executive
          </button>
        </div>
      )}

      {/* ── GENERAL MANAGERS ── */}
      {tab==="generalManagers" && (
        <div className="space-y-3">
          {[...data.generalManagers].sort((a,b)=>a.order-b.order).map(gm=>(
            <div key={gm.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 group hover:border-violet-800/40 transition-all">
              <Avatar src={gm.imageUrl} name={gm.name} size={40}/>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{gm.name}</p>
                <p className="text-xs text-blue-400">{gm.cluster}</p>
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={()=>setModal({section:"generalManagers",item:gm as unknown as Record<string,string|number>})}
                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                  <Edit2 className="w-3.5 h-3.5"/>
                </button>
                <button type="button" onClick={()=>handleDelete("generalManagers",gm.id)}
                  className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={()=>setModal({section:"generalManagers"})}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-700 hover:border-violet-600 text-slate-500 hover:text-violet-400 text-sm rounded-2xl transition-colors">
            <Plus className="w-4 h-4"/> Add General Manager
          </button>
        </div>
      )}

      {/* ── DEPOT MANAGERS — grouped by depot ── */}
      {tab==="depotManagers" && (
        <div className="space-y-2">
          {data.depots.map(depot=>{
            const people = (byDepot[depot]??[]).sort((a,b)=>a.order-b.order);
            const isOpen = expanded[depot]??true;
            return (
              <div key={depot} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {/* Depot header */}
                <button type="button" onClick={()=>setExpanded(e=>({...e,[depot]:!isOpen}))}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left">
                  <div className="w-7 h-7 bg-violet-900/40 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-violet-400"/>
                  </div>
                  <span className="text-sm font-bold text-white flex-1">{depot}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full mr-2">{people.length}</span>
                  {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500"/> : <ChevronRight className="w-4 h-4 text-slate-500"/>}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-800 divide-y divide-slate-800">
                    {people.map(m=>(
                      <div key={m.id} className="flex items-center gap-3 px-4 py-2.5 group hover:bg-white/5 transition-colors">
                        <Avatar src={m.imageUrl} name={m.name} size={32}
                          className={m.role==="Regional Manager"?"border border-purple-700":"border border-indigo-700"}/>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white truncate">{m.name}</p>
                          <span className={`text-[10px] font-semibold ${m.role==="Regional Manager"?"text-purple-400":"text-indigo-400"}`}>
                            {m.role}
                          </span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={()=>setModal({section:"depotManagers",item:m as unknown as Record<string,string|number>})}
                            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-500 hover:text-white transition-colors" title="Edit">
                            <Edit2 className="w-3 h-3"/>
                          </button>
                          <button type="button" onClick={()=>handleDelete("depotManagers",m.id)}
                            className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-500 hover:text-red-400 transition-colors" title="Delete">
                            <Trash2 className="w-3 h-3"/>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-2">
                      <button type="button" onClick={()=>setModal({section:"depotManagers",item:{depot,role:"Operations Manager",order:99} as unknown as Record<string,string|number>})}
                        className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-violet-400 transition-colors">
                        <Plus className="w-3 h-3"/> Add manager to {depot}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <button type="button" onClick={()=>setModal({section:"depotManagers"})}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-700 hover:border-violet-600 text-slate-500 hover:text-violet-400 text-sm rounded-2xl transition-colors">
            <Plus className="w-4 h-4"/> Add Manager
          </button>
        </div>
      )}
    </div>
  );
}
