"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { apiGetFacilities } from "@/lib/api-client";
import type { Facility, FacilityStatus, FacilityType } from "@/lib/types";
import { Search, MapPin, Clock, Phone, CheckCircle, AlertCircle, XCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const FacilityMap = dynamic(() => import("@/components/map/FacilityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-500">Loading map…</p>
      </div>
    </div>
  ),
});

const STATUS_CONFIG: Record<FacilityStatus, { label: string; color: string; icon: React.ElementType }> = {
  open:        { label: "Open",        color: "bg-green-100 text-green-700 border-green-200",   icon: CheckCircle },
  limited:     { label: "Limited",     color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertCircle },
  closed:      { label: "Closed",      color: "bg-red-100 text-red-700 border-red-200",          icon: XCircle },
  maintenance: { label: "Maintenance", color: "bg-orange-100 text-orange-700 border-orange-200", icon: AlertCircle },
};

const TYPE_LABELS: Record<FacilityType, string> = {
  "depot":            "Depot",
  "garden-refuse":    "Garden Refuse",
  "landfill":         "Landfill",
  "recycling":        "Recycling Drop-off",
  "customer-service": "Customer Service",
};

export default function FindFacilityPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading]       = useState(true);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState<FacilityType | "">("");
  const [statusFilter, setStatus]   = useState<FacilityStatus | "">("");

  useEffect(() => {
    apiGetFacilities().then((r) => setFacilities(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = facilities.filter((f) => {
    const s  = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.address.toLowerCase().includes(search.toLowerCase()) || f.region.toLowerCase().includes(search.toLowerCase());
    const t  = !typeFilter  || f.type   === typeFilter;
    const st = !statusFilter || f.status === statusFilter;
    return s && t && st;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="section-label">City-wide facilities</span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2">Find a Pikitup Facility</h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Locate landfills, depots, recycling drop-offs and garden refuse sites across Johannesburg.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, area, or address…"
            className="w-full border border-gray-200 bg-white text-sm placeholder-gray-400 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as FacilityType | "")}
            aria-label="Filter by facility type"
            className="border border-gray-200 bg-white text-sm text-gray-600 rounded-xl pl-9 pr-8 py-2.5 outline-none focus:border-green-500 appearance-none transition-all shadow-sm"
          >
            <option value="">All Types</option>
            {(Object.entries(TYPE_LABELS) as [FacilityType, string][]).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </div>
        <select
          value={statusFilter} onChange={(e) => setStatus(e.target.value as FacilityStatus | "")}
          aria-label="Filter by facility status"
          className="border border-gray-200 bg-white text-sm text-gray-600 rounded-xl px-4 py-2.5 outline-none focus:border-green-500 appearance-none transition-all shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="limited">Limited</option>
          <option value="closed">Closed</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Map + list split */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Map */}
        <div className="lg:col-span-3 h-[520px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          {!loading && (
            <FacilityMap
              facilities={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          )}
          {loading && (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading facilities…</p>
              </div>
            </div>
          )}
        </div>

        {/* Facility list */}
        <div className="lg:col-span-2 overflow-y-auto max-h-[520px] space-y-3 pr-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
            ))
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No facilities match your filters.
            </div>
          ) : (
            filtered.map((f) => {
              const cfg        = STATUS_CONFIG[f.status];
              const Icon       = cfg.icon;
              const isSelected = f.id === selectedId;
              return (
                <button
                  key={f.id} type="button"
                  onClick={() => setSelectedId(f.id === selectedId ? undefined : f.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all shadow-sm hover:shadow-md",
                    isSelected
                      ? "border-green-400 bg-green-50 ring-2 ring-green-400/20"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  )}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">{TYPE_LABELS[f.type]}</p>
                      <p className="font-bold text-gray-900 text-sm leading-snug">{f.name}</p>
                    </div>
                    <span className={cn("shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border", cfg.color)}>
                      <Icon className="w-3 h-3" />{cfg.label}
                    </span>
                  </div>

                  {f.notice && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 text-xs text-yellow-700 mb-2">
                      {f.notice}
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" />{f.address}</div>
                    <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400" />{f.hours}</div>
                    <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" />{f.phone}</div>
                  </div>

                  {isSelected && f.accepts.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-green-200">
                      {f.accepts.map((a) => (
                        <span key={a} className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 font-medium">{a}</span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center text-xs">
        {(Object.entries(STATUS_CONFIG) as [FacilityStatus, typeof STATUS_CONFIG[FacilityStatus]][]).map(([s, cfg]) => {
          const Icon = cfg.icon;
          return (
            <span key={s} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium", cfg.color)}>
              <Icon className="w-3.5 h-3.5" />{cfg.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
