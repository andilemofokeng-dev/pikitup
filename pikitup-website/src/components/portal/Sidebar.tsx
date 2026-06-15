"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, ClipboardList, MapPin, Truck, Users,
  FileText, Settings, LogOut, Recycle, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/staff-portal/dashboard",   label: "Dashboard",    icon: LayoutDashboard },
  { href: "/staff-portal/complaints",  label: "Complaints",   icon: ClipboardList },
  { href: "/staff-portal/facilities",  label: "Facilities",   icon: MapPin },
  { href: "/staff-portal/depots",      label: "Depots",       icon: Truck },
  { href: "/staff-portal/users",       label: "Users",        icon: Users },
  { href: "/staff-portal/audit",       label: "Audit Log",    icon: FileText },
  { href: "/staff-portal/settings",    label: "Settings",     icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 h-full flex flex-col bg-gray-950 border-r border-white/5">
      {/* Logo */}
      <div className="p-5 border-b border-white/5">
        <Link href="/staff-portal/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 bg-gradient-to-br from-green-700 to-green-900 rounded-xl flex items-center justify-center shrink-0">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-black text-white text-sm">Pikitup</div>
            <div className="text-[11px] text-green-400 font-medium">Staff Portal</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href} href={href} onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-green-900/40 text-green-400 border border-green-800/40"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("w-4.5 h-4.5 shrink-0", active ? "text-green-400" : "text-gray-500 group-hover:text-gray-300")} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-green-600" />}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">
              {user?.name?.[0]}{user?.surname?.[0]}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name} {user?.surname}</p>
            <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role?.replace("_", " ")}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-500 hover:text-red-400 hover:bg-red-900/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
