"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiGetBusinessComplaints, apiGetBusinessServiceAgreement, apiGetBusinessInvoices } from "@/lib/api-client";
import type { Complaint, BusinessServiceAgreement, Invoice } from "@/lib/types";
import Link from "next/link";
import {
  ClipboardList, FileText, Briefcase, AlertTriangle,
  CheckCircle2, Clock, ArrowRight, Truck, MapPin, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const STATUS_COLORS: Record<string, string> = {
  submitted:   "bg-yellow-900/40 text-yellow-400 border-yellow-800/30",
  received:    "bg-blue-900/40 text-blue-400 border-blue-800/30",
  assigned:    "bg-purple-900/40 text-purple-400 border-purple-800/30",
  in_progress: "bg-orange-900/40 text-orange-400 border-orange-800/30",
  resolved:    "bg-green-900/40 text-green-400 border-green-800/30",
  escalated:   "bg-red-900/40 text-red-400 border-red-800/30",
  closed:      "bg-gray-800 text-gray-400 border-gray-700",
};
const STATUS_LABELS: Record<string, string> = {
  submitted:"Submitted", received:"Received", assigned:"Assigned",
  in_progress:"In Progress", resolved:"Resolved", escalated:"Escalated", closed:"Closed",
};
const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function BusinessDashboardPage() {
  const { user } = useAuth();
  const [cases, setCases]     = useState<Complaint[]>([]);
  const [service, setService] = useState<BusinessServiceAgreement | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      apiGetBusinessComplaints(user.id),
      apiGetBusinessServiceAgreement(),
      apiGetBusinessInvoices(),
    ]).then(([c, s, i]) => {
      setCases(c.data);
      setService(s.data);
      setInvoices(i.data);
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const openCases = cases.filter((c) => !["resolved","closed"].includes(c.status)).length;
  const resolvedCases = cases.filter((c) => ["resolved","closed"].includes(c.status)).length;
  const outstandingInvoices = invoices.filter((i) => i.status !== "paid").length;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-2xl p-6 border border-blue-800/30 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #050d1f 0%, #0a1f40 100%)" }}
      >
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-blue-400 text-sm font-semibold mb-1">Business Account</p>
            <h1 className="text-2xl font-black text-white mb-1">{user?.businessName ?? `${user?.name} ${user?.surname}`}</h1>
            <div className="flex items-center gap-1.5 text-blue-300/60 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              {user?.address}, {user?.suburb}
            </div>
          </div>
          {service && (
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-300 px-4 py-2 rounded-xl text-xs font-semibold">
              Acc Ref: {service.accountRef}
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: "Total Cases",     value: cases.length,          color: "blue" },
          { icon: Clock,         label: "Open Cases",      value: openCases,             color: "yellow" },
          { icon: CheckCircle2,  label: "Resolved",        value: resolvedCases,         color: "green" },
          { icon: FileText,      label: "Outstanding Bills",value: outstandingInvoices,  color: "orange" },
        ].map((s, i) => {
          const SIcon = s.icon;
          const colorMap: Record<string, string> = {
            blue:   "bg-blue-900/50 text-blue-400 border-blue-800/30",
            yellow: "bg-yellow-900/50 text-yellow-400 border-yellow-800/30",
            green:  "bg-green-900/50 text-green-400 border-green-800/30",
            orange: "bg-orange-900/50 text-orange-400 border-orange-800/30",
          };
          return (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
              className={cn("rounded-2xl p-5 border bg-gray-900", colorMap[s.color].split(" ").slice(2).join(" "))}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", colorMap[s.color].split(" ").slice(0,2).join(" "))}>
                <SIcon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white"><AnimatedCounter to={s.value} duration={800} /></div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Service agreement card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">My Service</h3>
              <Link href="/business-portal/services" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                Details <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {service ? (
              <div className="p-5 space-y-3.5">
                <div className="text-center p-4 bg-blue-900/20 rounded-xl border border-blue-800/30">
                  <Truck className="w-7 h-7 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-0.5">Next Collection</p>
                  <p className="text-white font-black">{service.nextCollection}</p>
                </div>
                {[
                  { label: "Service",    value: service.serviceType },
                  { label: "Frequency", value: service.collectionFrequency },
                  { label: "Days",      value: service.collectionDay },
                  { label: "Depot",     value: service.depot },
                ].map((r) => (
                  <div key={r.label} className="flex items-start gap-3">
                    <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-wider w-20 shrink-0 pt-0.5">{r.label}</p>
                    <p className="text-sm text-gray-300 font-medium leading-tight">{r.value}</p>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-green-400 bg-green-900/30 border border-green-800/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {service.status}
                  </span>
                </div>
              </div>
            ) : (
              <p className="p-5 text-sm text-gray-500">No service agreement found.</p>
            )}
          </div>
        </motion.div>

        {/* Recent cases */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="lg:col-span-2">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h3 className="font-bold text-white text-sm">Recent Cases</h3>
              <Link href="/business-portal/cases" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {cases.length === 0 ? (
              <div className="flex flex-col items-center py-16 px-5 text-center">
                <ClipboardList className="w-10 h-10 text-gray-700 mb-3" />
                <p className="text-gray-400 font-medium mb-1">No cases yet</p>
                <Link href="/business-portal/report" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">Report an issue →</Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {cases.slice(0, 4).map((c) => (
                  <Link key={c.id} href={`/business-portal/cases/${c.id}`}
                    className="flex items-start justify-between px-5 py-4 hover:bg-white/5 transition-colors group">
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-blue-400">{c.referenceNumber}</p>
                      <p className="text-sm text-white font-medium mt-0.5 line-clamp-1">{c.description}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{new Date(c.createdAt).toLocaleDateString("en-ZA")}</p>
                    </div>
                    <span className={cn("ml-3 shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border", STATUS_COLORS[c.status] ?? "bg-gray-800 text-gray-400")}>
                      {STATUS_LABELS[c.status] ?? c.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}>
        <h3 className="font-bold text-white text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: AlertTriangle, label: "Report Issue",   href: "/business-portal/report",   color: "from-red-900/60 to-red-950 border-red-800/40",     iconColor: "text-red-400" },
            { icon: Briefcase,     label: "View Service",   href: "/business-portal/services",  color: "from-blue-900/60 to-blue-950 border-blue-800/40",   iconColor: "text-blue-400" },
            { icon: FileText,      label: "Invoices",       href: "/business-portal/invoices",  color: "from-purple-900/60 to-purple-950 border-purple-800/40", iconColor: "text-purple-400" },
            { icon: ClipboardList, label: "Track Cases",    href: "/business-portal/cases",     color: "from-teal-900/60 to-teal-950 border-teal-800/40",   iconColor: "text-teal-400" },
          ].map((a) => {
            const AIcon = a.icon;
            return (
              <Link key={a.label} href={a.href}
                className={cn("group rounded-2xl p-5 border bg-gradient-to-br flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200", a.color)}>
                <AIcon className={cn("w-7 h-7", a.iconColor)} />
                <span className="text-sm font-semibold text-white">{a.label}</span>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
