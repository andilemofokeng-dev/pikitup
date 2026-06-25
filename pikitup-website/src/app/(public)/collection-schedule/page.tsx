"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Search, Trash2, Recycle, Leaf, MapPin, Calendar,
  Truck, Bell, ChevronRight, AlertCircle, Info, Clock,
  Share2, Download, ArrowLeft, CheckCircle2, Phone,
  X, Sparkles, RotateCcw, CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type Suburb = {
  suburb: string;
  aliases?: string[];
  region: string;
  regionFull: string;
  depot: string;
  depotPhone: string;
  collectionDay: string;
  recycling: string;
  garden: string;
  alert?: string;
};

type UpcomingItem = {
  date: Date;
  service: "general" | "recycling" | "garden";
  label: string;
};

// ─── Suburb Database ──────────────────────────────────────────────────────────

const SUBURBS_DB: Suburb[] = [
  // Region A — Johannesburg North
  { suburb: "Sandton", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Friday" },
  { suburb: "Rosebank", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Monday" },
  { suburb: "Morningside", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Wednesday" },
  { suburb: "Rivonia", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Friday" },
  { suburb: "Bryanston", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Friday" },
  { suburb: "Sunninghill", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Monday", recycling: "Thursday (fortnightly)", garden: "Wednesday" },
  { suburb: "Fourways", region: "A", regionFull: "Region A — Johannesburg North", depot: "Diepsloot Depot", depotPhone: "011 350 0600", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Thursday" },
  { suburb: "Randburg", aliases: ["Ferndale", "Bromhof"], region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Wednesday" },
  { suburb: "Northcliff", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Friday", recycling: "Wednesday (fortnightly)", garden: "Monday" },
  { suburb: "Parktown", aliases: ["Parktown North", "Parkwood"], region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Friday" },
  { suburb: "Melville", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Monday" },
  { suburb: "Greenside", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Friday", recycling: "Wednesday (fortnightly)", garden: "Tuesday" },
  { suburb: "Alexandra", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available", alert: "Collection times in Alexandra may vary. Contact 0860 562 874 for updates." },
  { suburb: "Diepsloot", region: "A", regionFull: "Region A — Johannesburg North", depot: "Diepsloot Depot", depotPhone: "011 350 0600", collectionDay: "Monday", recycling: "Not available", garden: "Not available", alert: "Fleet maintenance scheduled 25 June — collections may be delayed by up to 24 hours." },
  { suburb: "Linden", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Friday" },
  { suburb: "Craighall Park", region: "A", regionFull: "Region A — Johannesburg North", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Wednesday" },
  // Region B — Johannesburg East
  { suburb: "Edenvale", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Thursday" },
  { suburb: "Bedfordview", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Friday" },
  { suburb: "Germiston", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Friday" },
  { suburb: "Boksburg", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Monday" },
  { suburb: "Linbro Park", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Monday" },
  { suburb: "Kensington", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Friday" },
  { suburb: "Malvern", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Alberton", region: "B", regionFull: "Region B — Johannesburg East", depot: "Edenvale Depot", depotPhone: "011 350 0800", collectionDay: "Friday", recycling: "Wednesday (fortnightly)", garden: "Tuesday" },
  // Region C — Johannesburg South
  { suburb: "Roodepoort", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Thursday" },
  { suburb: "Booysens", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Monday" },
  { suburb: "Turffontein", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Friday" },
  { suburb: "Glenvista", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Monday" },
  { suburb: "Bassonia", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Friday", recycling: "Wednesday (fortnightly)", garden: "Tuesday" },
  { suburb: "Lenasia", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Thursday" },
  { suburb: "Ennerdale", region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Johannesburg South", aliases: ["South", "JHB South"], region: "C", regionFull: "Region C — Johannesburg South", depot: "Roodepoort Depot", depotPhone: "011 350 0900", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Friday" },
  // Region D — Soweto
  { suburb: "Soweto", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Monday", recycling: "Not available", garden: "Not available", alert: "Fleet maintenance scheduled 25 June — collections may be delayed by up to 24 hours." },
  { suburb: "Orlando", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Monday", recycling: "Not available", garden: "Not available" },
  { suburb: "Diepkloof", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Tuesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Meadowlands", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Dobsonville", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Thursday", recycling: "Not available", garden: "Not available" },
  { suburb: "Naledi", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Friday", recycling: "Not available", garden: "Not available" },
  { suburb: "Protea Glen", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Monday", recycling: "Not available", garden: "Not available" },
  { suburb: "Pimville", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Dlamini", region: "D", regionFull: "Region D — Soweto", depot: "Soweto Depot", depotPhone: "011 350 0200", collectionDay: "Friday", recycling: "Not available", garden: "Not available" },
  // Region E — Midrand
  { suburb: "Midrand", region: "E", regionFull: "Region E — Midrand", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Friday (fortnightly)", garden: "Tuesday" },
  { suburb: "Halfway House", region: "E", regionFull: "Region E — Midrand", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Friday (fortnightly)", garden: "Tuesday" },
  { suburb: "Kyalami", region: "E", regionFull: "Region E — Midrand", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Monday" },
  { suburb: "Vorna Valley", region: "E", regionFull: "Region E — Midrand", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Friday", recycling: "Wednesday (fortnightly)", garden: "Tuesday" },
  { suburb: "Waterfall", region: "E", regionFull: "Region E — Midrand", depot: "Halfway House Depot", depotPhone: "011 350 0000", collectionDay: "Wednesday", recycling: "Friday (fortnightly)", garden: "Tuesday" },
  // Region F — Johannesburg West
  { suburb: "Auckland Park", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Thursday", recycling: "Tuesday (fortnightly)", garden: "Monday" },
  { suburb: "Westdene", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Monday", recycling: "Wednesday (fortnightly)", garden: "Friday" },
  { suburb: "Sophiatown", aliases: ["Triomf"], region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Tuesday", recycling: "Thursday (fortnightly)", garden: "Not available" },
  { suburb: "Newlands", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Friday" },
  { suburb: "Newclare", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Friday", recycling: "Not available", garden: "Not available" },
  { suburb: "Eldorado Park", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Monday", recycling: "Not available", garden: "Not available" },
  { suburb: "Mayfair", region: "F", regionFull: "Region F — Johannesburg West", depot: "Randburg Depot", depotPhone: "011 350 0300", collectionDay: "Wednesday", recycling: "Monday (fortnightly)", garden: "Not available" },
  // Region G — Orange Farm
  { suburb: "Orange Farm", region: "G", regionFull: "Region G — Orange Farm", depot: "Orange Farm Depot", depotPhone: "011 350 0700", collectionDay: "Monday", recycling: "Not available", garden: "Not available" },
  { suburb: "Stretford", region: "G", regionFull: "Region G — Orange Farm", depot: "Orange Farm Depot", depotPhone: "011 350 0700", collectionDay: "Wednesday", recycling: "Not available", garden: "Not available" },
  { suburb: "Finetown", region: "G", regionFull: "Region G — Orange Farm", depot: "Orange Farm Depot", depotPhone: "011 350 0700", collectionDay: "Friday", recycling: "Not available", garden: "Not available" },
];

const DAY_IDX: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const DAY_SHORT_2: Record<string, string> = {
  Monday: "MO", Tuesday: "TU", Wednesday: "WE",
  Thursday: "TH", Friday: "FR", Saturday: "SA", Sunday: "SU",
};

const REGION_COLORS: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800",
  B: "bg-blue-100 text-blue-800",
  C: "bg-purple-100 text-purple-800",
  D: "bg-orange-100 text-orange-800",
  E: "bg-cyan-100 text-cyan-800",
  F: "bg-rose-100 text-rose-800",
  G: "bg-amber-100 text-amber-800",
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function fuzzySearch(query: string): Suburb[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return SUBURBS_DB.filter((s) => {
    const name = s.suburb.toLowerCase();
    const aliases = (s.aliases ?? []).map((a) => a.toLowerCase());
    return name.includes(q) || aliases.some((a) => a.includes(q)) || q.includes(name);
  }).sort((a, b) => {
    const aStart = a.suburb.toLowerCase().startsWith(q) ? 0 : 1;
    const bStart = b.suburb.toLowerCase().startsWith(q) ? 0 : 1;
    return aStart - bStart;
  });
}

function getDaysUntil(dayName: string): number {
  const idx = DAY_IDX[dayName];
  if (idx === undefined) return -1;
  const todayIdx = new Date().getDay();
  let diff = idx - todayIdx;
  if (diff <= 0) diff += 7;
  return diff;
}

function getUpcomingCollections(s: Suburb, count = 8): UpcomingItem[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const items: UpcomingItem[] = [];
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  for (let d = 1; d <= 42; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const name = dayNames[date.getDay()];
    const weekNum = Math.ceil(d / 7);

    if (name === s.collectionDay) {
      items.push({ date: new Date(date), service: "general", label: "General Waste" });
    }
    if (s.recycling !== "Not available") {
      const [rDay] = s.recycling.split(" ");
      const fortnightly = s.recycling.includes("fortnightly");
      if (name === rDay && (!fortnightly || weekNum % 2 === 1)) {
        items.push({ date: new Date(date), service: "recycling", label: "Recycling Collection" });
      }
    }
    if (s.garden !== "Not available") {
      const [gDay] = s.garden.split(" ");
      if (name === gDay) {
        items.push({ date: new Date(date), service: "garden", label: "Garden Refuse" });
      }
    }
    if (items.length >= count) break;
  }

  return items.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, count);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-ZA", { weekday: "short", day: "numeric", month: "short" });
}

function formatICSDate(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").slice(0, 8);
}

function downloadICS(s: Suburb) {
  const today = new Date();
  const daysUntil = getDaysUntil(s.collectionDay);
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntil);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pikitup//Collection Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${formatICSDate(nextDate)}`,
    `DTEND;VALUE=DATE:${formatICSDate(nextDate)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${DAY_SHORT_2[s.collectionDay] ?? "MO"}`,
    `SUMMARY:Pikitup Waste Collection — ${s.suburb}`,
    `DESCRIPTION:Weekly refuse collection. Put bins out by 06:00.`,
    `LOCATION:${s.suburb}\\, Johannesburg`,
    "BEGIN:VALARM",
    "TRIGGER:-PT12H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Put bins out tonight — collection tomorrow!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([lines], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pikitup-${s.suburb.toLowerCase().replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Animated cycling placeholder ────────────────────────────────────────────

const PLACEHOLDER_SUBURBS = ["Sandton", "Soweto", "Fourways", "Midrand", "Randburg", "Rosebank", "Diepkloof", "Roodepoort"];

function useCyclingPlaceholder() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % PLACEHOLDER_SUBURBS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return `Try "${PLACEHOLDER_SUBURBS[i]}"…`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SERVICE_CONFIG = {
  general:  { icon: Trash2,  color: "bg-green-600",  light: "bg-green-50 border-green-200", text: "text-green-700", label: "General Waste" },
  recycling:{ icon: Recycle, color: "bg-cyan-600",   light: "bg-cyan-50 border-cyan-200",   text: "text-cyan-700",  label: "Recycling" },
  garden:   { icon: Leaf,    color: "bg-amber-500",  light: "bg-amber-50 border-amber-200", text: "text-amber-700", label: "Garden Refuse" },
};

function ServicePill({ service }: { service: "general" | "recycling" | "garden" }) {
  const cfg = SERVICE_CONFIG[service];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${cfg.color} text-white`}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function WeekCalendar({ s }: { s: Suburb }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { date: d, name: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()], fullName: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][d.getDay()], isToday: i === 0 };
  });

  function getService(fullName: string): "general" | "recycling" | "garden" | null {
    if (fullName === s.collectionDay) return "general";
    if (s.recycling !== "Not available" && s.recycling.startsWith(fullName)) return "recycling";
    if (s.garden !== "Not available" && s.garden.startsWith(fullName)) return "garden";
    return null;
  }

  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d, i) => {
        const svc = getService(d.fullName);
        const cfg = svc ? SERVICE_CONFIG[svc] : null;
        const Icon = cfg?.icon;
        return (
          <motion.div
            key={d.fullName}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 * i, duration: 0.3 }}
            className={`relative flex flex-col items-center rounded-xl py-2.5 px-1 border ${
              d.isToday ? "border-green-400 bg-green-50 ring-2 ring-green-300/40" :
              svc ? `${cfg!.light} border` :
              "border-gray-100 bg-white"
            }`}
          >
            <span className={`text-[10px] font-semibold uppercase tracking-wide ${d.isToday ? "text-green-700" : "text-gray-400"}`}>
              {d.name}
            </span>
            <span className={`text-sm font-bold mt-0.5 ${d.isToday ? "text-green-800" : "text-gray-700"}`}>
              {d.date.getDate()}
            </span>
            {svc && Icon && (
              <div className={`mt-1.5 w-6 h-6 rounded-full ${cfg!.color} flex items-center justify-center`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
            )}
            {d.isToday && !svc && (
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Search View ──────────────────────────────────────────────────────────────

function SearchView({
  onSearch,
  recentSearches,
}: {
  onSearch: (s: Suburb) => void;
  recentSearches: string[];
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = useCyclingPlaceholder();

  const suggestions = useMemo(() => fuzzySearch(query).slice(0, 7), [query]);

  useEffect(() => {
    setOpen(suggestions.length > 0 && query.length > 0);
    setHighlighted(0);
  }, [suggestions, query]);

  function select(s: Suburb) {
    setQuery("");
    setOpen(false);
    onSearch(s);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, suggestions.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); if (suggestions[highlighted]) select(suggestions[highlighted]); }
    if (e.key === "Escape")    { setOpen(false); }
  }

  function highlightMatch(text: string) {
    if (!query) return text;
    const i = text.toLowerCase().indexOf(query.toLowerCase());
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-yellow-200 text-gray-900 rounded">{text.slice(i, i + query.length)}</mark>
        {text.slice(i + query.length)}
      </>
    );
  }

  const popular: Record<string, string[]> = {
    "Region A": ["Sandton","Fourways","Randburg","Rosebank","Northcliff"],
    "Region D": ["Soweto","Orlando","Diepkloof","Pimville"],
    "Region E": ["Midrand","Halfway House","Kyalami"],
    "Region F": ["Auckland Park","Westdene","Sophiatown"],
  };

  return (
    <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }}>
      {/* Hero banner */}
      <section className="gradient-hero text-white pt-14 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="absolute -bottom-px left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 text-green-200 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span>Collection Schedule</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-400/30 shrink-0">
              <CalendarDays className="w-6 h-6 text-green-950" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight">Find Your Collection Day</h1>
              <p className="text-green-200 text-sm mt-0.5">Serving 1.2 million households across 7 regions</p>
            </div>
          </div>
          <p className="text-green-100/80 text-base max-w-2xl mb-8 mt-3">
            Enter your suburb to see your waste, recycling, and garden refuse collection schedule — with your next collection date and reminders.
          </p>

          {/* Search input */}
          <div className="relative max-w-2xl">
            <div className="flex gap-2 bg-white rounded-2xl p-1.5 shadow-2xl shadow-black/30 ring-1 ring-white/10">
              <div className="flex items-center gap-3 flex-1 pl-3">
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  onFocus={() => query && setOpen(suggestions.length > 0)}
                  onBlur={() => setTimeout(() => setOpen(false), 140)}
                  placeholder={placeholder}
                  className="flex-1 outline-none text-gray-800 text-sm bg-transparent placeholder:text-gray-400 py-1.5"
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
                    className="text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                variant="gold"
                className="shrink-0 font-bold shadow-md text-sm px-5"
                onClick={() => suggestions[0] && select(suggestions[0])}
              >
                <span className="hidden sm:inline">Find My Schedule</span>
                <span className="sm:hidden">Search</span>
              </Button>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  {suggestions.map((s, i) => (
                    <button
                      type="button"
                      key={s.suburb}
                      onMouseDown={() => select(s)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0 ${
                        i === highlighted ? "bg-green-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-gray-900">{highlightMatch(s.suburb)}</span>
                        <span className="text-xs text-gray-400 ml-2">{s.regionFull}</span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${REGION_COLORS[s.region]}`}>
                        {s.region}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <section className="px-4 py-6 bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <RotateCcw className="w-3 h-3" />
              Recently Searched
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((name) => {
                const found = SUBURBS_DB.find((s) => s.suburb === name);
                return found ? (
                  <button
                    type="button"
                    key={name}
                    onClick={() => onSearch(found)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-green-400 hover:text-green-700 transition-colors shadow-sm"
                  >
                    <Clock className="w-3 h-3 text-gray-400" />
                    {name}
                  </button>
                ) : null;
              })}
            </div>
          </div>
        </section>
      )}

      {/* Popular suburbs by region */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5 flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            Browse Popular Suburbs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(popular).map(([region, names]) => (
              <div key={region}>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-2.5">{region}</p>
                <div className="space-y-1.5">
                  {names.map((name) => {
                    const found = SUBURBS_DB.find((s) => s.suburb === name);
                    return found ? (
                      <button
                        type="button"
                        key={name}
                        onClick={() => onSearch(found)}
                        className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white border border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group shadow-sm"
                      >
                        <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 flex-1">{name}</span>
                        <span className="text-[10px] text-gray-400 group-hover:text-green-500">{found.collectionDay.slice(0, 3)}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-400" />
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Collection tips */}
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <h2 className="sm:col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-3 h-3" />
              Collection Tips
            </h2>
            {[
              { icon: Truck,        title: "Put bins out the night before", desc: "Place refuse bags or bins at the kerbside by 06:00 on collection day." },
              { icon: Bell,         title: "Subscribe to reminders",         desc: "Register on the Resident Portal to receive SMS, email or WhatsApp alerts." },
              { icon: Calendar,     title: "Public holiday changes",          desc: "Collections on public holidays shift to the next working day." },
              { icon: AlertCircle,  title: "Missed your collection?",         desc: "Report online and we will reschedule or investigate within 48 hours." },
            ].map((t) => (
              <div key={t.title} className="flex gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <t.icon className="w-4 h-4 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ─── Results View ─────────────────────────────────────────────────────────────

function ResultsView({ s, onBack }: { s: Suburb; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const daysUntilGeneral = getDaysUntil(s.collectionDay);
  const upcoming = useMemo(() => getUpcomingCollections(s), [s]);
  const nextCollection = upcoming.find((u) => u.service === "general");

  const nextLabel = daysUntilGeneral === 1 ? "Tomorrow" : daysUntilGeneral === 0 ? "Today" : `In ${daysUntilGeneral} days`;
  const urgency = daysUntilGeneral <= 1 ? "text-red-600" : daysUntilGeneral <= 3 ? "text-amber-600" : "text-green-700";

  async function handleShare() {
    const url = `${window.location.origin}/collection-schedule?q=${encodeURIComponent(s.suburb)}`;
    if (navigator.share) {
      await navigator.share({ title: `${s.suburb} Collection Schedule — Pikitup`, text: `Collection: ${s.collectionDay} | Recycling: ${s.recycling}`, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div key="results" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.3, ease: [0.25,0.4,0.25,1] }}>
      {/* Compact header */}
      <div className="gradient-hero text-white py-6 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button type="button" onClick={onBack} className="flex items-center gap-2 text-green-200 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Search</span>
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
            <span className="font-bold text-white truncate">{s.suburb}</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full hidden sm:inline-flex ${REGION_COLORS[s.region]}`}>{s.regionFull}</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-300" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">

          {/* Alert banner */}
          {s.alert && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium">{s.alert}</p>
            </motion.div>
          )}

          {/* Next collection countdown */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Next General Collection</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-gray-900">{s.collectionDay}</span>
                    <span className={`text-base font-bold ${urgency}`}>{nextLabel}</span>
                  </div>
                  {nextCollection && (
                    <p className="text-sm text-gray-500 mt-1">{formatDate(nextCollection.date)}</p>
                  )}
                </div>
                <div className={`w-16 h-16 rounded-2xl ${daysUntilGeneral <= 1 ? "bg-red-100" : daysUntilGeneral <= 3 ? "bg-amber-100" : "bg-green-100"} flex flex-col items-center justify-center shrink-0`}>
                  <span className={`text-2xl font-black ${daysUntilGeneral <= 1 ? "text-red-700" : daysUntilGeneral <= 3 ? "text-amber-700" : "text-green-700"}`}>{daysUntilGeneral}</span>
                  <span className={`text-[10px] font-bold uppercase ${daysUntilGeneral <= 1 ? "text-red-500" : daysUntilGeneral <= 3 ? "text-amber-500" : "text-green-500"}`}>days</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(5, 100 - (daysUntilGeneral / 7) * 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className={`h-full rounded-full ${daysUntilGeneral <= 1 ? "bg-red-500" : daysUntilGeneral <= 3 ? "bg-amber-500" : "bg-green-500"}`}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gray-400">Last collection</span>
                <span className="text-[10px] text-gray-400">Next: {s.collectionDay}</span>
              </div>
            </div>

            {/* Reminder strip */}
            <div className="px-5 py-3 bg-green-950 flex items-center gap-2">
              <Truck className="w-4 h-4 text-yellow-400 shrink-0" />
              <p className="text-xs text-green-200">Put bins out by <strong className="text-white">06:00</strong> on {s.collectionDay} morning</p>
            </div>
          </motion.div>

          {/* 7-day calendar strip */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">Next 7 Days</h2>
              <div className="flex items-center gap-3 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" />General</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-600 inline-block" />Recycling</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />Garden</span>
              </div>
            </div>
            <WeekCalendar s={s} />
          </motion.div>

          {/* Services grid */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Your Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["general","recycling","garden"] as const).map((svc) => {
                const cfg = SERVICE_CONFIG[svc];
                const Icon = cfg.icon;
                const value = svc === "general" ? `${s.collectionDay} (Weekly)` : svc === "recycling" ? s.recycling : s.garden;
                const available = value !== "Not available";
                const daysUntil = available ? getDaysUntil(value.split(" ")[0]) : null;
                return (
                  <motion.div
                    key={svc}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.18 + ["general","recycling","garden"].indexOf(svc) * 0.06 }}
                    className={`rounded-2xl border p-4 ${available ? cfg.light : "bg-gray-50 border-gray-200"} relative overflow-hidden`}
                  >
                    <div className={`w-9 h-9 rounded-xl ${available ? cfg.color : "bg-gray-300"} flex items-center justify-center mb-3`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{cfg.label}</p>
                    {available ? (
                      <>
                        <p className={`text-base font-bold mt-0.5 ${cfg.text}`}>{value.split(" ")[0]}</p>
                        <p className="text-xs text-gray-500">{value.includes("fortnightly") ? "Fortnightly" : "Weekly"}</p>
                        {daysUntil !== null && (
                          <span className={`mt-2 inline-block text-xs font-semibold ${cfg.text}`}>
                            In {daysUntil} day{daysUntil !== 1 ? "s" : ""}
                          </span>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 mt-0.5">Not available<br />in this area</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming collections timeline */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-green-600" />
              Upcoming Collections
            </h2>
            <div className="space-y-0">
              {upcoming.map((item, i) => {
                const cfg = SERVICE_CONFIG[item.service];
                const Icon = cfg.icon;
                return (
                  <motion.div
                    key={`${item.service}-${item.date.toISOString()}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.04 }}
                    className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className={`w-8 h-8 rounded-xl ${cfg.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${cfg.light} ${cfg.text} border`}>
                      {getDaysUntil(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][item.date.getDay()]) === 1
                        ? "Tomorrow"
                        : `${Math.round((item.date.getTime() - new Date().setHours(0,0,0,0)) / 86400000)} days`}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Depot info */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-green-600" />
              Your Serving Depot
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{s.depot}</p>
                <p className="text-xs text-gray-500">{s.regionFull}</p>
              </div>
              <a href={`tel:${s.depotPhone.replace(/\s/g,"")}`} className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl text-green-700 text-sm font-medium transition-colors">
                <Phone className="w-3.5 h-3.5" />
                {s.depotPhone}
              </a>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => downloadICS(s)}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-300 hover:bg-green-50 transition-all group"
            >
              <Download className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-700">Add to Calendar</span>
            </button>
            <button type="button" onClick={handleShare} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <Share2 className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-700">{copied ? "Link Copied!" : "Share Schedule"}</span>
            </button>
            <Link href="/resident-portal/register" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-amber-300 hover:bg-amber-50 transition-all group">
              <Bell className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-700">Get Reminders</span>
            </Link>
            <Link href="/report?type=missed-collection" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-red-300 hover:bg-red-50 transition-all group">
              <AlertCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-700">Report Missed</span>
            </Link>
          </motion.div>

          {/* Disclaimer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700">
              This schedule is based on standard operating data and may change due to public holidays, weather, or operational requirements.
              Always check <Link href="/news" className="underline font-medium">service notices</Link> before collection day or call <strong>0860 562 874</strong>.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CollectionSchedulePage() {
  const [view, setView] = useState<"search" | "results">("search");
  const [result, setResult] = useState<Suburb | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pikitup_recent_searches");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  // Read ?q= URL param on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      const match = fuzzySearch(q)[0];
      if (match) {
        setResult(match);
        setView("results");
      }
    }
  }, []);

  function handleSearch(s: Suburb) {
    setResult(s);
    setView("results");
    // Persist recent searches
    setRecentSearches((prev) => {
      const updated = [s.suburb, ...prev.filter((x) => x !== s.suburb)].slice(0, 5);
      try { localStorage.setItem("pikitup_recent_searches", JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
    // Update URL without full navigation
    window.history.replaceState(null, "", `/collection-schedule?q=${encodeURIComponent(s.suburb)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setView("search");
    setResult(null);
    window.history.replaceState(null, "", "/collection-schedule");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence mode="wait">
      {view === "search" || !result ? (
        <SearchView key="search" onSearch={handleSearch} recentSearches={recentSearches} />
      ) : (
        <ResultsView key={result.suburb} s={result} onBack={handleBack} />
      )}
    </AnimatePresence>
  );
}
