"use client";
import { useEffect, useState } from "react";
import { apiGetStats, apiGetComplaints, apiGetDepots } from "@/lib/api-client";
import type { DashboardStats, Complaint, Depot } from "@/lib/types";
import StatCard from "@/components/portal/StatCard";
import {
  ClipboardList, CheckCircle, Clock, AlertTriangle,
  TrendingUp, Truck, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  submitted: "#facc15", received: "#60a5fa", assigned: "#a78bfa",
  in_progress: "#fb923c", resolved: "#4ade80", escalated: "#f87171",
  closed: "#6b7280",
};
const PIE_COLORS = ["#4ade80","#facc15","#60a5fa","#fb923c","#f87171","#a78bfa"];

function StatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    submitted:"Submitted", received:"Received", assigned:"Assigned",
    in_progress:"In Progress", resolved:"Resolved", escalated:"Escalated", closed:"Closed",
  };
  const colors: Record<string, string> = {
    submitted:"bg-yellow-900/40 text-yellow-400", received:"bg-blue-900/40 text-blue-400",
    assigned:"bg-purple-900/40 text-purple-400", in_progress:"bg-orange-900/40 text-orange-400",
    resolved:"bg-green-900/40 text-green-400", escalated:"bg-red-900/40 text-red-400",
    closed:"bg-gray-800 text-gray-400",
  };
  return (
    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide", colors[status] ?? "bg-gray-800 text-gray-400")}>
      {labels[status] ?? status}
    </span>
  );
}

export default function DashboardPage() {
  const [stats, setStats]         = useState<DashboardStats | null>(null);
  const [recent, setRecent]       = useState<Complaint[]>([]);
  const [depots, setDepots]       = useState<Depot[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    Promise.all([apiGetStats(), apiGetComplaints({ pageSize: 5 }), apiGetDepots()])
      .then(([s, c, d]) => {
        setStats(s.data);
        setRecent(c.data);
        setDepots(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <StatCard label="Total Cases" value={stats?.total ?? 0} icon={ClipboardList} color="blue" trend={{ value: "+12%", positive: true }} />
        <StatCard label="Open" value={stats?.open ?? 0} icon={Clock} color="yellow" />
        <StatCard label="Resolved" value={stats?.resolved ?? 0} icon={CheckCircle} color="green" trend={{ value: "+8%", positive: true }} />
        <StatCard label="Escalated" value={stats?.escalated ?? 0} icon={AlertTriangle} color="red" />
        <StatCard label="Resolution Rate" value={`${stats?.resolutionRate ?? 0}%`} icon={TrendingUp} color="green" />
        <StatCard label="Avg Days" value={`${stats?.avgResolutionDays ?? 0}d`} icon={Clock} color="orange" trend={{ value: "-0.3d", positive: true }} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-3 bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-1">Cases by Region</h3>
          <p className="text-xs text-gray-500 mb-5">Total vs resolved this month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats?.byRegion} barCategoryGap="30%">
              <XAxis dataKey="region" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: 12, color: "#f9fafb" }} />
              <Bar dataKey="count"    name="Total"    fill="#334155" radius={[4,4,0,0]} />
              <Bar dataKey="resolved" name="Resolved" fill="#4ade80" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <h3 className="font-bold text-white mb-1">By Type</h3>
          <p className="text-xs text-gray-500 mb-4">Complaint type breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats?.byType} dataKey="count" nameKey="type" cx="50%" cy="45%" outerRadius={70} innerRadius={40}>
                {stats?.byType.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11, color: "#9ca3af" }} />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "1px solid #1f2937", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent complaints */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h3 className="font-bold text-white">Recent Cases</h3>
            <Link href="/staff-portal/complaints" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {recent.map((c) => (
              <Link key={c.id} href={`/staff-portal/complaints/${c.id}`} className="flex items-start justify-between px-6 py-3.5 hover:bg-white/5 transition-colors group">
                <div>
                  <p className="text-xs font-mono text-green-400">{c.referenceNumber}</p>
                  <p className="text-sm text-white font-medium mt-0.5 line-clamp-1">{c.description}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{c.suburb} · {c.type.replace(/-/g," ")}</p>
                </div>
                <div className="ml-3 shrink-0 flex flex-col items-end gap-1.5">
                  <StatusBadge status={c.status} />
                  {c.isOverdue && <span className="text-[9px] text-red-400 font-bold uppercase bg-red-900/20 px-1.5 py-0.5 rounded-full">Overdue</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Depot overview */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h3 className="font-bold text-white">Depot Status</h3>
            <Link href="/staff-portal/depots" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {depots.map((d) => (
              <div key={d.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center">
                      <Truck className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{d.name}</p>
                      <p className="text-[11px] text-gray-500">{d.region}</p>
                    </div>
                  </div>
                  {d.overdue > 0 && (
                    <span className="text-[10px] bg-red-900/30 text-red-400 border border-red-800/30 px-2 py-0.5 rounded-full font-bold">
                      {d.overdue} overdue
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span><span className="text-yellow-400 font-bold">{d.openComplaints}</span> open</span>
                  <span><span className="text-green-400 font-bold">{d.resolvedToday}</span> resolved today</span>
                </div>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                    style={{ width: `${Math.round((d.resolvedToday / (d.openComplaints + d.resolvedToday)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
