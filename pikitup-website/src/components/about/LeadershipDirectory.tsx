"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Building2, Users, SlidersHorizontal } from "lucide-react";
import type { DepotManager } from "@/lib/leadership-store";

const EASE = [0.25, 0.4, 0.25, 1] as const;

function initials(name: string) {
  const parts = name.replace(/^(Ms|Mr|Dr)\.?\s/i, "").trim().split(" ");
  return (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
}

type FilterOption = "all" | "Regional Manager" | "Operations Manager";

interface Props {
  managers: DepotManager[];
  depots: string[];
}

export default function LeadershipDirectory({ managers, depots }: Props) {
  const [search,      setSearch]      = useState("");
  const [filter,      setFilter]      = useState<FilterOption>("all");
  const [activeDepot, setActiveDepot] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return managers.filter((m) =>
      (filter === "all" || m.role === filter) &&
      (activeDepot === "all" || m.depot === activeDepot) &&
      (q === "" || m.name.toLowerCase().includes(q) || m.depot.toLowerCase().includes(q))
    ).sort((a, b) => a.order - b.order);
  }, [managers, search, filter, activeDepot]);

  const grouped = useMemo(() => {
    const g: Record<string, DepotManager[]> = {};
    filtered.forEach((m) => { (g[m.depot] ??= []).push(m); });
    return g;
  }, [filtered]);

  return (
    <div>
      {/* ── Filters ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-200 rounded-xl px-3 py-2.5 flex-1 max-w-sm transition-all">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search name or depot…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
          />
        </div>

        {/* Role filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {(["all", "Regional Manager", "Operations Manager"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-700 text-white border-green-700 shadow-sm"
                  : "text-gray-600 bg-white border-gray-300 hover:border-green-400 hover:text-green-700"
              }`}>
              {f === "all" ? "All Roles" : f + "s"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Depot scroll tabs ────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {["all", ...depots].map((d) => (
          <button key={d} type="button" onClick={() => setActiveDepot(d === activeDepot ? "all" : d)}
            className={`shrink-0 text-[11px] font-semibold px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap ${
              activeDepot === d
                ? "bg-green-700 text-white border-green-700 shadow-sm"
                : "bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-700"
            }`}>
            {d === "all" ? "All Depots" : d}
          </button>
        ))}
      </div>

      {/* ── Results grid ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {Object.keys(grouped).length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <Users className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No managers match your filters.</p>
          </motion.div>
        ) : (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([depot, people], di) => (
                <motion.div key={depot}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: di * 0.04, ease: EASE }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">

                  {/* Depot header */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="w-3.5 h-3.5 text-green-700" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 truncate flex-1">{depot}</span>
                    <span className="text-[10px] font-semibold text-gray-400 shrink-0 bg-gray-200 px-2 py-0.5 rounded-full">
                      {people.length}
                    </span>
                  </div>

                  {/* People list */}
                  <div className="divide-y divide-gray-50">
                    {people.map((m, pi) => (
                      <motion.div key={m.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: di * 0.04 + pi * 0.03, duration: 0.3 }}
                        className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors group">

                        {/* Avatar */}
                        <div className={`w-9 h-9 rounded-xl overflow-hidden shrink-0 border transition-transform group-hover:scale-105 ${
                          m.role === "Regional Manager"
                            ? "border-purple-200"
                            : "border-indigo-200"
                        }`}>
                          {m.imageUrl ? (
                            <Image src={m.imageUrl} alt={m.name} width={36} height={36}
                              className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full flex items-center justify-center text-[10px] font-black ${
                              m.role === "Regional Manager"
                                ? "bg-purple-100 text-purple-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}>
                              {initials(m.name)}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-gray-800 truncate">{m.name}</p>
                          <span className={`text-[10px] font-semibold ${
                            m.role === "Regional Manager" ? "text-purple-600" : "text-indigo-600"
                          }`}>
                            {m.role}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-gray-400 mt-8">
        Showing {filtered.length} of {managers.length} depot managers
      </p>
    </div>
  );
}
