"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGetComplaint } from "@/lib/api-client";
import type { Complaint } from "@/lib/types";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Clock, AlertTriangle, MapPin,
  MessageSquare, Calendar, Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STEPS = ["submitted","received","assigned","in_progress","resolved"];

const STATUS_COLORS: Record<string, string> = {
  submitted:   "bg-yellow-900/40 text-yellow-400 border-yellow-800/40",
  received:    "bg-blue-900/40 text-blue-400 border-blue-800/40",
  assigned:    "bg-purple-900/40 text-purple-400 border-purple-800/40",
  in_progress: "bg-orange-900/40 text-orange-400 border-orange-800/40",
  resolved:    "bg-green-900/40 text-green-400 border-green-800/40",
  escalated:   "bg-red-900/40 text-red-400 border-red-800/40",
  closed:      "bg-gray-800 text-gray-400 border-gray-700",
};
const STATUS_LABELS: Record<string, string> = {
  submitted:"Submitted", received:"Received", assigned:"Assigned",
  in_progress:"In Progress", resolved:"Resolved", escalated:"Escalated", closed:"Closed",
};
const TYPE_LABELS: Record<string, string> = {
  "missed-collection":"Missed Collection","illegal-dumping":"Illegal Dumping",
  "overflowing-bins":"Overflowing Bins","street-not-swept":"Street Not Swept",
  "waste-spillage":"Waste Spillage","facility-issue":"Facility Issue",
  "truck-issue":"Truck Issue","general-complaint":"General Complaint",
};

export default function CaseDetailPage() {
  const { id }        = useParams<{ id: string }>();
  const router        = useRouter();
  const [caseData, setCaseData] = useState<Complaint | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    apiGetComplaint(id).then((r) => setCaseData(r.data)).catch(() => setError("Case not found.")).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (error || !caseData) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">{error || "Case not found."}</p>
      <button type="button" onClick={() => router.back()} className="text-green-400 text-sm hover:text-green-300">← Go back</button>
    </div>
  );

  const stepIndex  = STATUS_STEPS.indexOf(caseData.status);
  const isResolved = ["resolved","closed"].includes(caseData.status);
  const isEscalated = caseData.status === "escalated";

  return (
    <div className="max-w-3xl space-y-6">
      <button type="button" onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> My Cases
      </button>

      {/* Header card */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <p className="text-xs font-mono text-green-400 font-bold mb-1">{caseData.referenceNumber}</p>
            <h1 className="text-lg font-black text-white">{caseData.description}</h1>
          </div>
          <span className={cn("text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wide shrink-0", STATUS_COLORS[caseData.status])}>
            {STATUS_LABELS[caseData.status]}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            { icon: AlertTriangle, label: "Type",     value: TYPE_LABELS[caseData.type] ?? caseData.type },
            { icon: MapPin,        label: "Location", value: `${caseData.address}, ${caseData.suburb}` },
            { icon: Calendar,      label: "Reported", value: new Date(caseData.createdAt).toLocaleString("en-ZA") },
            { icon: Clock,         label: "Updated",  value: new Date(caseData.updatedAt).toLocaleString("en-ZA") },
          ].map((item) => {
            const IIcon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-2.5">
                <IIcon className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium">{item.label}</p>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              </div>
            );
          })}
          {caseData.depotName && (
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium">Assigned Depot</p>
                <p className="text-gray-300">{caseData.depotName}</p>
              </div>
            </div>
          )}
        </div>
        {caseData.isOverdue && (
          <div className="mt-4 flex items-center gap-2 text-red-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            This case is overdue — it has been escalated to management.
          </div>
        )}
      </div>

      {/* Progress tracker */}
      {!isEscalated && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-sm font-bold text-white mb-5">Case Progress</h2>
          <div className="flex items-center gap-0">
            {STATUS_STEPS.map((step, i) => {
              const completed = i < stepIndex || isResolved;
              const current   = i === stepIndex && !isResolved;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all",
                      completed ? "bg-green-500 border-green-500 text-white"
                        : current ? "bg-green-900/40 border-green-500 text-green-400"
                        : "bg-gray-800 border-gray-700 text-gray-600"
                    )}>
                      {completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <span className={cn("text-[9px] text-center font-semibold uppercase tracking-wide leading-tight",
                      completed || current ? "text-green-400" : "text-gray-600"
                    )}>
                      {STATUS_LABELS[step]?.replace(" ", "\n")}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={cn("flex-1 h-0.5 mb-5 mx-1", i < stepIndex ? "bg-green-500" : "bg-gray-800")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity / Notes */}
      {caseData.notes.length > 0 && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-bold text-white">Updates from Pikitup</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {caseData.notes.map((note) => (
              <div key={note.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-white">{note.createdByName}</p>
                  <p className="text-[10px] text-gray-600">{new Date(note.createdAt).toLocaleString("en-ZA")}</p>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{note.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex items-start gap-4">
        <div className="w-9 h-9 bg-green-900/40 rounded-xl flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 text-green-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-1">Need help with this case?</p>
          <p className="text-xs text-gray-500 mb-2">Call our helpline with your reference number: <strong className="text-yellow-400">{caseData.referenceNumber}</strong></p>
          <div className="flex gap-3">
            <a href="tel:+27860562874" className="text-xs text-green-400 hover:text-green-300 font-semibold">0860 562874</a>
            <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-300">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
