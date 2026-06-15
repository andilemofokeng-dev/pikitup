"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGetComplaints } from "@/lib/api-client";
import type { Complaint, ComplaintStatus } from "@/lib/types";
import { STATUS_LABELS, COMPLAINT_TYPE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Search, Filter, AlertTriangle, ArrowRight } from "lucide-react";

const STATUS_OPTIONS: { value: ComplaintStatus | ""; label: string }[] = [
  { value: "",             label: "All Statuses" },
  { value: "submitted",   label: "Submitted" },
  { value: "received",    label: "Received" },
  { value: "assigned",    label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "escalated",   label: "Escalated" },
  { value: "resolved",    label: "Resolved" },
  { value: "closed",      label: "Closed" },
];

const STATUS_COLORS: Record<string, string> = {
  submitted:   "bg-yellow-900/40 text-yellow-400 border-yellow-800/30",
  received:    "bg-blue-900/40 text-blue-400 border-blue-800/30",
  assigned:    "bg-purple-900/40 text-purple-400 border-purple-800/30",
  in_progress: "bg-orange-900/40 text-orange-400 border-orange-800/30",
  resolved:    "bg-green-900/40 text-green-400 border-green-800/30",
  escalated:   "bg-red-900/40 text-red-400 border-red-800/30",
  closed:      "bg-gray-800 text-gray-400 border-gray-700",
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: "text-red-400",
  high:     "text-orange-400",
  medium:   "text-yellow-400",
  low:      "text-gray-400",
};

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading]       = useState(true);
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | "">("");
  const [search, setSearch]         = useState("");

  useEffect(() => {
    setLoading(true);
    apiGetComplaints(statusFilter ? { status: statusFilter } : undefined)
      .then((res) => setComplaints(res.data))
      .finally(() => setLoading(false));
  }, [statusFilter]);

  const filtered = complaints.filter((c) =>
    search === "" ||
    c.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.suburb.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference, suburb, description…"
            className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-green-600 transition-colors"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | "")}
            className="bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-green-600 appearance-none transition-colors"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-gray-500 font-medium">
        {loading ? "Loading…" : `${filtered.length} complaint${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No complaints found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Reference", "Type", "Description", "Location", "Priority", "Status", "Assigned To", ""].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-5 py-3.5 font-mono text-xs text-green-400 whitespace-nowrap">{c.referenceNumber}</td>
                    <td className="px-5 py-3.5 text-gray-300 whitespace-nowrap text-xs">{COMPLAINT_TYPE_LABELS[c.type]}</td>
                    <td className="px-5 py-3.5 text-gray-300 max-w-48">
                      <p className="line-clamp-1">{c.description}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-xs whitespace-nowrap">{c.suburb}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-xs font-bold capitalize", PRIORITY_COLORS[c.priority])}>
                        {c.isOverdue && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide", STATUS_COLORS[c.status])}>
                        {STATUS_LABELS[c.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">
                      {c.assignedToName ?? <span className="text-gray-600 italic">Unassigned</span>}
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/staff-portal/complaints/${c.id}`}
                        className="flex items-center gap-1 text-xs text-green-500 hover:text-green-300 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        View <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
