"use client";
import { useEffect, useState } from "react";
import { apiGetMySchedule } from "@/lib/api-client";
import type { CollectionSchedule } from "@/lib/types";
import { Calendar, Recycle, Leaf, MapPin, Truck, Info, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const CALENDAR_HINTS: Record<string, { label: string; color: string; dot: string }> = {
  "Tue 10 Jun": { label: "General Waste",  color: "bg-green-900/30 border-green-700/40 text-green-400",  dot: "bg-green-500" },
  "Thu 12 Jun": { label: "Recycling",      color: "bg-teal-900/30 border-teal-700/40 text-teal-400",    dot: "bg-teal-400" },
  "Fri 13 Jun": { label: "Garden Refuse",  color: "bg-lime-900/30 border-lime-700/40 text-lime-400",    dot: "bg-lime-400" },
  "Tue 17 Jun": { label: "Public Holiday — shifted",  color: "bg-orange-900/30 border-orange-700/40 text-orange-400", dot: "bg-orange-400" },
  "Wed 18 Jun": { label: "General Waste (Youth Day shift)", color: "bg-green-900/30 border-green-700/40 text-green-400", dot: "bg-green-500" },
  "Tue 24 Jun": { label: "General Waste",  color: "bg-green-900/30 border-green-700/40 text-green-400",  dot: "bg-green-500" },
  "Thu 26 Jun": { label: "Recycling",      color: "bg-teal-900/30 border-teal-700/40 text-teal-400",    dot: "bg-teal-400" },
  "Fri 27 Jun": { label: "Garden Refuse",  color: "bg-lime-900/30 border-lime-700/40 text-lime-400",    dot: "bg-lime-400" },
};

const JUNE_DAYS = [
  ["","Mon","Tue","Wed","Thu","Fri","Sat"],
  ["",  "2",  "3",  "4",  "5",  "6",  "7"],
  ["9", "10", "11", "12", "13", "14", "15"],
  ["16","17", "18", "19", "20", "21", "22"],
  ["23","24", "25", "26", "27", "28", "29"],
];

const DOT_KEY: Record<string, string> = {
  "10": "bg-green-500", "12": "bg-teal-400", "13": "bg-lime-400",
  "17": "bg-orange-400", "18": "bg-green-500", "24": "bg-green-500",
  "26": "bg-teal-400", "27": "bg-lime-400",
};

export default function CollectionSchedulePage() {
  const [schedule, setSchedule] = useState<CollectionSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetMySchedule().then((r) => setSchedule(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (!schedule) return <p className="text-gray-500">No schedule found.</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl font-black text-white mb-1">My Collection Schedule</h1>
        <p className="text-sm text-gray-500">{schedule.suburb} — {schedule.region}</p>
      </div>

      {/* Next collection highlight */}
      <div className="rounded-2xl p-6 border border-green-700/40 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #071a09 0%, #0D3B14 100%)" }}>
        <div className="absolute inset-0 hero-dot-pattern opacity-10" />
        <div className="relative flex items-center gap-6 flex-wrap">
          <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500/40 rounded-2xl flex items-center justify-center shrink-0">
            <Truck className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-1">Next General Waste Collection</p>
            <p className="text-3xl font-black text-white">{schedule.nextCollection}</p>
            <p className="text-green-300/60 text-sm mt-1">Put your bins / bags out by 06:00</p>
          </div>
        </div>
      </div>

      {/* Schedule details */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Calendar, label: "General Waste Day",  value: schedule.collectionDay,  color: "text-green-400", bg: "bg-green-900/30 border-green-800/40" },
          { icon: Recycle,  label: "Recycling Day",      value: schedule.recyclingDay,   color: "text-teal-400",  bg: "bg-teal-900/30 border-teal-800/40" },
          { icon: Leaf,     label: "Garden Refuse Day",  value: schedule.gardenDay,      color: "text-lime-400",  bg: "bg-lime-900/30 border-lime-800/40" },
          { icon: MapPin,   label: "Serving Depot",      value: schedule.depot,          color: "text-yellow-400",bg: "bg-yellow-900/30 border-yellow-800/40" },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={cn("rounded-2xl border p-5 flex items-start gap-4", bg)}>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-black/20 shrink-0")}>
              <Icon className={cn("w-5 h-5", color)} />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
              <p className={cn("font-bold text-sm", color)}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar — June 2026 */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-bold text-white text-sm">June 2026 Calendar</h2>
          <div className="flex items-center gap-3 text-[10px] font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />General</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />Recycling</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-lime-400 inline-block" />Garden</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Holiday</span>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
            {WEEKDAYS.map((d) => <div key={d} className="text-center py-1">{d.slice(0,3)}</div>)}
          </div>
          {JUNE_DAYS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((day, di) => {
                const dot = DOT_KEY[day];
                const isToday = day === "22";
                return (
                  <div key={`${wi}-${di}`} className={cn(
                    "relative rounded-lg p-1.5 min-h-[40px] flex flex-col items-center justify-start pt-2",
                    day ? "bg-gray-800/40" : "",
                    isToday ? "ring-1 ring-green-500 bg-green-900/20" : ""
                  )}>
                    {day && <span className={cn("text-xs font-semibold", isToday ? "text-green-400" : "text-gray-400")}>{day}</span>}
                    {dot && <span className={cn("w-1.5 h-1.5 rounded-full mt-1", dot)} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming collections list */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white text-sm">Upcoming Collections</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {Object.entries(CALENDAR_HINTS).map(([date, info]) => (
            <div key={date} className="flex items-center gap-4 px-5 py-3.5">
              <span className={cn("w-2 h-2 rounded-full shrink-0", info.dot)} />
              <p className="text-sm font-semibold text-gray-300 w-24 shrink-0">{date}</p>
              <span className={cn("text-[11px] font-bold px-2.5 py-0.5 rounded-full border", info.color)}>{info.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-blue-400" />
          <h2 className="font-bold text-white text-sm">Collection Tips</h2>
        </div>
        <ul className="space-y-2.5">
          {[
            "Place bins or refuse bags at the kerb by 06:00 on collection day.",
            "Refuse must be contained — no loose waste will be collected.",
            "For recycling, use the green bags provided or any clear bag.",
            "Garden refuse must be in Pikitup-approved bags, bundles or containers.",
            "Public holidays may shift your collection by one day — check notices.",
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
              <Clock className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
