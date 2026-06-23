"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search, ArrowRight, Shield, ChevronDown,
  Trash2, MapPin, AlertTriangle, Phone,
} from "lucide-react";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const floatingBadges = [
  { icon: Trash2,       label: "1.2M+ Households",   color: "bg-green-500/90",   pos: "top-[22%] right-[8%]",   delay: 0 },
  { icon: MapPin,       label: "12 Depots Active",    color: "bg-blue-500/90",    pos: "top-[48%] right-[5%]",   delay: 0.3 },
  { icon: Phone,        label: "0860 562874",         color: "bg-yellow-500/90",  pos: "bottom-[30%] right-[9%]",delay: 0.6 },
  { icon: AlertTriangle,label: "Report Illegal Dump", color: "bg-red-500/90",     pos: "top-[68%] right-[3%]",   delay: 0.9 },
];

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-green-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1561069157-218187260215?auto=format&fit=crop&w=1920&h=1080&q=85"
          alt="Pikitup waste collection truck and bins"
          fill
          priority
          className="object-cover scale-[1.04]"
          quality={85}
        />
        {/* layered overlays — keep left side dark for legibility, ease off right to reveal truck */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/97 via-green-900/85 to-green-800/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-green-950/30" />
        <div className="absolute inset-0 hero-dot-pattern opacity-20" />
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-400/8 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating badges — right side */}
      <div className="hidden lg:block">
        {floatingBadges.map((badge, i) => (
          <motion.div
            key={badge.label}
            className={`absolute ${badge.pos} z-20`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + badge.delay, duration: 0.6, ease: EASE }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className={`glass flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl ${badge.color}`}
            >
              <badge.icon className="w-4 h-4 text-white shrink-0" />
              <span className="text-white text-xs font-semibold whitespace-nowrap">
                {badge.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-28 w-full">
        <div className="max-w-[720px]">

          {/* Official badge pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 sm:mb-12"
          >
            <span className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 text-sm text-white border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <Shield className="w-4 h-4 text-yellow-300" />
              Official Waste Management · City of Johannesburg
            </span>
          </motion.div>

          {/* ── BIG LOGO — hero centrepiece ── */}
          <motion.div
            className="relative inline-flex mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.45, filter: "blur(28px)" }}
            animate={{ opacity: 1, scale: 1,    filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Deep ambient glow — large green/gold cloud */}
            <motion.div
              aria-hidden
              className="absolute -inset-10 rounded-[3rem] bg-gradient-to-r from-green-400/50 via-yellow-300/30 to-green-400/50 blur-3xl"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.88, 1.12, 0.88] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Warm gold under-glow */}
            <motion.div
              aria-hidden
              className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-yellow-300/20 via-transparent to-green-400/20 blur-2xl"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Shimmer sweep across the full logo */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <motion.div
                aria-hidden
                className="absolute inset-y-0 w-[35%] bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
                initial={{ x: "-130%" }}
                animate={{ x: "320%" }}
                transition={{
                  duration: 1.1,
                  delay: 2.2,
                  repeat: Infinity,
                  repeatDelay: 4.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>

            {/* Pulse ring 1 — green */}
            <motion.div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] border-2 border-green-400/45"
              animate={{ opacity: [0, 1, 0], scale: [0.88, 1.06, 1.32] }}
              transition={{ duration: 2.6, delay: 1.7, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
            />

            {/* Pulse ring 2 — gold, offset timing */}
            <motion.div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] border border-yellow-400/25"
              animate={{ opacity: [0, 0.65, 0], scale: [0.9, 1.1, 1.45] }}
              transition={{ duration: 2.6, delay: 2.3, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
            />

            {/* Pulse ring 3 — white, slowest */}
            <motion.div
              aria-hidden
              className="absolute -inset-10 rounded-[3rem] border border-white/10"
              animate={{ opacity: [0, 0.4, 0], scale: [0.92, 1.08, 1.5] }}
              transition={{ duration: 3.0, delay: 2.9, repeat: Infinity, repeatDelay: 2.4, ease: "easeOut" }}
            />

            {/* Floating logo on a crisp white card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white rounded-3xl px-5 py-4 sm:px-10 sm:py-7 shadow-2xl shadow-black/40"
            >
              {/* Card inner glow edge */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60 pointer-events-none" />
              <Image
                src="/pikitup-logo.png"
                alt="Pikitup Johannesburg"
                width={420}
                height={140}
                priority
                className="relative h-28 sm:h-36 md:h-44 w-auto object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
            className="mb-7"
          >
            <div className="flex gap-2 max-w-xl bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 flex-1 pl-2 sm:pl-3">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Your suburb or street..."
                  className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder:text-gray-400 min-w-0"
                />
              </div>
              <Link href={`/collection-schedule${query ? `?q=${encodeURIComponent(query)}` : ""}`}>
                <Button variant="gold" className="shrink-0 font-bold shadow-lg text-sm">
                  <span className="hidden sm:inline">Find My Collection Day</span>
                  <span className="sm:hidden">Search</span>
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65, ease: EASE }}
            className="flex flex-wrap gap-3 mb-10 sm:mb-14"
          >
            <Link href="/report">
              <Button variant="white" size="lg" className="group shadow-xl">
                Report a Problem
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/find-facility">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/60"
              >
                Find a Facility
              </Button>
            </Link>
            <Link href="/resident-portal">
              <Button
                size="lg"
                variant="ghost"
                className="text-green-200 hover:text-white hover:bg-white/10"
              >
                Resident Portal
              </Button>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-white/10"
          >
            {[
              { value: "4,500+", label: "Employees" },
              { value: "200+",   label: "Trucks" },
              { value: "12",     label: "Depots" },
              { value: "44",     label: "Garden Sites" },
              { value: "6,000t", label: "Collected Daily" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.08, duration: 0.5, ease: EASE }}
              >
                <div className="text-2xl font-black text-yellow-300">{s.value}</div>
                <div className="text-xs text-green-300 mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/30" />
      </motion.div>
    </section>
  );
}
