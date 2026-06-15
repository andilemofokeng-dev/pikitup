"use client";
import { useEffect, useState } from "react";
import { apiGetDepots, apiGetComplaints } from "@/lib/api-client";
import type { Depot, Complaint } from "@/lib/types";
import { Truck, Phone, Mail, User, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DepotsPage() {
  const [depots, setDepots]           = useState<Depot[]>([]);
  const [complaints, setComplaints]   = useState<Complaint[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([apiGetDepots(), apiGetComplaints()])
      .then(([d, c]) => { setDepots(d.data); setComplaints(c.data); })
      .finally(() => setLoading(false));
  }, []);

  function depotComplaints(depotId: string) {
    return complaints.filter((c) => c.depotId === depotId);
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
        {[
          { label: "Total Depots", value: depots.length },
          { label: "Open Cases",   value: depots.reduce((a, d) => a + d.openComplaints, 0) },
          { label: "Resolved Today", value: depots.reduce((a, d) => a + d.resolvedToday, 0) },
          { label: "Overdue", value: depots.reduce((a, d) => a + d.overdue, 0) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {depots.map((depot) => {
          const dcs  = depotComplaints(depot.id);
          const pct  = depot.openComplaints + depot.resolvedToday > 0
            ? Math.round((depot.resolvedToday / (depot.openComplaints + depot.resolvedToday)) * 100)
            : 0;

          return (
            <div key={depot.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-900/40 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{depot.name}</h3>
                    <p className="text-xs text-gray-500">{depot.region}</p>
                  </div>
                </div>
                {depot.overdue > 0 && (
                  <span className="flex items-center gap-1.5 text-xs bg-red-900/30 text-red-400 border border-red-800/30 px-2.5 py-1 rounded-full font-bold">
                    <AlertTriangle className="w-3 h-3" /> {depot.overdue} overdue
                  </span>
                )}
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-3 gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gray-600" />{depot.manager}</div>
                <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-600" />{depot.phone}</div>
                <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-600" /><span className="truncate">{depot.email}</span></div>
              </div>

              {/* Stats + progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span><span className="font-bold text-yellow-400">{depot.openComplaints}</span> open</span>
                  <span><span className="font-bold text-green-400">{depot.resolvedToday}</span> resolved today</span>
                  <span className="text-gray-500">{pct}% complete</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-700 to-green-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              {/* Recent cases */}
              {dcs.length > 0 && (
                <div className="bg-gray-950/50 rounded-xl border border-gray-800 divide-y divide-gray-800">
                  {dcs.slice(0, 3).map((c) => (
                    <Link key={c.id} href={`/staff-portal/complaints/${c.id}`} className="flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors group">
                      <div>
                        <p className="text-[11px] font-mono text-green-400">{c.referenceNumber}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{c.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${c.isOverdue ? "bg-red-900/30 text-red-400" : "bg-gray-800 text-gray-500"}`}>
                          {c.status.replace("_"," ")}
                        </span>
                        <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
