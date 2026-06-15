"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar, AlertTriangle, Trash2, MapPin,
  Bell, Recycle, Phone,
} from "lucide-react";

const actions = [
  { icon: Calendar,      label: "Check My Collection Day",   href: "/collection-schedule",            color: "from-green-600 to-green-700",  glow: "shadow-green-500/30" },
  { icon: AlertTriangle, label: "Report Illegal Dumping",    href: "/report?type=illegal-dumping",    color: "from-red-500 to-red-700",      glow: "shadow-red-500/30" },
  { icon: Trash2,        label: "Report Missed Collection",  href: "/report?type=missed-collection",  color: "from-orange-500 to-orange-700",glow: "shadow-orange-500/30" },
  { icon: MapPin,        label: "Find Nearest Facility",     href: "/find-facility",                  color: "from-blue-500 to-blue-700",    glow: "shadow-blue-500/30" },
  { icon: Bell,          label: "View Service Notices",      href: "/news?category=notice",           color: "from-yellow-500 to-yellow-600",glow: "shadow-yellow-500/30" },
  { icon: Recycle,       label: "Learn About Recycling",     href: "/recycling-education",            color: "from-teal-500 to-teal-700",    glow: "shadow-teal-500/30" },
  { icon: Phone,         label: "Contact Pikitup",           href: "/contact",                        color: "from-gray-600 to-gray-800",    glow: "shadow-gray-500/20" },
];

const EASE = [0.25, 0.4, 0.25, 1] as const;

export default function QuickActions() {
  return (
    <section className="relative z-10 px-4 -mt-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          className="glass-white rounded-3xl shadow-2xl shadow-black/10 border border-white/60 p-6 md:p-8"
        >
          <p className="text-[11px] font-bold text-green-700 uppercase tracking-[0.2em] mb-5">
            Quick Actions
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {actions.map((action, i) => (
              <motion.div
                key={action.href}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 + i * 0.06, duration: 0.4, ease: EASE }}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <Link
                  href={action.href}
                  className={`
                    relative flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl
                    bg-gradient-to-br ${action.color} text-white
                    shadow-lg ${action.glow}
                    transition-shadow duration-300 hover:shadow-xl group
                  `}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold leading-tight">{action.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
