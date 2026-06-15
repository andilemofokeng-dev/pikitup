"use client";
import { useEffect, useState } from "react";
import { apiGetAuditLogs } from "@/lib/api-client";
import type { AuditLog } from "@/lib/types";
import { Shield, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTION_COLORS: Record<string, string> = {
  CREATE:"bg-green-900/30 text-green-400",
  STATUS_CHANGE:"bg-blue-900/30 text-blue-400",
  PUBLISH:"bg-purple-900/30 text-purple-400",
  DELETE:"bg-red-900/30 text-red-400",
  UPDATE:"bg-yellow-900/30 text-yellow-400",
};

export default function AuditPage() {
  const [logs, setLogs]       = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetAuditLogs().then((r) => setLogs(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-5">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-500" />
          <h3 className="font-bold text-white text-sm">System Audit Log</h3>
          <span className="ml-auto text-xs text-gray-500">{logs.length} entries</span>
        </div>
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Time","User","Role","Action","Module","Record","Change","IP"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{new Date(l.createdAt).toLocaleString("en-ZA",{dateStyle:"short",timeStyle:"short"})}</td>
                    <td className="px-5 py-3.5 text-xs text-white font-medium whitespace-nowrap">{l.userName}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400 capitalize whitespace-nowrap">{l.role.replace(/_/g," ")}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", ACTION_COLORS[l.action] ?? "bg-gray-800 text-gray-400")}>
                        {l.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{l.module}</td>
                    <td className="px-5 py-3.5 text-xs font-mono text-gray-500">{l.recordId ?? "—"}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">
                      {l.oldValue && l.newValue ? (
                        <span className="flex items-center gap-1">
                          <span className="text-red-400 line-through">{l.oldValue}</span>
                          <ArrowRight className="w-3 h-3 text-gray-600" />
                          <span className="text-green-400">{l.newValue}</span>
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono text-gray-600">{l.ip}</td>
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
