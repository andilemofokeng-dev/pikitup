"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiGetBusinessComplaints } from "@/lib/api-client";
import type { Complaint } from "@/lib/types";
import Link from "next/link";
import { ClipboardList, ArrowRight, AlertTriangle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

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
const PRIORITY_COLORS: Record<string, string> = {
  low:"text-gray-400", medium:"text-yellow-400", high:"text-orange-400", critical:"text-red-400",
};
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
];

export default function BusinessCasesPage() {
  const { user } = useAuth();
  const [cases, setCases]     = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState("all");

  useEffect(() => {
    if (!user) return;
    apiGetBusinessComplaints(user.id).then((r) => setCases(r.data)).finally(() => setLoading(false));
  }, [user]);

  const filtered = filter === "all" ? cases
    : filter === "open" ? cases.filter((c) => !["resolved","closed"].includes(c.status))
    : cases.filter((c) => c.status === filter);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-black text-white mb-0.5">My Cases</h1>
          <p className="text-sm text-gray-500">{cases.length} service request{cases.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/business-portal/report"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <AlertTriangle className="w-4 h-4" /> Report New Issue
        </Link>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-gray-600" />
        {FILTERS.map((f) => (
          <button key={f.value} type="button" onClick={() => setFilter(f.value)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-lg font-semibold transition-all border",
              filter === f.value
                ? "bg-blue-900/40 text-blue-400 border-blue-800/40"
                : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-white"
            )}
          >{f.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <ClipboardList className="w-12 h-12 text-gray-700 mb-4" />
          <p className="text-gray-400 font-semibold mb-1">No cases found</p>
          <p className="text-xs text-gray-600 mb-5">{filter !== "all" ? "Try a different filter." : "No service requests yet."}</p>
          <Link href="/business-portal/report" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">Report your first issue →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <Link key={c.id} href={`/business-portal/cases/${c.id}`}
              className="group block bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden">
              <div className="flex items-start justify-between p-5 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-mono text-blue-400 font-bold">{c.referenceNumber}</span>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide", STATUS_COLORS[c.status])}>
                      {STATUS_LABELS[c.status]}
                    </span>
                    <span className={cn("text-[10px] font-bold uppercase", PRIORITY_COLORS[c.priority])}>{c.priority}</span>
                  </div>
                  <p className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition-colors">{c.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    <span>{c.suburb}</span>
                    <span>·</span>
                    <span>{new Date(c.createdAt).toLocaleDateString("en-ZA")}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
