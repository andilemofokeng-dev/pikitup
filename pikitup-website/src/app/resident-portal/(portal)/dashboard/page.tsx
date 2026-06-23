"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiGetResidentComplaints, apiGetMySchedule, apiGetMyNotifications } from "@/lib/api-client";
import type { Complaint, CollectionSchedule, Notification } from "@/lib/types";
import Link from "next/link";
import {
  Calendar, ClipboardList, AlertTriangle, Bell, ArrowRight,
  CheckCircle2, Clock, Recycle, Truck, MapPin, ChevronRight,
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

export default function ResidentDashboardPage() {
  const { user } = useAuth();
  const [cases, setCases]       = useState<Complaint[]>([]);
  const [schedule, setSchedule] = useState<CollectionSchedule | null>(null);
  const [notifs, setNotifs]     = useState<Notification[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      apiGetResidentComplaints(user.id),
      apiGetMySchedule(),
      apiGetMyNotifications(),
    ]).then(([c, s, n]) => {
      setCases(c.data);
      setSchedule(s.data);
      setNotifs(n.data.filter((x) => !x.isRead));
    }).finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const openCases     = cases.filter((c) => !["resolved", "closed"].includes(c.status)).length;
  const resolvedCases = cases.filter((c) => ["resolved", "closed"].includes(c.status)).length;

  const quickActions = [
    { icon: AlertTriangle, label: "Report an Issue", href: "/resident-portal/report", color: "from-red-900/60 to-red-950 border-red-800/40", iconColor: "text-red-400" },
    { icon: Calendar,      label: "View My Schedule", href: "/resident-portal/schedule", color: "from-blue-900/60 to-blue-950 border-blue-800/40", iconColor: "text-blue-400" },
    { icon: ClipboardList, label: "Track My Cases", href: "/resident-portal/cases", color: "from-purple-900/60 to-purple-950 border-purple-800/40", iconColor: "text-purple-400" },
    { icon: Recycle,       label: "Recycling Guide",  href: "/recycling-education", color: "from-teal-900/60 to-teal-950 border-teal-800/40", iconColor: "text-teal-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-2xl p-6 border border-green-800/30 overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 100%)" }}
      >
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="relative flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-green-400 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h1 className="text-2xl font-black text-white mb-1">{user?.name} {user?.surname}</h1>
            <div className="flex items-center gap-1.5 text-green-300/60 text-xs">
              <MapPin className="w-3.5 h-3.5" />
              {user?.address}, {user?.suburb}
            </div>
          </div>
          {notifs.length > 0 && (
            <Link href="/resident-portal/notifications" className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-yellow-500/30 transition-colors">
              <Bell className="w-3.5 h-3.5" />
              {notifs.length} unread notification{notifs.length > 1 ? "s" : ""}
            </Link>
          )}
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ClipboardList, label: "Total Cases",   value: cases.length,   color: "blue" },
          { icon: Clock,         label: "Open Cases",    value: openCases,      color: "yellow" },
          { icon: CheckCircle2,  label: "Resolved",      value: resolvedCases,  color: "green" },
          { icon: Bell,          label: "Notifications", value: notifs.length,  color: "orange" },
        ].map((s, i) => {
          const SIcon = s.icon;
          const colorMap: Record<string, string> = {
            blue: "bg-blue-900/50 text-blue-400 border-blue-800/30",
            yellow: "bg-yellow-900/50 text-yellow-400 border-yellow-800/30",
            green: "bg-green-900/50 text-green-400 border-green-800/30",
            orange: "bg-orange-900/50 text-orange-400 border-orange-800/30",
          };
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE }}
              className={cn("rounded-2xl p-5 border bg-gray-900", colorMap[s.color].split(" ").slice(2).join(" "))}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", colorMap[s.color].split(" ").slice(0, 2).join(" "))}>
                <SIcon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-black text-white"><AnimatedCounter to={s.value} duration={800} /></div>
              <div className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Collection schedule card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full">
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">My Collection Schedule</h3>
              <Link href="/resident-portal/schedule" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                Details <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {schedule ? (
              <div className="p-5 space-y-4">
                <div className="text-center p-4 bg-green-900/20 rounded-xl border border-green-800/30">
                  <Truck className="w-7 h-7 text-green-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 mb-1">Next Collection</p>
                  <p className="text-white font-black text-lg">{schedule.nextCollection}</p>
                </div>
                {[
                  { icon: Recycle, label: "Recycling Day", value: schedule.recyclingDay, color: "text-teal-400" },
                  { icon: MapPin,  label: "Depot",         value: schedule.depot,         color: "text-yellow-400" },
                  { icon: Calendar,label: "Regular Day",   value: schedule.collectionDay, color: "text-blue-400" },
                ].map((item) => {
                  const IIcon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <IIcon className={cn("w-4 h-4 shrink-0", item.color)} />
                      <div>
                        <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm text-gray-300 font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="p-5 text-sm text-gray-500">No schedule found.</p>
            )}
          </div>
        </motion.div>

        {/* Recent cases */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="lg:col-span-2"
        >
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden h-full">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h3 className="font-bold text-white text-sm">Recent Cases</h3>
              <Link href="/resident-portal/cases" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {cases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-5 text-center">
                <ClipboardList className="w-10 h-10 text-gray-700 mb-3" />
                <p className="text-gray-400 font-medium mb-1">No cases yet</p>
                <p className="text-xs text-gray-600 mb-4">Report a waste service issue to get started</p>
                <Link href="/resident-portal/report" className="text-xs text-green-400 hover:text-green-300 font-semibold flex items-center gap-1">
                  Report an issue <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {cases.slice(0, 5).map((c) => (
                  <Link key={c.id} href={`/resident-portal/cases/${c.id}`}
                    className="flex items-start justify-between px-5 py-4 hover:bg-white/5 transition-colors group">
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-green-400">{c.referenceNumber}</p>
                      <p className="text-sm text-white font-medium mt-0.5 line-clamp-1">{c.description}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{c.suburb} · {new Date(c.createdAt).toLocaleDateString("en-ZA")}</p>
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
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
      >
        <h3 className="font-bold text-white text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => {
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
