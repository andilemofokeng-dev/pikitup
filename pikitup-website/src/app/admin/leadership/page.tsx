"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Save, X, LogOut, Loader2, CheckCircle2,
  Users, Building2, ChevronDown, ChevronUp, AlertTriangle,
  ExternalLink, RefreshCw, Star,
} from "lucide-react";
import type { Executive, GeneralManager, DepotManager, LeadershipData } from "@/lib/leadership-store";

const EASE = [0.25, 0.4, 0.25, 1] as const;
type Section = "executives" | "generalManagers" | "depotManagers";

// ── Helpers ─────────────────────────────────────────────────────────────────

function initials(name: string) {
  const p = name.replace(/^(Ms|Mr|Dr)\.?\s/i, "").trim().split(" ");
  return (p[0]?.[0] ?? "") + (p[p.length - 1]?.[0] ?? "");
}

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold ${
        type === "success"
          ? "bg-green-900/90 border-green-700/50 text-green-300"
          : "bg-red-900/90 border-red-700/50 text-red-300"
      }`}>
      {type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
      {msg}
    </motion.div>
  );
}

// ── Empty-form factories ─────────────────────────────────────────────────────

const emptyExec = (): Partial<Executive> => ({
  name: "", title: "", abbreviation: "", department: "", bio: "", imageUrl: "", email: "", order: 99,
});
const emptyGM = (): Partial<GeneralManager> => ({ name: "", cluster: "", order: 99 });
const emptyDM = (): Partial<DepotManager>   => ({
  name: "", depot: "", role: "Regional Manager", order: 99,
});

// ── Main page ────────────────────────────────────────────────────────────────

export default function AdminLeadershipPage() {
  const router = useRouter();

  // Auth
  const [token,      setToken]      = useState<string | null>(null);
  const [authReady,  setAuthReady]  = useState(false);

  // Data
  const [data,       setData]       = useState<LeadershipData | null>(null);
  const [loadingData,setLoadingData]= useState(false);

  // Toast
  const [toast,      setToast]      = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Modal state
  const [modal,      setModal]      = useState<{
    open: boolean;
    mode: "add" | "edit";
    section: Section;
    form: Partial<Executive> | Partial<GeneralManager> | Partial<DepotManager>;
  } | null>(null);

  // Delete confirm
  const [delConfirm, setDelConfirm] = useState<{ section: Section; id: string; name: string } | null>(null);

  // Active section tab
  const [activeTab,  setActiveTab]  = useState<Section>("executives");

  // ── Auth check ─────────────────────────────────────────────
  useEffect(() => {
    const t = localStorage.getItem("cms_token");
    if (!t) { router.replace("/admin"); return; }
    setToken(t);
    setAuthReady(true);
  }, [router]);

  // ── Load data ───────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const res  = await fetch("/api/admin/leadership");
      const json = await res.json() as LeadershipData;
      setData(json);
    } catch {
      showToast("Failed to load data", "error");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => { if (authReady) loadData(); }, [authReady, loadData]);

  // ── Toast helper ────────────────────────────────────────────
  function showToast(msg: string, type: "success" | "error") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── API calls ───────────────────────────────────────────────
  async function apiCall(method: "POST" | "PUT" | "DELETE", body: unknown) {
    const res = await fetch("/api/admin/leadership", {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const json = await res.json() as { success?: boolean; data?: LeadershipData; error?: string };
    if (!res.ok) throw new Error(json.error ?? "Request failed");
    return json.data!;
  }

  // ── Save (add or edit) ──────────────────────────────────────
  async function handleSave() {
    if (!modal) return;
    const { mode, section, form } = modal;
    try {
      const updated = await apiCall(
        mode === "add" ? "POST" : "PUT",
        { section, item: form }
      );
      setData(updated);
      setModal(null);
      showToast(mode === "add" ? "Person added successfully" : "Changes saved", "success");
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  }

  // ── Delete ──────────────────────────────────────────────────
  async function handleDelete() {
    if (!delConfirm) return;
    try {
      const updated = await apiCall("DELETE", { section: delConfirm.section, id: delConfirm.id });
      setData(updated);
      setDelConfirm(null);
      showToast("Record deleted", "success");
    } catch (err) {
      showToast((err as Error).message, "error");
    }
  }

  function openAdd(section: Section) {
    const form =
      section === "executives"    ? emptyExec() :
      section === "generalManagers" ? emptyGM() : emptyDM();
    setModal({ open: true, mode: "add", section, form });
  }

  function openEdit(section: Section, item: Executive | GeneralManager | DepotManager) {
    setModal({ open: true, mode: "edit", section, form: { ...item } });
  }

  function logout() {
    localStorage.removeItem("cms_token");
    router.push("/admin");
  }

  if (!authReady) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
    </div>
  );

  const tabs: { key: Section; label: string; icon: typeof Users; count: number }[] = [
    { key: "executives",     label: "Executives",         icon: Star,     count: data?.executives.length ?? 0 },
    { key: "generalManagers",label: "General Managers",   icon: Users,    count: data?.generalManagers.length ?? 0 },
    { key: "depotManagers",  label: "Depot Managers",     icon: Building2,count: data?.depotManagers.length ?? 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* ── Top bar ─────────────────────────────────── */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-xl px-3 py-1.5 shadow-md">
              <Image src="/pikitup-logo.png" alt="Pikitup" width={90} height={30} className="h-6 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Admin CMS</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div className="flex items-center gap-2">
            <button type="button" onClick={loadData} disabled={loadingData}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded-xl transition-all">
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <a href="/about/leadership" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 px-3 py-1.5 rounded-xl transition-all">
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Page</span>
            </a>
            <button type="button" onClick={logout}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 border border-red-900/40 hover:border-red-800/60 px-3 py-1.5 rounded-xl transition-all">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* ── Stats strip ──────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {tabs.map((t) => (
            <div key={t.key} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <t.icon className="w-5 h-5 text-green-400 mx-auto mb-1" />
              <div className="text-2xl font-black text-white">{t.count}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{t.label}</div>
            </div>
          ))}
        </div>

        {/* ── Section tabs ─────────────────────────── */}
        <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-2xl p-1 mb-6">
          {tabs.map((t) => (
            <button key={t.key} type="button" onClick={() => setActiveTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === t.key
                  ? "bg-green-900/60 text-green-300 border border-green-800/50"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}>
              <t.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 bg-black/20 rounded-full text-[10px]">
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Section content ──────────────────────── */}
        {loadingData && !data ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}>

              {/* Header + Add button */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-black text-white text-lg">
                  {tabs.find((t) => t.key === activeTab)?.label}
                </h2>
                <button type="button" onClick={() => openAdd(activeTab)}
                  className="flex items-center gap-2 text-sm font-semibold bg-green-800 hover:bg-green-700 text-green-100 px-4 py-2 rounded-xl transition-colors shadow-lg shadow-green-900/40">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>

              {/* ── Executives ───────────── */}
              {activeTab === "executives" && (
                <div className="space-y-4">
                  {(data?.executives ?? []).sort((a, b) => a.order - b.order).map((exec) => (
                    <ExecRow key={exec.id} exec={exec}
                      onEdit={() => openEdit("executives", exec)}
                      onDelete={() => setDelConfirm({ section: "executives", id: exec.id, name: exec.name })} />
                  ))}
                </div>
              )}

              {/* ── General Managers ─────── */}
              {activeTab === "generalManagers" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(data?.generalManagers ?? []).sort((a, b) => a.order - b.order).map((gm) => (
                    <PersonCard key={gm.id} name={gm.name} sub={gm.cluster} badge="General Manager"
                      onEdit={() => openEdit("generalManagers", gm)}
                      onDelete={() => setDelConfirm({ section: "generalManagers", id: gm.id, name: gm.name })} />
                  ))}
                </div>
              )}

              {/* ── Depot Managers ───────── */}
              {activeTab === "depotManagers" && (
                <DepotManagerTable
                  managers={data?.depotManagers ?? []}
                  onEdit={(m) => openEdit("depotManagers", m)}
                  onDelete={(m) => setDelConfirm({ section: "depotManagers", id: m.id, name: m.name })}
                />
              )}

            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Edit / Add Modal ─────────────────────────── */}
      <AnimatePresence>
        {modal?.open && (
          <Modal
            modal={modal}
            depots={data?.depots ?? []}
            onClose={() => setModal(null)}
            onChange={(form) => setModal((m) => m ? { ...m, form } : m)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

      {/* ── Delete Confirm ───────────────────────────── */}
      <AnimatePresence>
        {delConfirm && (
          <motion.div key="del-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDelConfirm(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="bg-gray-900 border border-red-900/40 rounded-3xl p-7 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center w-12 h-12 bg-red-900/30 rounded-2xl mx-auto mb-5">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-black text-white text-center mb-2">Delete Record</h3>
              <p className="text-sm text-gray-400 text-center mb-6">
                Remove <strong className="text-white">{delConfirm.name}</strong> from the leadership page? This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setDelConfirm(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm font-semibold transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={handleDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-bold transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toast ───────────────────────────────────── */}
      <AnimatePresence>
        {toast && <Toast key="toast" msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ExecRow({ exec, onEdit, onDelete }: {
  exec: Executive; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex items-start gap-4 transition-colors group">
      {/* Photo */}
      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-800 shrink-0 border border-gray-700">
        {exec.imageUrl ? (
          <Image src={exec.imageUrl} alt={exec.name} width={56} height={56}
            className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-black text-gray-500">
            {initials(exec.name)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <p className="font-bold text-white text-sm">{exec.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{exec.title} · {exec.department}</p>
          </div>
          <span className="text-[10px] font-bold text-green-400 bg-green-900/40 border border-green-800/40 px-2 py-0.5 rounded-lg shrink-0">
            {exec.abbreviation}
          </span>
        </div>
        {exec.bio && <p className="text-xs text-gray-600 mt-2 line-clamp-2">{exec.bio}</p>}
        {exec.email && <p className="text-[11px] text-gray-700 mt-1.5">{exec.email}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-2 shrink-0">
        <button type="button" onClick={onEdit}
          className="p-2 text-gray-600 hover:text-blue-400 hover:bg-blue-900/20 rounded-xl transition-all">
          <Pencil className="w-4 h-4" />
        </button>
        <button type="button" onClick={onDelete}
          className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-all">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function PersonCard({ name, sub, badge, onEdit, onDelete }: {
  name: string; sub: string; badge: string; onEdit: () => void; onDelete: () => void;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-4 flex items-center gap-3 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-800/40 flex items-center justify-center text-xs font-black text-blue-300 shrink-0">
        {initials(name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{name}</p>
        <p className="text-[11px] text-gray-500 mt-0.5 truncate">{sub}</p>
      </div>
      <div className="flex gap-1.5 shrink-0">
        <button type="button" onClick={onEdit}
          className="p-1.5 text-gray-600 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={onDelete}
          className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function DepotManagerTable({ managers, onEdit, onDelete }: {
  managers: DepotManager[];
  onEdit: (m: DepotManager) => void;
  onDelete: (m: DepotManager) => void;
}) {
  const [openDepots, setOpenDepots] = useState<Set<string>>(new Set());

  const grouped = managers.reduce<Record<string, DepotManager[]>>((acc, m) => {
    (acc[m.depot] ??= []).push(m);
    return acc;
  }, {});

  function toggle(depot: string) {
    setOpenDepots((prev) => {
      const next = new Set(prev);
      next.has(depot) ? next.delete(depot) : next.add(depot);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([depot, people]) => (
        <div key={depot} className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Depot header */}
          <button type="button" onClick={() => toggle(depot)}
            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-800/50 transition-colors text-left">
            <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="flex-1 text-sm font-bold text-white">{depot}</span>
            <span className="text-[11px] text-gray-500">{people.length} manager{people.length > 1 ? "s" : ""}</span>
            {openDepots.has(depot) ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
          </button>

          {/* People list */}
          <AnimatePresence>
            {openDepots.has(depot) && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-gray-800">
                {people.sort((a, b) => a.order - b.order).map((m, i) => (
                  <div key={m.id}
                    className={`flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors ${i > 0 ? "border-t border-gray-800/60" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                      m.role === "Regional Manager"
                        ? "bg-purple-900/60 text-purple-300 border border-purple-800/40"
                        : "bg-indigo-900/60 text-indigo-300 border border-indigo-800/40"
                    }`}>
                      {initials(m.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white font-medium">{m.name}</span>
                    </div>
                    <span className={`text-[10px] font-semibold shrink-0 ${
                      m.role === "Regional Manager" ? "text-purple-400" : "text-indigo-400"
                    }`}>
                      {m.role}
                    </span>
                    <div className="flex gap-1.5 shrink-0">
                      <button type="button" onClick={() => onEdit(m)}
                        className="p-1.5 text-gray-700 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-all">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => onDelete(m)}
                        className="p-1.5 text-gray-700 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────

type ModalState = {
  open: boolean; mode: "add" | "edit"; section: Section;
  form: Partial<Executive> | Partial<GeneralManager> | Partial<DepotManager>;
};

function Modal({ modal, depots, onClose, onChange, onSave }: {
  modal: ModalState;
  depots: string[];
  onClose: () => void;
  onChange: (form: ModalState["form"]) => void;
  onSave: () => Promise<void>;
}) {
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try { await onSave(); } finally { setSaving(false); }
  }

  function field(key: string, value: string | number, label: string, opts?: {
    type?: string; multiline?: boolean; options?: string[]; required?: boolean;
  }) {
    const { type = "text", multiline = false, options, required = true } = opts ?? {};
    const sharedCls = "w-full bg-gray-800 border border-gray-700 focus:border-green-600 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-gray-600";
    return (
      <div key={key}>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
        {options ? (
          <select value={value} onChange={(e) => onChange({ ...modal.form, [key]: e.target.value })} className={sharedCls} required={required}>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : multiline ? (
          <textarea rows={3} value={value as string} required={required}
            onChange={(e) => onChange({ ...modal.form, [key]: e.target.value })}
            className={sharedCls + " resize-none"} />
        ) : (
          <input type={type} value={value as string} required={required}
            onChange={(e) => onChange({ ...modal.form, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
            className={sharedCls} />
        )}
      </div>
    );
  }

  const { section, form, mode } = modal;
  const title = `${mode === "add" ? "Add" : "Edit"} ${
    section === "executives" ? "Executive" :
    section === "generalManagers" ? "General Manager" : "Depot Manager"
  }`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl my-4"
        onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h3 className="font-black text-white text-base">{title}</h3>
          <button type="button" onClick={onClose} className="p-2 text-gray-600 hover:text-white rounded-xl hover:bg-white/5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 space-y-4">

          {/* Executive fields */}
          {section === "executives" && (() => {
            const f = form as Partial<Executive>;
            return (
              <>
                {field("name",         f.name         ?? "", "Full Name (include Ms/Mr)")}
                {field("title",        f.title        ?? "", "Job Title")}
                {field("abbreviation", f.abbreviation ?? "", "Abbreviation (e.g. MD, CFO)")}
                {field("department",   f.department   ?? "", "Department")}
                {field("bio",          f.bio          ?? "", "Biography", { multiline: true })}
                {field("imageUrl",     f.imageUrl     ?? "", "Photo URL", { required: false })}
                {f.imageUrl && (
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-700 shrink-0">
                      <Image src={f.imageUrl} alt="Preview" width={48} height={48} className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="text-xs text-gray-500">Photo preview</span>
                  </div>
                )}
                {field("email",  f.email  ?? "", "Email Address", { type: "email", required: false })}
                {field("order",  f.order  ?? 99, "Display Order (lower = first)", { type: "number" })}
              </>
            );
          })()}

          {/* General Manager fields */}
          {section === "generalManagers" && (() => {
            const f = form as Partial<GeneralManager>;
            return (
              <>
                {field("name",    f.name    ?? "", "Full Name")}
                {field("cluster", f.cluster ?? "", "Cluster Name (e.g. Central Cluster)")}
                {field("order",   f.order   ?? 99, "Display Order", { type: "number" })}
              </>
            );
          })()}

          {/* Depot Manager fields */}
          {section === "depotManagers" && (() => {
            const f = form as Partial<DepotManager>;
            return (
              <>
                {field("name",  f.name  ?? "", "Full Name")}
                {field("depot", f.depot ?? "", "Depot / Site", {
                  options: ["—", ...depots, "Other"],
                })}
                {field("role", f.role ?? "Regional Manager", "Role", {
                  options: ["Regional Manager", "Operations Manager"],
                })}
                {field("order", f.order ?? 99, "Display Order", { type: "number" })}
              </>
            );
          })()}

          {/* Footer buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 text-sm font-semibold transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
