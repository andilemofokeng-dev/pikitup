"use client";
import { useEffect, useState } from "react";
import { apiGetFacilities } from "@/lib/api-client";
import type { Facility, FacilityStatus } from "@/lib/types";
import { MapPin, Clock, Phone, Edit2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<FacilityStatus, { label: string; color: string; icon: React.ElementType }> = {
  open:        { label:"Open",        color:"bg-green-900/30 text-green-400 border-green-800/30",   icon: CheckCircle },
  limited:     { label:"Limited",     color:"bg-yellow-900/30 text-yellow-400 border-yellow-800/30", icon: AlertCircle },
  closed:      { label:"Closed",      color:"bg-red-900/30 text-red-400 border-red-800/30",          icon: XCircle },
  maintenance: { label:"Maintenance", color:"bg-orange-900/30 text-orange-400 border-orange-800/30", icon: AlertCircle },
};

const TYPE_LABELS: Record<string, string> = {
  "depot":"Depot","garden-refuse":"Garden Refuse","landfill":"Landfill","recycling":"Recycling","customer-service":"Customer Service",
};

export default function CmsFacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading]       = useState(true);
  const [editing, setEditing]       = useState<string | null>(null);

  useEffect(() => {
    apiGetFacilities().then((r) => setFacilities(r.data)).finally(() => setLoading(false));
  }, []);

  function cycleStatus(id: string) {
    const order: FacilityStatus[] = ["open","limited","maintenance","closed"];
    setFacilities(facilities.map((f) => {
      if (f.id !== id) return f;
      const next = order[(order.indexOf(f.status) + 1) % order.length];
      return { ...f, status: next };
    }));
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">Click a facility status badge to cycle through states. Changes will sync to the API when connected.</p>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {facilities.map((f) => {
          const cfg  = STATUS_CONFIG[f.status];
          const Icon = cfg.icon;
          return (
            <div key={f.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-slate-600 uppercase tracking-wider font-medium mb-1">{TYPE_LABELS[f.type]}</p>
                  <h3 className="font-bold text-white text-sm">{f.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{f.region}</p>
                </div>
                <button type="button" onClick={() => cycleStatus(f.id)}
                  className={cn("flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer hover:opacity-80 transition-opacity", cfg.color)}
                >
                  <Icon className="w-3 h-3" />{cfg.label}
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />{f.address}</div>
                <div className="flex items-start gap-2"><Clock className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />{f.hours}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />{f.phone}</div>
              </div>

              <button type="button" onClick={() => setEditing(editing === f.id ? null : f.id)}
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                <Edit2 className="w-3 h-3" /> {editing === f.id ? "Close" : "Edit details"}
              </button>

              {editing === f.id && (
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <input defaultValue={f.notice ?? ""} placeholder="Service notice (optional)…"
                    className="w-full bg-slate-800 border border-slate-700 text-xs text-slate-300 placeholder-slate-600 rounded-lg px-3 py-2 outline-none focus:border-violet-500 transition-colors"
                  />
                  <button type="button" className="w-full py-2 text-xs bg-violet-700 hover:bg-violet-600 text-white font-semibold rounded-lg transition-colors">Save Changes</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
