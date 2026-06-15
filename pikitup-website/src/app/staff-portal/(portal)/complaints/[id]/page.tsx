"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGetComplaint, apiUpdateComplaintStatus, apiAssignComplaint, apiGetDepots } from "@/lib/api-client";
import type { Complaint, ComplaintStatus, Depot } from "@/lib/types";
import { STATUS_LABELS, COMPLAINT_TYPE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft, MapPin, Calendar, User, Truck, AlertTriangle,
  MessageSquare, CheckCircle, ArrowUpCircle,
} from "lucide-react";
import Link from "next/link";

const STATUS_STEPS: ComplaintStatus[] = ["submitted","received","assigned","in_progress","resolved"];

const STATUS_COLORS: Record<string, string> = {
  submitted:"bg-yellow-900/30 text-yellow-400 border-yellow-800/30",
  received:"bg-blue-900/30 text-blue-400 border-blue-800/30",
  assigned:"bg-purple-900/30 text-purple-400 border-purple-800/30",
  in_progress:"bg-orange-900/30 text-orange-400 border-orange-800/30",
  resolved:"bg-green-900/30 text-green-400 border-green-800/30",
  escalated:"bg-red-900/30 text-red-400 border-red-800/30",
  closed:"bg-gray-800 text-gray-400 border-gray-700",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", { dateStyle: "medium", timeStyle: "short" });
}

export default function ComplaintDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [depots,    setDepots]    = useState<Depot[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [saving,    setSaving]    = useState(false);
  const [note,      setNote]      = useState("");
  const [newStatus, setNewStatus] = useState<ComplaintStatus | "">("");
  const [assignDepot,   setAssignDepot]   = useState("");
  const [assignPerson,  setAssignPerson]  = useState("");

  useEffect(() => {
    Promise.all([apiGetComplaint(id), apiGetDepots()])
      .then(([c, d]) => { setComplaint(c.data); setDepots(d.data); })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusUpdate() {
    if (!newStatus || !complaint) return;
    setSaving(true);
    try {
      const res = await apiUpdateComplaintStatus(complaint.id, newStatus, note || undefined);
      setComplaint(res.data);
      setNote(""); setNewStatus("");
    } finally { setSaving(false); }
  }

  async function handleAssign() {
    if (!assignDepot || !complaint) return;
    setSaving(true);
    try {
      const res = await apiAssignComplaint(complaint.id, assignDepot, assignPerson);
      setComplaint(res.data);
      setAssignDepot(""); setAssignPerson("");
    } finally { setSaving(false); }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>;
  }
  if (!complaint) return <div className="text-center text-gray-500 py-16">Complaint not found.</div>;

  const stepIdx = STATUS_STEPS.indexOf(complaint.status);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back */}
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Complaints
      </button>

      {/* Header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div>
            <p className="text-xs font-mono text-green-400 mb-1">{complaint.referenceNumber}</p>
            <h2 className="text-xl font-black text-white">{COMPLAINT_TYPE_LABELS[complaint.type]}</h2>
            <p className="text-sm text-gray-400 mt-1">{complaint.description}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide", STATUS_COLORS[complaint.status])}>
              {STATUS_LABELS[complaint.status]}
            </span>
            <span className={cn("text-xs font-bold px-3 py-1 rounded-full border capitalize",
              complaint.priority === "critical" ? "bg-red-900/30 text-red-400 border-red-800/30"
              : complaint.priority === "high" ? "bg-orange-900/30 text-orange-400 border-orange-800/30"
              : "bg-gray-800 text-gray-400 border-gray-700"
            )}>
              {complaint.priority} priority
            </span>
            {complaint.isOverdue && (
              <span className="text-xs font-bold px-3 py-1 rounded-full border bg-red-900/30 text-red-400 border-red-800/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Overdue
              </span>
            )}
          </div>
        </div>

        {/* Progress tracker */}
        <div className="flex items-center gap-2 mb-6">
          {STATUS_STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1 min-w-0">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold border transition-colors",
                i < stepIdx ? "bg-green-700 border-green-600 text-white"
                : i === stepIdx ? "bg-green-500 border-green-400 text-white"
                : "bg-gray-800 border-gray-700 text-gray-600"
              )}>
                {i < stepIdx ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div className={cn("h-0.5 flex-1 rounded", i < stepIdx ? "bg-green-700" : "bg-gray-800")} />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-6 justify-between">
          {STATUS_STEPS.map((s) => (
            <p key={s} className="text-[10px] text-gray-600 flex-1 capitalize">{STATUS_LABELS[s]}</p>
          ))}
        </div>

        {/* Meta */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-800">
          {[
            { icon: MapPin, label: "Location", value: `${complaint.address}, ${complaint.suburb}` },
            { icon: Calendar, label: "Submitted", value: fmt(complaint.createdAt) },
            { icon: Truck, label: "Depot", value: complaint.depotName ?? "Unassigned" },
            { icon: User, label: "Assigned To", value: complaint.assignedToName ?? "Unassigned" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1 font-medium flex items-center gap-1.5">
                <Icon className="w-3 h-3" /> {label}
              </p>
              <p className="text-sm text-gray-300 font-medium">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Activity / notes */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-500" />
              <h3 className="font-bold text-white text-sm">Activity Log</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {complaint.notes.length === 0 ? (
                <p className="text-sm text-gray-600 text-center py-8">No activity yet.</p>
              ) : complaint.notes.map((n) => (
                <div key={n.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-white">{n.createdByName}</p>
                    <p className="text-[10px] text-gray-600">{fmt(n.createdAt)}</p>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{n.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add note / update status */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-sm">Update Case</h3>
            <textarea
              value={note} onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)…"
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-600 rounded-xl px-4 py-3 outline-none focus:border-green-600 resize-none transition-colors"
            />
            <div className="flex gap-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ComplaintStatus | "")}
                className="flex-1 bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 appearance-none transition-colors"
              >
                <option value="">Change status…</option>
                {(Object.keys(STATUS_LABELS) as ComplaintStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
              <button
                type="button" onClick={handleStatusUpdate}
                disabled={!newStatus || saving}
                className="px-5 py-2.5 bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Assign depot */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-500" /> Assign to Depot
            </h3>
            <div className="space-y-3">
              <select
                value={assignDepot}
                onChange={(e) => setAssignDepot(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 appearance-none transition-colors"
              >
                <option value="">Select depot…</option>
                {depots.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <input
                type="text" value={assignPerson} onChange={(e) => setAssignPerson(e.target.value)}
                placeholder="Assign to (name / ID)…"
                className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-600 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 transition-colors"
              />
              <button
                type="button" onClick={handleAssign}
                disabled={!assignDepot || saving}
                className="w-full py-2.5 bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Assign Case
              </button>
            </div>
          </div>

          {/* Escalate shortcut */}
          {complaint.status !== "resolved" && complaint.status !== "closed" && complaint.status !== "escalated" && (
            <button
              type="button"
              onClick={() => { setNewStatus("escalated"); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-800/40 text-red-400 hover:bg-red-900/10 text-sm font-semibold rounded-xl transition-colors"
            >
              <ArrowUpCircle className="w-4 h-4" />
              Escalate Case
            </button>
          )}

          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4 text-xs text-gray-500 space-y-1.5">
            <p className="font-semibold text-gray-400">SLA Deadline</p>
            <p>{complaint.slaDeadline ? fmt(complaint.slaDeadline) : "Not set"}</p>
            <p className="font-semibold text-gray-400 pt-2">Last Updated</p>
            <p>{fmt(complaint.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
