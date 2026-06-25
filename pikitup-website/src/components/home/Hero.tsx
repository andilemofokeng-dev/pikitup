"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Search, Shield, ChevronDown,
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
  const router = useRouter();

  function handleSearch() {
    const q = query.trim();
    router.push(q ? `/collection-schedule?q=${encodeURIComponent(q)}` : "/collection-schedule");
  }

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
              className="relative bg-white rounded-3xl px-8 py-6 sm:px-14 sm:py-9 shadow-2xl shadow-black/40"
            >
              {/* Card inner glow edge */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60 pointer-events-none" />
              <Image
                src="/pikitup-logo.png"
                alt="Pikitup Johannesburg"
                width={560}
                height={180}
                priority
                className="relative h-36 sm:h-48 md:h-60 w-auto object-contain"
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Your suburb or street..."
                  className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder:text-gray-400 min-w-0"
                />
              </div>
              <Button
                variant="gold"
                onClick={handleSearch}
                className="shrink-0 font-bold shadow-lg text-sm"
              >
                <span className="hidden sm:inline">Find My Collection Day</span>
                <span className="sm:hidden">Search</span>
              </Button>
            </div>
          </motion.div>

          {/* Dancing recycling bin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65, ease: EASE }}
            className="flex items-center gap-4 mb-10 sm:mb-14"
          >
            {/* Bouncing recycling logo */}
            <div className="relative shrink-0">
              {/* Glow ring */}
              <motion.div
                aria-hidden
                className="absolute -inset-4 rounded-full bg-green-400/30 blur-2xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Bounce */}
              <motion.div
                animate={{
                  y:     [0, -18, 0, -12, 0, -6, 0],
                  scale: [1, 1.06, 0.97, 1.04, 0.98, 1.02, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="relative"
              >
                <Image
                  src="/pikitup-logo-3.png"
                  alt="Recycle — Reduce, Re-use, Rethink"
                  width={200}
                  height={200}
                  className="w-40 h-40 object-contain drop-shadow-2xl filter brightness-110"
                />
              </motion.div>

              {/* Shadow squish on the floor — compresses when logo lands */}
              <motion.div
                aria-hidden
                animate={{
                  scaleX:  [1, 1.3, 0.8, 1.2, 0.9, 1.1, 1],
                  opacity: [0.4, 0.15, 0.55, 0.2, 0.5, 0.3, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: [0.33, 1, 0.68, 1],
                }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/30 rounded-full blur-sm"
              />
            </div>

            {/* Text */}
            <div>
              <motion.p
                className="text-white font-bold text-base sm:text-lg leading-tight"
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Recycle with Pikitup
              </motion.p>
              <p className="text-green-300/90 text-sm mt-0.5">
                Join 1.2M+ households making a difference
              </p>
            </div>
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
