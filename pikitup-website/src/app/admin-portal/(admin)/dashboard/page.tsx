"use client";
import { useEffect, useState } from "react";
import { apiGetStats, apiGetUsers, apiGetAuditLogs } from "@/lib/api-client";
import type { DashboardStats, User, AuditLog } from "@/lib/types";
import {
  Users, Shield, Activity, Server, CheckCircle,
  AlertTriangle, ArrowRight, Clock,
} from "lucide-react";
import Link from "next/link";

const SYSTEM_HEALTH = [
  { service: "API Gateway",       status: "online", latency: "18ms" },
  { service: "Database (SQL)",    status: "online", latency: "4ms"  },
  { service: "Notification Queue", status: "online", latency: "—"   },
  { service: "CMS (Strapi)",      status: "offline", latency: "—"  },
  { service: "Map Tiles",         status: "online", latency: "62ms" },
];

const ACTION_COLORS: Record<string, string> = {
  CREATE:"text-green-400", STATUS_CHANGE:"text-blue-400",
  PUBLISH:"text-purple-400", DELETE:"text-red-400", UPDATE:"text-yellow-400",
};

export default function AdminDashboardPage() {
  const [stats, setStats]   = useState<DashboardStats | null>(null);
  const [users, setUsers]   = useState<User[]>([]);
  const [logs, setLogs]     = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGetStats(), apiGetUsers(), apiGetAuditLogs()])
      .then(([s, u, l]) => { setStats(s.data); setUsers(u.data); setLogs(l.data); })
      .finally(() => setLoading(false));
  }, []);

  const roleBreakdown = users.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] ?? 0) + 1;
    return acc;
  }, {});

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-7">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, icon: Users, color: "text-blue-400", bg: "bg-blue-900/20 border-blue-800/30" },
          { label: "Total Cases", value: stats?.total ?? 0, icon: Activity, color: "text-green-400", bg: "bg-green-900/20 border-green-800/30" },
          { label: "Resolution Rate", value: `${stats?.resolutionRate ?? 0}%`, icon: CheckCircle, color: "text-green-400", bg: "bg-green-900/20 border-green-800/30" },
          { label: "Overdue Cases", value: stats?.overdue ?? 0, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-900/20 border-red-800/30" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-2xl p-5 border bg-gray-900 ${bg}`}>
            <Icon className={`w-5 h-5 ${color} mb-3`} />
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* System health */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center gap-2">
            <Server className="w-4 h-4 text-gray-500" />
            <h3 className="font-bold text-white text-sm">System Health</h3>
          </div>
          <div className="divide-y divide-gray-800">
            {SYSTEM_HEALTH.map((s) => (
              <div key={s.service} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full ${s.status === "online" ? "bg-green-400" : "bg-red-500"}`} />
                  <span className="text-sm text-gray-300">{s.service}</span>
                </div>
                <span className="text-xs text-gray-500 font-mono">{s.latency}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User roles breakdown */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <h3 className="font-bold text-white text-sm">Users by Role</h3>
            </div>
            <Link href="/admin-portal/users" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {Object.entries(roleBreakdown).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-gray-300 capitalize">{role.replace(/_/g," ")}</span>
                <span className="text-xs font-bold bg-gray-800 text-gray-300 px-2.5 py-0.5 rounded-full">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent audit */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <h3 className="font-bold text-white text-sm">Recent Activity</h3>
            </div>
            <Link href="/admin-portal/audit" className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {logs.slice(0,5).map((l) => (
              <div key={l.id} className="px-5 py-3">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[10px] font-bold uppercase ${ACTION_COLORS[l.action] ?? "text-gray-400"}`}>{l.action}</span>
                  <span className="text-[10px] text-gray-600">{new Date(l.createdAt).toLocaleTimeString("en-ZA",{hour:"2-digit",minute:"2-digit"})}</span>
                </div>
                <p className="text-xs text-gray-400">{l.userName} · {l.module}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
