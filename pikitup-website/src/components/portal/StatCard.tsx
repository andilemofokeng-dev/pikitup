import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: "green" | "yellow" | "red" | "blue" | "orange";
  className?: string;
}

const colorMap = {
  green:  { bg: "bg-green-500/10",  icon: "bg-green-900/50 text-green-400",  border: "border-green-800/30" },
  yellow: { bg: "bg-yellow-500/10", icon: "bg-yellow-900/50 text-yellow-400", border: "border-yellow-800/30" },
  red:    { bg: "bg-red-500/10",    icon: "bg-red-900/50 text-red-400",       border: "border-red-800/30" },
  blue:   { bg: "bg-blue-500/10",   icon: "bg-blue-900/50 text-blue-400",     border: "border-blue-800/30" },
  orange: { bg: "bg-orange-500/10", icon: "bg-orange-900/50 text-orange-400", border: "border-orange-800/30" },
};

export default function StatCard({ label, value, icon: Icon, trend, color = "green", className }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn(
      "rounded-2xl p-5 border bg-gray-900",
      c.border, className
    )}>
      <div className="flex items-start justify-between">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", c.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            trend.positive ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"
          )}>
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-black text-white">
          {typeof value === "number" ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-gray-500 mt-0.5 font-medium">{label}</div>
      </div>
    </div>
  );
}
