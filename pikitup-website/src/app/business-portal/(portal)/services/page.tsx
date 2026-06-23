"use client";
import { useEffect, useState } from "react";
import { apiGetBusinessServiceAgreement } from "@/lib/api-client";
import type { BusinessServiceAgreement } from "@/lib/types";
import { Briefcase, Truck, Calendar, MapPin, Recycle, Package, Clock, CheckCircle2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessServicesPage() {
  const [service, setService] = useState<BusinessServiceAgreement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetBusinessServiceAgreement().then((r) => setService(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!service) return <p className="text-gray-500">No service agreement found.</p>;

  const details = [
    { icon: Briefcase, label: "Service Type",      value: service.serviceType,         color: "text-blue-400" },
    { icon: Clock,     label: "Frequency",         value: service.collectionFrequency, color: "text-purple-400" },
    { icon: Calendar,  label: "Collection Days",   value: service.collectionDay,       color: "text-yellow-400" },
    { icon: Package,   label: "Bin Size",          value: service.binSize,             color: "text-orange-400" },
    { icon: Recycle,   label: "Number of Bins",    value: `${service.binCount} bins`,  color: "text-teal-400" },
    { icon: MapPin,    label: "Serving Depot",     value: service.depot,               color: "text-green-400" },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-black text-white mb-1">My Service Agreement</h1>
        <p className="text-sm text-gray-500">Account Reference: <span className="font-mono text-blue-400">{service.accountRef}</span></p>
      </div>

      {/* Status banner */}
      <div className="rounded-2xl p-6 border border-blue-700/40 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050d1f 0%, #0a1f40 100%)" }}>
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="relative flex items-center gap-6 flex-wrap">
          <div className="w-16 h-16 bg-blue-500/20 border-2 border-blue-500/40 rounded-2xl flex items-center justify-center shrink-0">
            <Truck className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">Next Collection</p>
            <p className="text-3xl font-black text-white">{service.nextCollection}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                "text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider border",
                service.status === "active" ? "bg-green-900/40 text-green-400 border-green-800/40"
                  : service.status === "suspended" ? "bg-red-900/40 text-red-400 border-red-800/40"
                  : "bg-gray-800 text-gray-400 border-gray-700"
              )}>
                {service.status}
              </span>
              {service.status === "active" && <CheckCircle2 className="w-4 h-4 text-green-400" />}
            </div>
          </div>
        </div>
      </div>

      {/* Service details */}
      <div className="grid sm:grid-cols-2 gap-4">
        {details.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center shrink-0">
              <Icon className={cn("w-5 h-5", color)} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-0.5">{label}</p>
              <p className="font-bold text-sm text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contract dates */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="text-sm font-bold text-white">Contract Period</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {[
            { label: "Contract Start", value: new Date(service.contractStart).toLocaleDateString("en-ZA", { day:"numeric", month:"long", year:"numeric" }) },
            { label: "Contract End",   value: new Date(service.contractEnd).toLocaleDateString("en-ZA",   { day:"numeric", month:"long", year:"numeric" }) },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-4 px-5 py-3.5">
              <p className="text-xs text-gray-600 font-semibold uppercase tracking-wider w-32 shrink-0">{row.label}</p>
              <p className="text-sm text-gray-300 font-medium">{row.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 flex items-start gap-4">
        <div className="w-9 h-9 bg-blue-900/40 rounded-xl flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-0.5">Need to change your service?</p>
          <p className="text-xs text-gray-500 mb-2">Contact our commercial team to upgrade, modify or cancel your service agreement.</p>
          <a href="tel:+27115000911" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">011 500 0911 — Business Accounts</a>
        </div>
      </div>
    </div>
  );
}
