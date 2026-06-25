"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Calendar, AlertTriangle, Trash2, MapPin,
  Bell, Recycle, Phone,
} from "lucide-react";

const actions = [
  {
    icon: Calendar,
    label: "Check My Collection Day",
    href: "/collection-schedule",
    gradient: "from-green-500 to-green-700",
    shadow: "shadow-green-500/30 hover:shadow-green-500/50",
  },
  {
    icon: AlertTriangle,
    label: "Report Illegal Dumping",
    href: "/report?type=illegal-dumping",
    gradient: "from-red-500 to-red-700",
    shadow: "shadow-red-500/30 hover:shadow-red-500/50",
  },
  {
    icon: Trash2,
    label: "Report Missed Collection",
    href: "/report?type=missed-collection",
    gradient: "from-orange-500 to-orange-700",
    shadow: "shadow-orange-500/30 hover:shadow-orange-500/50",
  },
  {
    icon: MapPin,
    label: "Find Nearest Facility",
    href: "/find-facility",
    gradient: "from-blue-500 to-blue-700",
    shadow: "shadow-blue-500/30 hover:shadow-blue-500/50",
  },
  {
    icon: Bell,
    label: "View Service Notices",
    href: "/news?category=notice",
    gradient: "from-yellow-500 to-yellow-600",
    shadow: "shadow-yellow-500/30 hover:shadow-yellow-500/50",
  },
  {
    icon: Recycle,
    label: "Learn About Recycling",
    href: "/recycling-education",
    gradient: "from-teal-500 to-teal-700",
    shadow: "shadow-teal-500/30 hover:shadow-teal-500/50",
  },
  {
    icon: Phone,
    label: "Contact Pikitup",
    href: "/contact",
    gradient: "from-gray-600 to-gray-800",
    shadow: "shadow-gray-500/20 hover:shadow-gray-500/40",
  },
];

// ── Variants ──────────────────────────────────────────────────────────────────

// Card: staggered spring drop-in, lift on hover
const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.86 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.75 + i * 0.07,
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  }),
  hover: {
    scale: 1.08,
    y: -7,
    transition: { type: "spring" as const, stiffness: 400, damping: 18 },
  },
  tap: {
    scale: 0.94,
    y: 0,
    transition: { type: "spring" as const, stiffness: 500, damping: 28 },
  },
};

// Icon: wobble shake propagated from parent whileHover="hover"
const iconVariants = {
  hidden:  { rotate: 0, scale: 1 },
  visible: { rotate: 0, scale: 1 },
  hover: {
    rotate: [0, -14, 14, -7, 4, 0],
    scale:  [1,  1.3,  1.2, 1.25, 1.15, 1.18],
    transition: { duration: 0.48, ease: "easeInOut" as const },
  },
  tap: { rotate: -8, scale: 1.1 },
};

const EASE = [0.25, 0.4, 0.25, 1] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function QuickActions() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative z-10 px-4 -mt-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="glass-white rounded-3xl shadow-2xl shadow-black/10 border border-white/60 p-6 md:p-8"
        >
          {/* Heading */}
          <div className="flex items-center gap-2 mb-6">
            <motion.span
              className="relative flex h-2 w-2 shrink-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 400, damping: 18 }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </motion.span>

            <motion.p
              className="text-[11px] font-bold text-green-700 uppercase tracking-[0.22em]"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.64, duration: 0.35, ease: EASE }}
            >
              Quick Actions
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 [&>*:last-child]:col-start-2 sm:[&>*:last-child]:col-auto">
            {actions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.href}
                  variants={cardVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  whileHover="hover"
                  whileTap="tap"
                  custom={i}
                >
                  <Link
                    href={action.href}
                    className={`
                      group relative flex flex-col items-center text-center gap-2.5
                      p-4 rounded-2xl overflow-hidden select-none
                      bg-gradient-to-br ${action.gradient} text-white
                      shadow-lg ${action.shadow} hover:shadow-xl
                      transition-shadow duration-300
                    `}
                  >
                    {/* Shimmer sweep — CSS only, always reliable */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12
                        bg-gradient-to-r from-transparent via-white/30 to-transparent
                        group-hover:translate-x-full transition-transform duration-500 ease-in-out"
                    />

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors duration-200 flex items-center justify-center">
                      <motion.span
                        variants={iconVariants}
                        className="flex items-center justify-center"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.span>
                    </div>

                    {/* Label */}
                    <span className="text-[11px] font-semibold leading-tight group-hover:-translate-y-0.5 transition-transform duration-200">
                      {action.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
