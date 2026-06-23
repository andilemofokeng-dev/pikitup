"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.25, 0.4, 0.25, 1] as const;

const VALUES = [
  {
    letter: "P", name: "People-Centric", emoji: "🤝",
    color: "from-green-900/60 to-green-950", border: "border-green-700/40", accent: "text-green-400", glow: "shadow-green-900/40",
    desc: "We work tirelessly to show deep respect for human beings inside and outside our company and for the communities in which they live, while ensuring our work reflects the diversity of our people.",
  },
  {
    letter: "I", name: "Integrity", emoji: "⚖️",
    color: "from-blue-900/60 to-blue-950", border: "border-blue-700/40", accent: "text-blue-400", glow: "shadow-blue-900/40",
    desc: "We are honest, open, ethical and fair. People trust us to adhere to our word.",
  },
  {
    letter: "K", name: "Knowledgeable", emoji: "🌿",
    color: "from-teal-900/60 to-teal-950", border: "border-teal-700/40", accent: "text-teal-400", glow: "shadow-teal-900/40",
    desc: "We strive to employ best practices that seek to minimise negative impacts of waste on the environment.",
  },
  {
    letter: "I", name: "Innovation", emoji: "💡",
    color: "from-yellow-900/60 to-yellow-950", border: "border-yellow-700/40", accent: "text-yellow-400", glow: "shadow-yellow-900/40",
    desc: "We aim to achieve a culture of innovation and continuous improvement.",
  },
  {
    letter: "T", name: "Trustworthiness", emoji: "🛡️",
    color: "from-orange-900/60 to-orange-950", border: "border-orange-700/40", accent: "text-orange-400", glow: "shadow-orange-900/40",
    desc: "We endeavour to get it right the first time, every time and on time with candid communication with our customers and communities.",
  },
  {
    letter: "U", name: "Unity", emoji: "🌍",
    color: "from-purple-900/60 to-purple-950", border: "border-purple-700/40", accent: "text-purple-400", glow: "shadow-purple-900/40",
    desc: "We pull together as a team to drive success, knowing that our success depends on our ability to help our customers and communities receive value-added services.",
  },
  {
    letter: "P", name: "Passion", emoji: "❤️",
    color: "from-red-900/60 to-red-950", border: "border-red-700/40", accent: "text-red-400", glow: "shadow-red-900/40",
    desc: "Passion is at the heart of our company. We are passionate about continuously driving sustainable environmental practices that achieve the most efficient and effective use of our resources.",
  },
];

function AnimCard({ v, i }: { v: typeof VALUES[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
      className={`relative bg-gradient-to-br ${v.color} border ${v.border} rounded-2xl p-6 flex gap-5 hover:scale-[1.02] transition-transform duration-300 shadow-lg ${v.glow}`}
    >
      {/* Glow dot */}
      <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full animate-pulse ${v.accent.replace("text-", "bg-")}`} />
      <div className={`w-14 h-14 rounded-2xl bg-black/20 flex items-center justify-center shrink-0 text-3xl font-black ${v.accent} border ${v.border}`}>
        {v.letter}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{v.emoji}</span>
          <h3 className={`font-black text-base ${v.accent}`}>{v.name}</h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
      </div>
    </motion.div>
  );
}

function VisionBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10 md:p-14 text-center"
      style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 60%, #1B5E20 100%)" }}>
      <div className="absolute inset-0 hero-dot-pattern opacity-10" />
      {/* Glow orbs */}
      <motion.div className="absolute w-80 h-80 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, y: -10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-yellow-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Our Vision
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
          To be the{" "}
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #4CAF50, #F9A825)" }}>
            leading
          </span>{" "}
          integrated waste management company in Africa and amongst the best in the world.
        </motion.h2>
        {/* PIKITUP acronym */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center gap-3 flex-wrap mt-8">
          {["P","I","K","I","T","U","P"].map((l, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-lg">
              {l}
            </motion.div>
          ))}
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
          className="text-green-400/60 text-xs font-semibold mt-3 tracking-widest uppercase">People-Centric</motion.p>
      </div>
    </div>
  );
}

function MissionBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const pillars = [
    { icon: "♻️", label: "Reduction" },
    { icon: "🔄", label: "Re-Use" },
    { icon: "🌿", label: "Recycling" },
    { icon: "⚡", label: "Recovery" },
    { icon: "⚠️", label: "Disposal (Last Resort)" },
  ];
  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}>
        <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">Our Mission</p>
        <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-5">
          Integrated, Sustainable &amp;<br />Innovative Waste Management
        </h2>
        <p className="text-gray-400 leading-relaxed text-sm mb-6">
          To provide integrated, sustainable, and innovative waste management services that ensure waste reduction, re-use, recycling and recovery — considering waste disposal (landfilling) as the <span className="text-yellow-400 font-semibold">last resort</span>.
        </p>
        <div className="flex flex-wrap gap-2">
          {pillars.map((p, i) => (
            <motion.div key={p.label}
              initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/60 rounded-xl px-3 py-2 text-xs font-semibold text-gray-300">
              <span>{p.icon}</span> {p.label}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hierarchy diagram */}
      <motion.div
        initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 text-center">Waste Hierarchy</p>
        {[
          { icon: "♻️", label: "Reduce",   width: "w-full",    bg: "from-green-800/60 to-green-900/40",  border: "border-green-700/30", rank: "Most Preferred" },
          { icon: "🔄", label: "Re-Use",   width: "w-[88%]",   bg: "from-teal-800/60 to-teal-900/40",   border: "border-teal-700/30",  rank: "" },
          { icon: "🌿", label: "Recycle",  width: "w-[76%]",   bg: "from-blue-800/60 to-blue-900/40",   border: "border-blue-700/30",  rank: "" },
          { icon: "⚡", label: "Recover",  width: "w-[64%]",   bg: "from-yellow-800/60 to-yellow-900/40",border: "border-yellow-700/30",rank: "" },
          { icon: "🗑️", label: "Dispose",  width: "w-[52%]",   bg: "from-red-900/60 to-red-950/60",     border: "border-red-800/30",   rank: "Last Resort" },
        ].map((tier, i) => (
          <motion.div key={tier.label} className={`${tier.width} mx-auto`}
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: EASE }}>
            <div className={`flex items-center gap-3 bg-gradient-to-r ${tier.bg} border ${tier.border} rounded-xl px-4 py-3`}>
              <span className="text-xl">{tier.icon}</span>
              <span className="font-bold text-white text-sm">{tier.label}</span>
              {tier.rank && <span className="ml-auto text-[10px] font-semibold text-gray-500">{tier.rank}</span>}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function VisionMissionSection() {
  return (
    <>
      {/* Vision */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <VisionBlock />
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-gray-900 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <MissionBlock />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.4em] mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">The PIKITUP Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Seven values that drive everything Pikitup does and the manner in which it is done.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => <AnimCard key={v.name + i} v={v} i={i} />)}
          </div>

          {/* Ethics info */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-1">Fraud Hotline</p>
              <a href="tel:0800002587" className="text-white font-black text-lg hover:text-yellow-400 transition-colors">0800 002 587</a>
              <p className="text-[10px] text-gray-600 mt-0.5">Toll free · Available 24/7</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4">
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-1">Ethics Email</p>
              <a href="mailto:pikitupethics@pikitup.co.za" className="text-white font-semibold text-sm hover:text-yellow-400 transition-colors">
                pikitupethics@pikitup.co.za
              </a>
              <p className="text-[10px] text-gray-600 mt-0.5">Confidential reporting</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
