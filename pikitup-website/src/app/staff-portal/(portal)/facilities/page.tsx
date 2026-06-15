"use client";
import { useEffect, useState } from "react";
import { apiGetFacilities } from "@/lib/api-client";
import type { Facility, FacilityStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Phone, Search, CheckCircle, AlertCircle, XCircle, Settings } from "lucide-react";

const STATUS_CONFIG: Record<FacilityStatus, { label: string; color: string; icon: React.ElementType }> = {
  open:        { label: "Open",        color: "bg-green-900/30 text-green-400 border-green-800/30",   icon: CheckCircle },
  limited:     { label: "Limited",     color: "bg-yellow-900/30 text-yellow-400 border-yellow-800/30", icon: AlertCircle },
  closed:      { label: "Closed",      color: "bg-red-900/30 text-red-400 border-red-800/30",          icon: XCircle },
  maintenance: { label: "Maintenance", color: "bg-orange-900/30 text-orange-400 border-orange-800/30", icon: Settings },
};

const TYPE_LABELS: Record<string, string> = {
  "depot":            "Depot",
  "garden-refuse":    "Garden Refuse",
  "landfill":         "Landfill",
  "recycling":        "Recycling",
  "customer-service": "Customer Service",
};

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    apiGetFacilities().then((r) => setFacilities(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = facilities.filter((f) => {
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.region.toLowerCase().includes(search.toLowerCase());
    const matchType   = !typeFilter || f.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search facilities…"
            className="w-full bg-gray-800 border border-gray-700 text-sm text-gray-300 placeholder-gray-600 rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-green-600 transition-colors"
          />
        </div>
        <select
          value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-sm text-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-green-600 appearance-none transition-colors"
        >
          <option value="">All Types</option>
          {Object.entries(TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["open","limited","closed","maintenance"] as FacilityStatus[]).map((s) => {
          const cfg = STATUS_CONFIG[s];
          const count = facilities.filter((f) => f.status === s).length;
          const Icon = cfg.icon;
          return (
            <div key={s} className={cn("rounded-xl p-3 border flex items-center gap-3", cfg.color)}>
              <Icon className="w-4 h-4 shrink-0" />
              <div>
                <p className="text-lg font-black">{count}</p>
                <p className="text-[11px] opacity-70">{cfg.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((f) => {
            const cfg = STATUS_CONFIG[f.status];
            const Icon = cfg.icon;
            return (
              <div key={f.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium mb-1">{TYPE_LABELS[f.type]}</p>
                    <h3 className="font-bold text-white text-sm leading-snug">{f.name}</h3>
                  </div>
                  <span className={cn("shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide", cfg.color)}>
                    <Icon className="w-3 h-3" />{cfg.label}
                  </span>
                </div>

                {f.notice && (
                  <div className="flex items-start gap-2 bg-yellow-900/20 border border-yellow-800/30 rounded-xl px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-yellow-300">{f.notice}</p>
                  </div>
                )}

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                    <span>{f.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-600 shrink-0 mt-0.5" />
                    <span>{f.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-600 shrink-0" />
                    <span>{f.phone}</span>
                  </div>
                </div>

                {f.accepts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-800">
                    {f.accepts.map((a) => (
                      <span key={a} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">{a}</span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="mt-auto w-full py-2 text-xs font-semibold text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-xl transition-colors"
                >
                  Edit Facility
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
