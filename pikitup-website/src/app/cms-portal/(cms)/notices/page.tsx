"use client";
import { useState, useEffect, useCallback } from "react";
import { Plus, Edit2, Trash2, AlertCircle, Bell, CheckCircle, Info, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/base-path";

type NoticeType = "urgent" | "info" | "success" | "warning";

interface Notice {
  id: string; title: string; body: string; type: NoticeType;
  region: string; active: boolean; createdAt: string; expiresAt?: string | null;
}

const TYPE_CONFIG: Record<NoticeType, { label: string; icon: React.ElementType; color: string }> = {
  urgent:  { label: "Urgent",  icon: AlertCircle, color: "bg-red-900/30 text-red-400 border-red-800/30" },
  warning: { label: "Warning", icon: Bell,        color: "bg-yellow-900/30 text-yellow-400 border-yellow-800/30" },
  info:    { label: "Info",    icon: Info,        color: "bg-blue-900/30 text-blue-400 border-blue-800/30" },
  success: { label: "Success", icon: CheckCircle, color: "bg-green-900/30 text-green-400 border-green-800/30" },
};
const REGIONS = ["All Regions","Region A","Region B","Region C","Region D","Region E","Region F","Region G"];
const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN ?? "";

const EMPTY_FORM = { title: "", body: "", type: "info" as NoticeType, region: "All Regions", expiresAt: "" };

export default function NoticesPage() {
  const [notices, setNotices]   = useState<Notice[]>([]);
  const [loading, setLoading]   = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState<string | null>(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);

  const fetchNotices = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch(apiUrl("/api/cms/notices"));
      const json = await res.json() as { notices: Notice[] };
      setNotices(json.notices ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotices(); }, [fetchNotices]);

  function openNew() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(n: Notice) {
    setForm({ title: n.title, body: n.body, type: n.type, region: n.region, expiresAt: n.expiresAt ?? "" });
    setEditId(n.id);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    const payload = { ...form, expiresAt: form.expiresAt || null };

    if (editId) {
      const existing = notices.find((n) => n.id === editId);
      await fetch(apiUrl(`/api/cms/notices/${editId}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${CMS_TOKEN}` },
        body: JSON.stringify({ ...payload, active: existing?.active ?? true }),
      });
    } else {
      await fetch(apiUrl("/api/cms/notices"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${CMS_TOKEN}` },
        body: JSON.stringify({ ...payload, active: true }),
      });
    }

    setSaving(false);
    setShowForm(false);
    fetchNotices();
  }

  async function toggleActive(n: Notice) {
    await fetch(apiUrl(`/api/cms/notices/${n.id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${CMS_TOKEN}` },
      body: JSON.stringify({ title: n.title, body: n.body, type: n.type, region: n.region, active: !n.active, expiresAt: n.expiresAt }),
    });
    setNotices((prev) => prev.map((x) => x.id === n.id ? { ...x, active: !x.active } : x));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notice?")) return;
    await fetch(apiUrl(`/api/cms/notices/${id}`), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${CMS_TOKEN}` },
    });
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-3">
        <button type="button" onClick={fetchNotices}
          className="p-2.5 bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors" title="Refresh">
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
        <button type="button" onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-700 hover:bg-violet-600 text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Notice
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-900 rounded-2xl border border-violet-800/40 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">{editId ? "Edit Notice" : "Create Service Notice"}</h3>
            <button type="button" onClick={() => setShowForm(false)} title="Close" aria-label="Close" className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Notice title…" aria-label="Notice title"
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
          />
          <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            rows={3} placeholder="Notice body…" aria-label="Notice body"
            className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-600 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 resize-none transition-colors"
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as NoticeType }))}
              aria-label="Notice type"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
              {Object.entries(TYPE_CONFIG).map(([v, { label }]) => <option key={v} value={v}>{label}</option>)}
            </select>
            <select value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
              aria-label="Region"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 appearance-none transition-colors">
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Expires (optional)</label>
            <input type="date" value={form.expiresAt} onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))}
              aria-label="Expiry date"
              className="bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleSave} disabled={saving}
              className="flex-1 py-2.5 bg-violet-700 hover:bg-violet-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors">
              {saving ? "Saving…" : editId ? "Update Notice" : "Publish Notice"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 border border-slate-700 text-slate-400 hover:text-white text-sm rounded-xl transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-600 text-sm gap-2">
          <RefreshCw className="w-4 h-4 animate-spin" /> Loading notices…
        </div>
      ) : (
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
                        <span>Created {new Date(n.createdAt).toLocaleDateString("en-ZA")}</span>
                        {n.expiresAt && <span>Expires {new Date(n.expiresAt).toLocaleDateString("en-ZA")}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", n.active ? "bg-green-900/30 text-green-400" : "bg-slate-800 text-slate-500")}>
                      {n.active ? "Active" : "Inactive"}
                    </span>
                    <button type="button" onClick={() => openEdit(n)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title="Edit">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => toggleActive(n)}
                      className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors" title={n.active ? "Deactivate" : "Activate"}>
                      {n.active ? <X className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    </button>
                    <button type="button" onClick={() => handleDelete(n.id)}
                      className="p-1.5 rounded-lg hover:bg-red-900/20 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {notices.length === 0 && (
            <div className="text-center py-16 text-slate-600 text-sm">No notices yet. Create your first notice.</div>
          )}
        </div>
      )}
    </div>
  );
}
