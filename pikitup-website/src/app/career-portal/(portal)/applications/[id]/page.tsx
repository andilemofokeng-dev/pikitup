"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { APPLICATION_STATUS_LABELS, type ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, FileText, Calendar, Mail, Phone, User, Building2, CheckCircle, MessageSquare, Send, Clock } from "lucide-react";

const STATUS_STEPS: ApplicationStatus[] = [
  "submitted","screening","shortlisted","interview_scheduled","interviewed","offer_made","hired"
];

const STATUS_COLORS: Record<string, string> = {
  submitted:           "bg-slate-800 text-slate-300",
  screening:           "bg-blue-900/40 text-blue-400",
  shortlisted:         "bg-emerald-900/40 text-emerald-400",
  interview_scheduled: "bg-violet-900/40 text-violet-400",
  interviewed:         "bg-teal-900/40 text-teal-400",
  offer_made:          "bg-yellow-900/40 text-yellow-400",
  hired:               "bg-green-900/40 text-green-400",
  rejected:            "bg-red-900/40 text-red-400",
  withdrawn:           "bg-slate-800 text-slate-500",
};

export default function ApplicationDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();
  const found   = MOCK_APPLICATIONS.find((a) => a.id === id);

  const [app, setApp]           = useState(found ?? null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus | "">(found?.status ?? "");
  const [interviewDate, setInterviewDate] = useState(found?.interviewDate ?? "");
  const [note, setNote]         = useState("");
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);

  if (!app) return <div className="text-center text-slate-500 py-16">Application not found.</div>;

  const stepIndex  = STATUS_STEPS.indexOf(app.status);
  const isRejected = app.status === "rejected" || app.status === "withdrawn";

  async function saveChanges() {
    if (!app) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    const updated = { ...app };
    if (newStatus) updated.status = newStatus as ApplicationStatus;
    if (interviewDate) updated.interviewDate = interviewDate;
    if (note.trim()) {
      updated.notes = [...(app.notes ?? []), {
        id: `note-${Date.now()}`, createdByName: "HR Officer", createdBy: "hr",
        note: note.trim(), createdAt: new Date().toISOString(),
      }];
    }
    setApp(updated);
    setNote("");
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-5xl space-y-6">
      <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <div className="flex flex-wrap items-start gap-4 justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-2xl flex items-center justify-center text-xl font-black text-white">
              {app.applicantName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{app.applicantName}</h2>
              <p className="text-sm text-slate-400">{app.vacancyTitle}</p>
              <p className="text-xs text-slate-500">{app.department}</p>
            </div>
          </div>
          <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full", STATUS_COLORS[app.status])}>
            {APPLICATION_STATUS_LABELS[app.status]}
          </span>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
          <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-600" />{app.applicantEmail}</span>
          {app.applicantPhone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-600" />{app.applicantPhone}</span>}
          {app.idNumber && <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-600" />ID: {app.idNumber}</span>}
          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-600" />Applied {new Date(app.appliedAt).toLocaleDateString("en-ZA")}</span>
          {app.interviewDate && (
            <span className="flex items-center gap-1.5 text-violet-400">
              <Clock className="w-3.5 h-3.5" />Interview: {new Date(app.interviewDate).toLocaleString("en-ZA", { dateStyle:"medium", timeStyle:"short" })}
            </span>
          )}
        </div>
      </div>

      {/* Progress tracker */}
      {!isRejected && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Application Progress</h3>
          <div className="relative flex items-start justify-between gap-2">
            <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-800 -z-0" />
            <div
              className="absolute top-3.5 left-0 h-0.5 bg-emerald-600 transition-all duration-500 -z-0"
              style={{ inlineSize: `${Math.max(0, (stepIndex / (STATUS_STEPS.length - 1)) * 100)}%` }}
            />
            {STATUS_STEPS.map((step, i) => {
              const done    = i < stepIndex;
              const current = i === stepIndex;
              return (
                <div key={step} className="flex flex-col items-center flex-1 relative z-10">
                  <div className={cn("w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all", done || current ? "bg-emerald-700 border-emerald-600" : "bg-slate-800 border-slate-700")}>
                    {done ? <CheckCircle className="w-3.5 h-3.5 text-white" /> :
                      <div className={cn("w-2 h-2 rounded-full", current ? "bg-white" : "bg-slate-600")} />
                    }
                  </div>
                  <span className={cn("text-[9px] mt-1.5 font-medium text-center leading-tight", current ? "text-emerald-400" : done ? "text-slate-400" : "text-slate-600")}>
                    {APPLICATION_STATUS_LABELS[step]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Application content */}
        <div className="space-y-5">
          {app.education && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3"><Building2 className="w-3.5 h-3.5" />Education</h4>
              <p className="text-sm text-slate-300 whitespace-pre-line">{app.education}</p>
            </div>
          )}
          {app.experience && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3"><Building2 className="w-3.5 h-3.5" />Experience</h4>
              <p className="text-sm text-slate-300 whitespace-pre-line">{app.experience}</p>
            </div>
          )}
          {app.coverLetter && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-3"><FileText className="w-3.5 h-3.5" />Cover Letter</h4>
              <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed">{app.coverLetter}</p>
            </div>
          )}
          {app.cvFileName && (
            <button type="button" className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded-xl transition-colors w-full">
              <FileText className="w-4 h-4 text-slate-500" />{app.cvFileName}<span className="ml-auto text-xs text-slate-500">Download CV</span>
            </button>
          )}
        </div>

        {/* HR actions + notes */}
        <div className="space-y-5">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Update Application</h4>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Move to status</label>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)} aria-label="New status"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 appearance-none transition-colors"
              >
                <option value="">— Keep current —</option>
                {Object.entries(APPLICATION_STATUS_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            {(newStatus === "interview_scheduled" || app.status === "interview_scheduled") && (
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Interview date &amp; time</label>
                <input type="datetime-local" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)}
                  title="Interview date and time"
                  className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Add note</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Internal note…"
                className="w-full bg-slate-800 border border-slate-700 text-sm text-slate-300 placeholder-slate-600 rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>
            <button type="button" onClick={saveChanges} disabled={saving}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" />{saved ? "Saved!" : "Save Changes"}</>}
            </button>
          </div>

          {/* Notes timeline */}
          {(app.notes ?? []).length > 0 && (
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-4"><MessageSquare className="w-3.5 h-3.5" />Notes</h4>
              <div className="space-y-4">
                {(app.notes ?? []).map((n) => (
                  <div key={n.id} className="flex gap-3">
                    <div className="w-7 h-7 bg-emerald-900/40 border border-emerald-800/30 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-emerald-400">{n.createdByName[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-white">{n.createdByName}</span>
                        <span className="text-[10px] text-slate-600">{new Date(n.createdAt).toLocaleDateString("en-ZA")}</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{n.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
