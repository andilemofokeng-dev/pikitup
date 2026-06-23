"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, RefreshCw, X, Save, Download, Star, FileText, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN ?? "";
const AUTH  = { Authorization: `Bearer ${TOKEN}` };
const JAUTH = { "Content-Type": "application/json", ...AUTH };

interface Report {
  id: string; title: string; year: string; type: string;
  description: string; pages: number | null; pdfUrl: string | null;
  viewUrl: string | null; isLatest: boolean; order: number; createdAt: string;
}
interface Doc {
  id: string; title: string; description: string; category: string;
  fileUrl: string | null; order: number;
}

const EMPTY_REPORT: Omit<Report,"id"|"createdAt"> = {
  title:"", year:"", type:"Integrated Annual Report", description:"",
  pages:null, pdfUrl:null, viewUrl:null, isLatest:false, order:99,
};
const EMPTY_DOC: Omit<Doc,"id"> = {
  title:"", description:"", category:"Corporate", fileUrl:null, order:99,
};

type Panel = { kind:"report"; item?:Report } | { kind:"doc"; item?:Doc } | null;

function Field({ label, value, onChange, type="text", placeholder="", textarea=false }: {
  label:string; value:string; onChange:(v:string)=>void; type?:string; placeholder?:string; textarea?:boolean;
}) {
  const cls = "w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 transition-colors";
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
      {textarea
        ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={3} aria-label={label} className={cn(cls,"resize-none")} />
        : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} aria-label={label} className={cls} />}
    </div>
  );
}

// ── Report form modal ─────────────────────────────────────────────────────────
function ReportModal({ item, onClose, onSave }: { item?:Report; onClose:()=>void; onSave:(data:Record<string,unknown>, id?:string)=>Promise<void> }) {
  const [form, setForm] = useState({
    title:       item?.title       ?? "",
    year:        item?.year        ?? "",
    type:        item?.type        ?? "Integrated Annual Report",
    description: item?.description ?? "",
    pages:       String(item?.pages ?? ""),
    pdfUrl:      item?.pdfUrl      ?? "",
    viewUrl:     item?.viewUrl     ?? "",
    isLatest:    item?.isLatest    ?? false,
    order:       String(item?.order ?? 99),
  });
  const [saving, setSaving] = useState(false);
  const set = (k:string,v:string|boolean)=>setForm(f=>({...f,[k]:v}));

  async function submit(e:React.FormEvent){ e.preventDefault(); setSaving(true);
    await onSave({...form, pages:form.pages?Number(form.pages):null, order:Number(form.order),
      pdfUrl:form.pdfUrl||null, viewUrl:form.viewUrl||null }, item?.id);
    setSaving(false); }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h3 className="font-bold text-white text-sm">{item?"Edit":"Add"} Annual Report</h3>
          <button type="button" onClick={onClose} aria-label="Close"><X className="w-4 h-4 text-slate-500 hover:text-white"/></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Year (e.g. 2023/2024)" value={form.year} onChange={v=>set("year",v)} required placeholder="2023/2024" />
            <Field label="Pages" type="number" value={form.pages} onChange={v=>set("pages",v)} placeholder="184" />
          </div>
          <Field label="Title" value={form.title} onChange={v=>set("title",v)} placeholder="Integrated Annual Report 2023/2024" />
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Type</label>
            <select value={form.type} onChange={e=>set("type",e.target.value)} aria-label="Type"
              className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
              <option>Integrated Annual Report</option>
              <option>Sustainability Report</option>
              <option>Financial Statements</option>
              <option>Abridged Annual Report</option>
            </select>
          </div>
          <Field label="Description" value={form.description} onChange={v=>set("description",v)} textarea placeholder="Summary of this report…" />
          <Field label="PDF URL" value={form.pdfUrl} onChange={v=>set("pdfUrl",v)} placeholder="https://…/report.pdf" />
          <Field label="View Online URL" value={form.viewUrl} onChange={v=>set("viewUrl",v)} placeholder="https://…/view" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Order" type="number" value={form.order} onChange={v=>set("order",v)} />
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isLatest} onChange={e=>set("isLatest",e.target.checked)}
                  className="w-4 h-4 accent-violet-600" />
                <span className="text-sm text-slate-300 font-medium">Mark as Latest</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
              <Save className="w-3.5 h-3.5"/>{saving?"Saving…":item?"Update":"Add Report"}
            </button>
            <button type="button" onClick={onClose} className="px-5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Corporate doc form modal ──────────────────────────────────────────────────
function DocModal({ item, onClose, onSave }: { item?:Doc; onClose:()=>void; onSave:(data:Record<string,unknown>, id?:string)=>Promise<void> }) {
  const [form, setForm] = useState({
    title:       item?.title       ?? "",
    description: item?.description ?? "",
    category:    item?.category    ?? "Corporate",
    fileUrl:     item?.fileUrl     ?? "",
    order:       String(item?.order ?? 99),
  });
  const [saving, setSaving] = useState(false);
  const set = (k:string,v:string)=>setForm(f=>({...f,[k]:v}));
  async function submit(e:React.FormEvent){ e.preventDefault(); setSaving(true);
    await onSave({...form, order:Number(form.order), fileUrl:form.fileUrl||null}, item?.id);
    setSaving(false); }
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h3 className="font-bold text-white text-sm">{item?"Edit":"Add"} Corporate Document</h3>
          <button type="button" onClick={onClose} aria-label="Close"><X className="w-4 h-4 text-slate-500 hover:text-white"/></button>
        </div>
        <form onSubmit={submit} className="p-5 space-y-3">
          <Field label="Title" value={form.title} onChange={v=>set("title",v)} required />
          <Field label="Description" value={form.description} onChange={v=>set("description",v)} textarea />
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
            <select value={form.category} onChange={e=>set("category",e.target.value)} aria-label="Category"
              className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
              <option>Corporate</option><option>Governance</option><option>Financial</option>
              <option>Strategic</option><option>Operational</option>
            </select>
          </div>
          <Field label="File URL (optional)" value={form.fileUrl} onChange={v=>set("fileUrl",v)} placeholder="https://…/doc.pdf" />
          <Field label="Order" type="number" value={form.order} onChange={v=>set("order",v)} />
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
              <Save className="w-3.5 h-3.5"/>{saving?"Saving…":item?"Update":"Add Document"}
            </button>
            <button type="button" onClick={onClose} className="px-5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AnnualReportsCmsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [docs,    setDocs]    = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState<"reports"|"docs">("reports");
  const [panel,   setPanel]   = useState<Panel>(null);
  const [toast,   setToast]   = useState("");

  function showToast(msg:string){ setToast(msg); setTimeout(()=>setToast(""),3000); }

  const load = useCallback(async()=>{
    setLoading(true);
    const [r1,r2] = await Promise.all([fetch("/api/cms/annual-reports"), fetch("/api/cms/corporate-docs")]);
    const [j1,j2] = await Promise.all([r1.json(),r2.json()]);
    setReports(j1.reports??[]); setDocs(j2.docs??[]);
    setLoading(false);
  },[]);

  useEffect(()=>{ load(); },[load]);

  async function saveReport(data:Record<string,unknown>, id?:string){
    const method = id?"PUT":"POST";
    const url    = id?`/api/cms/annual-reports/${id}`:"/api/cms/annual-reports";
    const res    = await fetch(url,{method,headers:JAUTH,body:JSON.stringify(data)});
    if(!res.ok){ showToast("Save failed."); return; }
    showToast(id?"Report updated!":"Report added!"); setPanel(null); load();
  }
  async function deleteReport(id:string){
    if(!confirm("Delete this report?")) return;
    await fetch(`/api/cms/annual-reports/${id}`,{method:"DELETE",headers:AUTH});
    showToast("Deleted."); load();
  }
  async function saveDoc(data:Record<string,unknown>, id?:string){
    const method = id?"PUT":"POST";
    const url    = id?`/api/cms/corporate-docs/${id}`:"/api/cms/corporate-docs";
    const res    = await fetch(url,{method,headers:JAUTH,body:JSON.stringify(data)});
    if(!res.ok){ showToast("Save failed."); return; }
    showToast(id?"Document updated!":"Document added!"); setPanel(null); load();
  }
  async function deleteDoc(id:string){
    if(!confirm("Delete this document?")) return;
    await fetch(`/api/cms/corporate-docs/${id}`,{method:"DELETE",headers:AUTH});
    showToast("Deleted."); load();
  }

  return (
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-violet-700 text-violet-300 text-sm px-4 py-2.5 rounded-xl shadow-xl">{toast}</div>
      )}

      {/* Modals */}
      {panel?.kind==="report" && (
        <ReportModal item={panel.item} onClose={()=>setPanel(null)} onSave={saveReport}/>
      )}
      {panel?.kind==="doc" && (
        <DocModal item={panel.item} onClose={()=>setPanel(null)} onSave={saveDoc}/>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-black text-lg">Annual Reports</h2>
          <p className="text-slate-500 text-xs mt-0.5">{reports.length} reports · {docs.length} corporate documents</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} aria-label="Refresh"
            className="p-2.5 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors">
            <RefreshCw className={cn("w-4 h-4", loading&&"animate-spin")}/>
          </button>
          <button type="button"
            onClick={()=>setPanel(tab==="reports"?{kind:"report"}:{kind:"doc"})}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">
            <Plus className="w-4 h-4"/> Add {tab==="reports"?"Report":"Document"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl w-fit">
        {([["reports","Annual Reports",BookOpen],["docs","Corporate Docs",FileText]] as const).map(([key,label,Icon])=>(
          <button key={key} type="button" onClick={()=>setTab(key)}
            className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
              tab===key?"bg-violet-700 text-white shadow":"text-slate-400 hover:text-white hover:bg-white/5")}>
            <Icon className="w-3.5 h-3.5"/>{label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-600 text-sm gap-2">
          <RefreshCw className="w-4 h-4 animate-spin"/> Loading…
        </div>
      ) : (
        <>
          {/* ── Annual Reports tab ── */}
          {tab==="reports" && (
            <div className="space-y-3">
              {reports.map(r=>(
                <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 group hover:border-violet-800/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-violet-900/30 rounded-xl flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-violet-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold text-sm">{r.title||r.year}</span>
                        {r.isLatest && (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-green-900/30 text-green-400 border border-green-800/30 px-2 py-0.5 rounded-full">
                            <Star className="w-2.5 h-2.5"/> LATEST
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{r.type} · {r.year}{r.pages?` · ${r.pages} pages`:""}</p>
                      {r.description && <p className="text-xs text-slate-600 mt-1 line-clamp-1">{r.description}</p>}
                      <div className="flex gap-3 mt-2">
                        {r.pdfUrl  && <a href={r.pdfUrl}  target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 transition-colors"><Download className="w-3 h-3"/>PDF</a>}
                        {r.viewUrl && <a href={r.viewUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors">View Online ↗</a>}
                      </div>
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button type="button" onClick={()=>setPanel({kind:"report",item:r})}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5"/>
                      </button>
                      <button type="button" onClick={()=>deleteReport(r.id)}
                        className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {reports.length===0 && (
                <div className="text-center py-16 text-slate-600 text-sm">No reports yet. Add your first annual report.</div>
              )}
              <button type="button" onClick={()=>setPanel({kind:"report"})}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-700 hover:border-violet-600 text-slate-500 hover:text-violet-400 text-sm rounded-2xl transition-colors">
                <Plus className="w-4 h-4"/> Add Annual Report
              </button>
            </div>
          )}

          {/* ── Corporate Docs tab ── */}
          {tab==="docs" && (
            <div className="space-y-3">
              {docs.map(d=>(
                <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 group hover:border-violet-800/40 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-slate-400"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm mb-0.5">{d.title}</p>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{d.category}</span>
                      {d.description && <p className="text-xs text-slate-600 mt-1 line-clamp-1">{d.description}</p>}
                      {d.fileUrl && <a href={d.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 mt-1.5 text-[11px] text-violet-400 hover:text-violet-300 transition-colors"><Download className="w-3 h-3"/>Download</a>}
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button type="button" onClick={()=>setPanel({kind:"doc",item:d})}
                        className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5"/>
                      </button>
                      <button type="button" onClick={()=>deleteDoc(d.id)}
                        className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {docs.length===0 && (
                <div className="text-center py-16 text-slate-600 text-sm">No documents yet. Add your first corporate document.</div>
              )}
              <button type="button" onClick={()=>setPanel({kind:"doc"})}
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-700 hover:border-violet-600 text-slate-500 hover:text-violet-400 text-sm rounded-2xl transition-colors">
                <Plus className="w-4 h-4"/> Add Corporate Document
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
