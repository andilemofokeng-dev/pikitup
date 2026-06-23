"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const DURATION = 3200; // ms before auto-dismiss

function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400/60"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -60, -120] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }}
    />
  );
}

const particles = [
  { x: 15, y: 70, delay: 0.2 }, { x: 25, y: 80, delay: 0.6 }, { x: 35, y: 75, delay: 1.0 },
  { x: 45, y: 85, delay: 0.4 }, { x: 55, y: 78, delay: 0.8 }, { x: 65, y: 72, delay: 0.3 },
  { x: 75, y: 82, delay: 1.2 }, { x: 85, y: 76, delay: 0.7 }, { x: 20, y: 60, delay: 1.4 },
  { x: 80, y: 65, delay: 0.5 }, { x: 50, y: 90, delay: 0.9 }, { x: 30, y: 88, delay: 1.6 },
];

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show if no recent splash (cooldown: 5 minutes)
    const COOLDOWN = 5 * 60 * 1000;
    const last = Number(localStorage.getItem("pikitup_splash_ts") ?? 0);
    if (Date.now() - last > COOLDOWN) {
      setVisible(true);
      localStorage.setItem("pikitup_splash_ts", String(Date.now()));
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / (DURATION - 400)) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => setVisible(false), 400);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 50%, #1B5E20 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 hero-dot-pattern opacity-10" />

          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </div>

          {/* Ambient glow layers */}
          <motion.div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(76,175,80,0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(249,168,37,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />

          {/* Centre content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo card with rings */}
            <div className="relative">
              {/* Pulse rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-[2.5rem] border"
                  style={{ borderColor: i === 1 ? "rgba(249,168,37,0.3)" : "rgba(76,175,80,0.3)" }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.85, 1.3 + i * 0.15, 1.6 + i * 0.2] }}
                  transition={{
                    duration: 2.5,
                    delay: 0.8 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 1.0,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Logo shimmer wrapper */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(40px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-10">
                  <motion.div
                    className="absolute inset-y-0 w-[40%] -skew-x-12"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
                    initial={{ x: "-130%" }}
                    animate={{ x: "320%" }}
                    transition={{
                      duration: 0.9,
                      delay: 1.6,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  />
                </div>

                {/* Logo on white card */}
                <motion.div
                  className="relative bg-white rounded-3xl px-12 py-8 shadow-2xl shadow-black/50"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="absolute inset-0 rounded-3xl ring-2 ring-white/20 pointer-events-none" />
                  <Image
                    src="/pikitup-logo.png"
                    alt="Pikitup Johannesburg"
                    width={340}
                    height={120}
                    priority
                    className="h-24 sm:h-28 md:h-32 w-auto object-contain relative"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-center"
            >
              <p className="text-white/50 text-xs font-semibold uppercase tracking-[0.3em] mb-1">
                City of Johannesburg
              </p>
              <p className="text-green-300 text-sm font-medium tracking-wide">
                Integrated Waste Management
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-64 sm:w-80"
            >
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #4CAF50, #F9A825)",
                    width: `${progress}%`,
                    transition: "width 0.05s linear",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-white/20 tracking-widest uppercase">Loading</span>
                <span className="text-[10px] text-white/30 font-mono">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 text-center"
          >
            <p className="text-yellow-400/60 text-xs font-medium italic">
              &ldquo;We Do Better Together&rdquo;
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
