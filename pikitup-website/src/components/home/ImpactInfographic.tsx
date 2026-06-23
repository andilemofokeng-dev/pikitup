"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Truck, Recycle, Leaf, Clock, BarChart3, Globe2,
  ArrowRight, CheckCircle2, Zap,
} from "lucide-react";
import Link from "next/link";

const EASE = [0.25, 0.4, 0.25, 1] as const;

/* ── Animated SVG ring ── */
function RingProgress({
  pct, color, size = 120, stroke = 10, delay = 0,
}: {
  pct: number; color: string; size?: number; stroke?: number; delay?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once: true, margin: "-40px" });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      {/* Track */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      {/* Progress */}
      <motion.circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ - (circ * pct) / 100 } : { strokeDashoffset: circ }}
        transition={{ duration: 1.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
      />
    </svg>
  );
}

const metrics = [
  {
    pct: 95, label: "Collection Coverage", value: "95%", sub: "of all JHB households",
    color: "#4CAF50", icon: Truck, delay: 0,
  },
  {
    pct: 67, label: "Diversion Rate Target", value: "67%", sub: "waste diverted from landfill by 2030",
    color: "#F9A825", icon: Recycle, delay: 0.15,
  },
  {
    pct: 88, label: "Fleet Utilisation", value: "88%", sub: "trucks operational daily",
    color: "#29B6F6", icon: BarChart3, delay: 0.3,
  },
  {
    pct: 72, label: "On-Time Response", value: "72hr", sub: "avg illegal dump resolution",
    color: "#AB47BC", icon: Clock, delay: 0.45,
  },
];

/* ── Waste journey nodes ── */
const journey = [
  { icon: Truck,       label: "Collected",   sub: "Kerbside pickup", color: "bg-green-500",   ring: "border-green-500/40" },
  { icon: Recycle,     label: "Sorted",      sub: "At MRF centres",  color: "bg-blue-500",    ring: "border-blue-500/40" },
  { icon: Leaf,        label: "Recovered",   sub: "Recycled or composted", color: "bg-teal-500", ring: "border-teal-500/40" },
  { icon: Globe2,      label: "Disposed",    sub: "Regulated landfill", color: "bg-orange-500", ring: "border-orange-500/40" },
];

/* ── Impact stats ── */
const impact = [
  { icon: CheckCircle2, value: "1.2M+", label: "Households Served",       color: "text-green-400" },
  { icon: Zap,          value: "6 000t", label: "Waste Collected Daily",   color: "text-yellow-400" },
  { icon: Recycle,      value: "9 000km", label: "Roads Cleaned Monthly",  color: "text-blue-400" },
  { icon: Globe2,       value: "44",      label: "Garden Refuse Sites",    color: "text-teal-400" },
];

export default function ImpactInfographic() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef as unknown as React.RefObject<Element>, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 60%, #1B5E20 100%)" }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 hero-dot-pattern opacity-10" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(76,175,80,0.4) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(249,168,37,0.35) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="section-label text-green-400">Environmental Impact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Measuring What <span className="gradient-text">Matters</span>
          </h2>
          <p className="text-green-300/70 text-lg max-w-2xl mx-auto">
            Transparent performance metrics that show our commitment to a cleaner, greener Johannesburg
          </p>
        </motion.div>

        {/* ── Waste Journey Flow ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-20"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-green-400/60 mb-8">
            The Waste Journey
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
            {journey.map((step, i) => (
              <div key={step.label} className="flex flex-col sm:flex-row items-center">
                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className={`relative w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-xl border-2 ${step.ring}`}>
                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl border-2 ${step.ring}`}
                      animate={{ opacity: [0, 0.7, 0], scale: [1, 1.35, 1.6] }}
                      transition={{ duration: 2.5, delay: 1 + i * 0.3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">{step.label}</div>
                    <div className="text-green-400/60 text-xs">{step.sub}</div>
                  </div>
                </motion.div>

                {/* Connector arrow */}
                {i < journey.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: EASE }}
                    className="hidden sm:flex items-center mx-4"
                  >
                    <div className="w-12 h-px bg-gradient-to-r from-white/20 to-white/10" />
                    <ArrowRight className="w-4 h-4 text-white/30 -ml-1" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Performance Rings ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: EASE }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-4 group hover:scale-[1.02]"
            >
              <div className="relative">
                <RingProgress pct={m.pct} color={m.color} size={110} stroke={9} delay={0.5 + i * 0.1} />
                {/* Centre icon + value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <m.icon className="w-5 h-5 mb-0.5" style={{ color: m.color }} />
                  <span className="text-white font-black text-base leading-none" style={{ color: m.color }}>
                    {m.value}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-sm mb-1">{m.label}</div>
                <div className="text-green-400/50 text-xs leading-relaxed">{m.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Impact numbers strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="glass rounded-2xl border border-white/10 p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impact.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.65 + i * 0.08, ease: EASE }}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-black ${item.color}`}>{item.value}</div>
                <div className="text-white/60 text-xs leading-relaxed">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA row inside the strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-green-300/70 text-sm max-w-md">
              We publish quarterly performance reports so Johannesburg residents can hold us accountable.
            </p>
            <Link
              href="/about/annual-reports"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap"
            >
              View Annual Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
